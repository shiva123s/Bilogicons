import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPublicIcons, addIcon, searchIcons } from '@/lib/icons';
import { supabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import sanitizeHtml from 'sanitize-html';

export const dynamic = 'force-dynamic';

// SVG sanitization config — allows SVG elements/attributes, strips scripts
const SVG_SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
    allowedTags: [
        'svg', 'g', 'path', 'circle', 'ellipse', 'rect', 'line', 'polyline',
        'polygon', 'text', 'tspan', 'defs', 'clipPath', 'mask', 'use',
        'symbol', 'linearGradient', 'radialGradient', 'stop', 'filter',
        'feGaussianBlur', 'feOffset', 'feMerge', 'feMergeNode', 'feBlend',
        'feColorMatrix', 'feComposite', 'feFlood', 'title', 'desc',
    ],
    allowedAttributes: {
        '*': ['id', 'class', 'style', 'fill', 'stroke', 'stroke-width', 'stroke-linecap',
            'stroke-linejoin', 'stroke-dasharray', 'stroke-dashoffset', 'opacity',
            'transform', 'clip-path', 'mask', 'filter', 'fill-rule', 'clip-rule',
            'fill-opacity', 'stroke-opacity'],
        svg: ['xmlns', 'viewBox', 'width', 'height', 'preserveAspectRatio'],
        path: ['d'],
        circle: ['cx', 'cy', 'r'],
        ellipse: ['cx', 'cy', 'rx', 'ry'],
        rect: ['x', 'y', 'width', 'height', 'rx', 'ry'],
        line: ['x1', 'y1', 'x2', 'y2'],
        polyline: ['points'],
        polygon: ['points'],
        text: ['x', 'y', 'dx', 'dy', 'text-anchor', 'font-size', 'font-family', 'font-weight'],
        tspan: ['x', 'y', 'dx', 'dy'],
        use: ['href', 'xlink:href', 'x', 'y', 'width', 'height'],
        linearGradient: ['x1', 'y1', 'x2', 'y2', 'gradientUnits', 'gradientTransform'],
        radialGradient: ['cx', 'cy', 'r', 'fx', 'fy', 'gradientUnits', 'gradientTransform'],
        stop: ['offset', 'stop-color', 'stop-opacity'],
    },
    allowedSchemes: [],
    disallowedTagsMode: 'discard',
};

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
    const cleanSvgContent = sanitizeHtml(svgContent, SVG_SANITIZE_OPTIONS);
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
