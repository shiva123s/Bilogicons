import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { findUserById, updateUser } from '@/lib/users';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const user = session.user as any;
    const userData = await findUserById(user.id);
    if (!userData) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const { passwordHash: _, ...safeUser } = userData;
    return NextResponse.json(safeUser);
}

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const user = session.user as any;

    const formData = await req.formData();
    const displayName = formData.get('displayName') as string | null;
    const avatarFile = formData.get('avatar') as File | null;

    const updates: Record<string, string> = {};
    if (displayName) updates.displayName = displayName;

    if (avatarFile && avatarFile.size > 0) {
        const bytes = await avatarFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const ext = avatarFile.name.split('.').pop() || 'jpg';
        const filename = `${user.id}.${ext}`;

        // Upload avatar to Supabase Storage 'avatars' bucket
        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filename, buffer, {
                contentType: avatarFile.type || 'image/jpeg',
                upsert: true, // overwrite existing avatar
            });

        if (!uploadError) {
            const { data: urlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(filename);
            updates.avatarUrl = urlData.publicUrl;
        }
    }

    await updateUser(user.id, updates);
    return NextResponse.json({ success: true, ...updates });
}
