import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getLabById, updateLab } from '@/lib/labs';
import { updateUser, findUserByEmail } from '@/lib/users';

// POST /api/labs/[id]/join — user accepts an invite and joins the lab
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const lab = await getLabById(id);
    if (!lab) return NextResponse.json({ error: 'Lab not found' }, { status: 404 });

    const sessionUser = session.user as any;
    const freshUser = await findUserByEmail(sessionUser.email);
    const userId = freshUser?.id || sessionUser.id;
    const userEmail = sessionUser.email?.toLowerCase();

    // Check they were invited (pendingInvites is now an array of objects)
    const invite = lab.pendingInvites.find((i: any) =>
        typeof i === 'string' ? i === userEmail : i.email === userEmail
    );
    if (!invite) {
        return NextResponse.json({ error: 'You have not been invited to this lab' }, { status: 403 });
    }

    if (lab.memberIds.includes(userId)) {
        return NextResponse.json({ error: 'You are already a member of this lab' }, { status: 409 });
    }

    await updateLab(id, {
        memberIds: [...lab.memberIds, userId],
        pendingInvites: lab.pendingInvites.filter((i: any) =>
            typeof i === 'string' ? i !== userEmail : i.email !== userEmail
        ),
    });

    await updateUser(userId, { labId: lab.id, labName: lab.name, labRole: 'member' } as any);

    return NextResponse.json({ success: true, labName: lab.name });
}

// DELETE /api/labs/[id]/join — user leaves the lab
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const lab = await getLabById(id);
    if (!lab) return NextResponse.json({ error: 'Lab not found' }, { status: 404 });

    const sessionUser = session.user as any;
    const freshUser = await findUserByEmail(sessionUser.email);
    const userId = freshUser?.id || sessionUser.id;

    if (lab.supervisorId === userId) {
        return NextResponse.json({ error: 'Supervisors cannot leave their own lab. Delete the lab instead.' }, { status: 400 });
    }

    if (!lab.memberIds.includes(userId)) {
        return NextResponse.json({ error: 'You are not a member of this lab' }, { status: 400 });
    }

    await updateLab(id, {
        memberIds: lab.memberIds.filter((mid: string) => mid !== userId),
    });

    await updateUser(userId, { labId: undefined, labName: undefined, labRole: undefined } as any);

    return NextResponse.json({ success: true });
}
