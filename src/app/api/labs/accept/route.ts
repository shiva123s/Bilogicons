import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getLabByInviteToken, updateLab } from '@/lib/labs';
import { updateUser } from '@/lib/users';

// POST /api/labs/accept — user accepts invite via token
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { token, labId } = await req.json();
    if (!token) return NextResponse.json({ error: 'Invalid accept link — missing token' }, { status: 400 });

    const result = await getLabByInviteToken(token);
    if (!result) return NextResponse.json({ error: 'This invitation link is invalid or has already been used' }, { status: 404 });

    const { lab, invite } = result;

    // Verify lab ID matches
    if (labId && lab.id !== labId) return NextResponse.json({ error: 'Invalid invite link' }, { status: 400 });

    // Check expiry
    if (new Date() > new Date(invite.expiresAt)) {
        return NextResponse.json({ error: 'This invitation has expired. Ask your supervisor to send a new one.' }, { status: 410 });
    }

    const user = session.user as any;
    const userEmail = user.email?.toLowerCase();

    // Verify email matches the invite
    if (invite.email !== userEmail) {
        return NextResponse.json({
            error: `This invitation was sent to ${invite.email}. You are logged in as ${userEmail}. Please sign in with the invited email address.`,
        }, { status: 403 });
    }

    // Check not already a member
    if (lab.memberIds.includes(user.id)) {
        return NextResponse.json({ error: 'You are already a member of this lab' }, { status: 409 });
    }

    // Accept: add to members, remove from pending invites
    await updateLab(lab.id, {
        memberIds: [...lab.memberIds, user.id],
        pendingInvites: lab.pendingInvites.filter(i => i.token !== token),
    });

    // Update user's lab affiliation
    await updateUser(user.id, {
        labId: lab.id, labName: lab.name, labRole: 'member',
    } as any);

    return NextResponse.json({ success: true, labName: lab.name, labId: lab.id });
}
