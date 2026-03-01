import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAllLabs } from '@/lib/labs';

// GET /api/labs/pending — get labs that have invited the current user (by email)
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = session.user as any;
    const email = user.email?.toLowerCase();
    const allLabs = await getAllLabs();

    // Lab has pending invite if user's email is in pendingInvites (as objects now)
    const pending = allLabs
        .filter(l => l.pendingInvites.some(i => i.email === email))
        .map(l => ({
            id: l.id,
            name: l.name,
            description: l.description,
            supervisorId: l.supervisorId,
            // Include the specific invite token so the UI can build the accept link
            invite: l.pendingInvites.find(i => i.email === email),
        }));

    return NextResponse.json(pending);
}
