import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPublicIcons, addIcon, searchIcons } from '@/lib/icons';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';

    let icons;
    if (query || category) {
        icons = await searchIcons(query, category || undefined);
        icons = icons.filter(i => !i.isLabPrivate);
    } else {
        icons = await getPublicIcons();
    }
    return NextResponse.json(icons);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, category, tags, svgContent, isLabPrivate } = body;

    if (!name || !category || !svgContent) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = session.user as any;
    const iconId = uuidv4();

    // Upload SVG to Supabase Storage
    let fileUrl: string | undefined;
    const fileName = `${iconId}.svg`;
    const buffer = Buffer.from(svgContent, 'utf-8');

    const { error: uploadError } = await supabase.storage
        .from('icons')
        .upload(fileName, buffer, {
            contentType: 'image/svg+xml',
            upsert: false,
        });

    if (!uploadError) {
        const { data: urlData } = supabase.storage
            .from('icons')
            .getPublicUrl(fileName);
        fileUrl = urlData.publicUrl;
    }

    const icon = {
        id: iconId,
        name,
        category,
        tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        svgContent,               // keep inline SVG for backward compatibility
        fileUrl,                  // also store the Supabase Storage URL
        uploadedBy: user.id,
        uploaderName: user.name || user.email || 'Anonymous',
        labId: isLabPrivate && user.labId ? user.labId : undefined,
        isLabPrivate: Boolean(isLabPrivate && user.labId),
        downloads: 0,
        likes: 0,
        likedBy: [] as string[],
        createdAt: new Date().toISOString(),
    };

    await addIcon(icon);
    return NextResponse.json(icon, { status: 201 });
}
