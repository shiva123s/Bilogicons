import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAllIcons, getPublicIcons, addIcon, searchIcons } from '@/lib/icons';
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
    const icon = {
        id: uuidv4(),
        name,
        category,
        tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        svgContent,
        uploadedBy: user.id,
        uploaderName: user.name || user.email || 'Anonymous',
        labId: isLabPrivate && user.labId ? user.labId : undefined,
        isLabPrivate: Boolean(isLabPrivate && user.labId),
        downloads: 0,
        likes: 0,
        likedBy: [],
        createdAt: new Date().toISOString(),
    };

    await addIcon(icon);
    return NextResponse.json(icon, { status: 201 });
}
