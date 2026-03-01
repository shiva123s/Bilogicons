import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getIconById, updateIcon } from '@/lib/icons';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const icon = await getIconById(id);
    if (!icon) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const user = session.user as any;
    const userId = user.id as string;
    const likedBy = icon.likedBy || [];
    const alreadyLiked = likedBy.includes(userId);

    const newLikedBy = alreadyLiked
        ? likedBy.filter((uid: string) => uid !== userId)
        : [...likedBy, userId];

    await updateIcon(id, { likes: newLikedBy.length, likedBy: newLikedBy });
    return NextResponse.json({ liked: !alreadyLiked, likes: newLikedBy.length });
}
