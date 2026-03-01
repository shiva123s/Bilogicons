import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getLabById, updateLab } from '@/lib/labs';
import { updateUser, findUserByEmail } from '@/lib/users';

// DELETE /api/labs/[id]/members/[userId] — supervisor removes a member
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; userId: string }> }
) {
    const { id, userId: targetUserId } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const lab = await getLabById(id);
    if (!lab) return NextResponse.json({ error: 'Lab not found' }, { status: 404 });

    const sessionUser = session.user as any;
    const freshUser = await findUserByEmail(sessionUser.email);
    const currentUserId = freshUser?.id || sessionUser.id;

    if (lab.supervisorId !== currentUserId) {
        return NextResponse.json({ error: 'Only the supervisor can remove members' }, { status: 403 });
    }

    if (targetUserId === currentUserId) {
        return NextResponse.json({ error: 'Supervisors cannot remove themselves. Delete the lab instead.' }, { status: 400 });
    }

    if (!lab.memberIds.includes(targetUserId)) {
        return NextResponse.json({ error: 'This user is not a member of the lab' }, { status: 400 });
    }

    await updateLab(id, {
        memberIds: lab.memberIds.filter(mid => mid !== targetUserId),
    });

    await updateUser(targetUserId, { labId: undefined, labName: undefined, labRole: undefined } as any);

    return NextResponse.json({ success: true });
}
