import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getLabById } from '@/lib/labs';
import { findUserByEmail } from '@/lib/users';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// POST /api/labs/[id]/invite — supervisor invites a user by email (in-app only)
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const lab = await getLabById(id);
    if (!lab) return NextResponse.json({ error: 'Lab not found' }, { status: 404 });

    const sessionUser = session.user as any;
    const freshUser = await findUserByEmail(sessionUser.email);
    const userId = freshUser?.id || sessionUser.id;

    if (lab.supervisorId !== userId) {
        return NextResponse.json({ error: 'Only the lab supervisor can send invitations' }, { status: 403 });
    }

    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
    }

    const emailLower = email.toLowerCase().trim();

    // Check if already a member
    const invitee = await findUserByEmail(emailLower);
    if (invitee && lab.memberIds.includes(invitee.id)) {
        return NextResponse.json({ error: 'This user is already a member of the lab' }, { status: 409 });
    }

    // Check for existing pending invite via Prisma
    const existingInvite = await prisma.invite.findFirst({
        where: { labId: id, email: emailLower },
    });
    if (existingInvite) {
        return NextResponse.json({ error: 'An invitation is already pending for this email' }, { status: 409 });
    }

    // Create invite directly in the Invite table
    const token = crypto.randomBytes(32).toString('hex');
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    await prisma.invite.create({
        data: {
            email: emailLower,
            token,
            invitedAt: now,
            expiresAt,
            labId: id,
        },
    });

    const appUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    return NextResponse.json({
        success: true,
        message: `Invitation saved for ${email}. They will see it in their Dashboard → Invitations tab when they log in.`,
        acceptLink: `${appUrl}/lab/accept?token=${token}&lab=${id}`,
    });
}

// DELETE /api/labs/[id]/invite — supervisor cancels a pending invite
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const lab = await getLabById(id);
    if (!lab) return NextResponse.json({ error: 'Lab not found' }, { status: 404 });

    const sessionUser = session.user as any;
    const freshUser = await findUserByEmail(sessionUser.email);
    const userId = freshUser?.id || sessionUser.id;

    if (lab.supervisorId !== userId) {
        return NextResponse.json({ error: 'Only the supervisor can cancel invitations' }, { status: 403 });
    }

    const { email } = await req.json();
    await prisma.invite.deleteMany({
        where: { labId: id, email: email.toLowerCase() },
    });

    return NextResponse.json({ success: true });
}
