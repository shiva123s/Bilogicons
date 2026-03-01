import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getIconById, updateIcon } from '@/lib/icons';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: 'Login required to download' }, { status: 401 });
    }

    const icon = await getIconById(id);
    if (!icon) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    if (icon.isLabPrivate) {
        const user = session.user as any;
        if (user.labId !== icon.labId) {
            return NextResponse.json({ error: 'Access restricted to lab members' }, { status: 403 });
        }
    }

    await updateIcon(id, { downloads: icon.downloads + 1 });

    return new NextResponse(icon.svgContent, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Content-Disposition': `attachment; filename="${icon.name.replace(/\s+/g, '_')}.svg"`,
        },
    });
}
