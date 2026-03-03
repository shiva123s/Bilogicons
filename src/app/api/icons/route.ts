import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPublicIcons, addIcon, searchIcons } from '@/lib/icons';
import { supabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'isomorphic-dompurify';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';

    let icons;
    if (query || category) {
        icons = await searchIcons(query, category || undefined);
        icons = icons.filter((i: any) => !i.isLabPrivate);
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

    // Sanitize SVG to prevent XSS attacks
    const cleanSvgContent = DOMPurify.sanitize(svgContent, { USE_PROFILES: { svg: true } });
    if (!cleanSvgContent.trim()) {
        return NextResponse.json({ error: 'Invalid or malicious SVG content detected' }, { status: 400 });
    }

    const user = session.user as any;
    const iconId = uuidv4();

    // Check file size (2MB limit)
    const buffer = Buffer.from(cleanSvgContent, 'utf-8');
    if (buffer.length > 2 * 1024 * 1024) {
        return NextResponse.json({ error: 'File size exceeds 2MB limit' }, { status: 400 });
    }

    // Upload sanitized SVG to Supabase Storage using admin client (bypasses RLS)
    const fileName = `${iconId}.svg`;
    const { error: uploadError } = await supabaseAdmin.storage
        .from('icons')
        .upload(fileName, buffer, {
            contentType: 'image/svg+xml',
            upsert: false,
        });

    if (uploadError) {
        console.error('Supabase Storage upload failed:', uploadError);
        return NextResponse.json({ error: 'Failed to upload icon to storage' }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage
        .from('icons')
        .getPublicUrl(fileName);
    const fileUrl = urlData.publicUrl;

    const icon = {
        id: iconId,
        name,
        category,
        tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        svgContent: cleanSvgContent,
        fileUrl,
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
