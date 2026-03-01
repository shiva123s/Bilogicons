import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/users';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, displayName, accountType, labId, labName } = body;

        if (!email || !password || !displayName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existing = await findUserByEmail(email);
        if (existing) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
        }

        const user = await createUser({
            id: uuidv4(),
            email,
            password,
            displayName,
            accountType: accountType || 'individual',
            labId: accountType === 'lab' ? labId : undefined,
            labName: accountType === 'lab' ? labName : undefined,
        });

        return NextResponse.json({
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            accountType: user.accountType,
        }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
