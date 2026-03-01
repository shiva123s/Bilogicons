import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createLab, getLabById, getLabsByMember } from '@/lib/labs';
import { updateUser, findUserByEmail } from '@/lib/users';
import { v4 as uuidv4 } from 'uuid';


// GET /api/labs — return all labs the current user belongs to or supervises
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const sessionUser = session.user as any;
    // Look up fresh ID from DB by email (JWT id may be stale)
    const freshUser = await findUserByEmail(sessionUser.email);
    const userId = freshUser?.id || sessionUser.id;
    const labs = await getLabsByMember(userId);
    return NextResponse.json(labs);
}


// POST /api/labs — create a new lab (supervisor)
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = session.user as any;
    const body = await req.json();
    const { name, labId, description } = body;

    if (!name || !labId) return NextResponse.json({ error: 'Lab name and ID are required' }, { status: 400 });

    // Check ID format - alphanumeric + underscore/hyphen only
    if (!/^[a-zA-Z0-9_-]{3,30}$/.test(labId)) {
        return NextResponse.json({ error: 'Lab ID must be 3-30 alphanumeric characters (hyphens/underscores allowed)' }, { status: 400 });
    }

    // Check existing
    const existing = await getLabById(labId);
    if (existing) return NextResponse.json({ error: 'This Lab ID is already taken' }, { status: 409 });

    const lab = await createLab({
        id: labId,
        name,
        description: description || '',
        supervisorId: user.id,
        memberIds: [user.id], // supervisor is also a member
        pendingInvites: [],
        createdAt: new Date().toISOString(),
    });

    // Update the supervisor user with lab info
    await updateUser(user.id, { labId, labName: name, labRole: 'supervisor' } as any);

    return NextResponse.json(lab, { status: 201 });
}
