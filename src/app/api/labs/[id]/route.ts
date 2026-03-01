import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getLabById, updateLab, deleteLab } from '@/lib/labs';
import { findUserByEmail, getLabMembers } from '@/lib/users';

// GET /api/labs/[id] — get lab info + member details
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const lab = await getLabById(id);
    if (!lab) return NextResponse.json({ error: 'Lab not found' }, { status: 404 });

    const sessionUser = session.user as any;
    const freshUser = await findUserByEmail(sessionUser.email);
    const userId = freshUser?.id || sessionUser.id;

    const isMember = lab.memberIds.includes(userId) || lab.supervisorId === userId;
    if (!isMember) return NextResponse.json({ error: 'Access denied' }, { status: 403 });

    const members = await getLabMembers(id);
    const memberDetails = members.map(m => ({
        id: m.id,
        displayName: m.displayName,
        email: m.email,
        avatarUrl: m.avatarUrl,
        labRole: (m as any).labRole || 'member',
        joinedAt: m.createdAt,
    }));

    return NextResponse.json({ ...lab, members: memberDetails });
}

// PATCH /api/labs/[id] — update lab info (supervisor only)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const lab = await getLabById(id);
    if (!lab) return NextResponse.json({ error: 'Lab not found' }, { status: 404 });

    const sessionUser = session.user as any;
    const freshUser = await findUserByEmail(sessionUser.email);
    const userId = freshUser?.id || sessionUser.id;
    if (lab.supervisorId !== userId) return NextResponse.json({ error: 'Only the supervisor can edit lab details' }, { status: 403 });

    const body = await req.json();
    const { name, description } = body;
    await updateLab(id, { name, description });
    return NextResponse.json({ success: true });
}

// DELETE /api/labs/[id] — delete lab (supervisor only)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const lab = await getLabById(id);
    if (!lab) return NextResponse.json({ error: 'Lab not found' }, { status: 404 });

    const sessionUser = session.user as any;
    const freshUser = await findUserByEmail(sessionUser.email);
    const userId = freshUser?.id || sessionUser.id;
    if (lab.supervisorId !== userId) return NextResponse.json({ error: 'Only the supervisor can delete the lab' }, { status: 403 });

    await deleteLab(id);
    return NextResponse.json({ success: true });
}
