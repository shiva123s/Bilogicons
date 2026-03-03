import { prisma } from './prisma';
import { BUILT_IN_ICONS } from './svgIcons';

export interface Icon {
    id: string;
    name: string;
    category: string;
    tags: string[];
    svgContent?: string;
    fileUrl?: string;
    uploadedBy: string;
    uploaderName: string;
    labId?: string;
    isLabPrivate: boolean;
    downloads: number;
    likes: number;
    likedBy: string[];
    createdAt: string;
    fileName?: string;
}

/** Convert a Prisma Icon row into a plain serialisable object */
function toPlain(row: any): Icon {
    return {
        id: row.id,
        name: row.name,
        category: row.category,
        tags: row.tags ?? [],
        svgContent: row.svgContent ?? undefined,
        fileUrl: row.fileUrl ?? undefined,
        uploadedBy: row.uploadedBy,
        uploaderName: row.uploaderName,
        labId: row.labId ?? undefined,
        isLabPrivate: row.isLabPrivate,
        downloads: row.downloads,
        likes: row.likes,
        likedBy: row.likedBy ?? [],
        createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt,
        fileName: row.fileName ?? undefined,
    };
}

/**
 * Seed built-in icons if the database Icon table is empty.
 * Called once on first access.
 */
let seeded = false;
async function ensureSeeded(): Promise<void> {
    if (seeded) return;
    const count = await prisma.icon.count();
    if (count === 0) {
        const iconData = BUILT_IN_ICONS.map((icon: any) => ({
            id: icon.id,
            name: icon.name,
            category: icon.category,
            tags: icon.tags ?? [],
            svgContent: icon.svgContent,
            uploadedBy: null,  // built-in icons have no real uploader (FK constraint)
            uploaderName: icon.uploaderName ?? 'BioLogIcons Library',
            isLabPrivate: icon.isLabPrivate ?? false,
            downloads: icon.downloads ?? 0,
            likes: icon.likes ?? 0,
            likedBy: icon.likedBy ?? [],
            createdAt: icon.createdAt ? new Date(icon.createdAt) : new Date(),
        }));
        await prisma.icon.createMany({ data: iconData });
    }
    seeded = true;
}

export async function getAllIcons(): Promise<Icon[]> {
    await ensureSeeded();
    const rows = await prisma.icon.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return rows.map(toPlain);
}

export async function getIconById(id: string): Promise<Icon | null> {
    await ensureSeeded();
    const row = await prisma.icon.findUnique({ where: { id } });
    return row ? toPlain(row) : null;
}

export async function searchIcons(query: string, category?: string): Promise<Icon[]> {
    await ensureSeeded();
    const q = query.toLowerCase();

    const where: any = {};
    if (category) where.category = category;

    // For text search, use OR with contains on name and category
    if (q) {
        where.OR = [
            { name: { contains: q, mode: 'insensitive' } },
            { category: { contains: q, mode: 'insensitive' } },
            { tags: { hasSome: [q] } },
        ];
    }

    const rows = await prisma.icon.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
    return rows.map(toPlain);
}

export async function addIcon(icon: Icon): Promise<void> {
    await prisma.icon.create({
        data: {
            id: icon.id,
            name: icon.name,
            category: icon.category,
            tags: icon.tags,
            svgContent: icon.svgContent,
            fileUrl: icon.fileUrl,
            uploadedBy: icon.uploadedBy,
            uploaderName: icon.uploaderName,
            labId: icon.labId,
            isLabPrivate: icon.isLabPrivate,
            downloads: icon.downloads,
            likes: icon.likes,
            likedBy: icon.likedBy,
            fileName: icon.fileName,
        },
    });
}

export async function updateIcon(id: string, updates: Partial<Icon>): Promise<void> {
    const data: Record<string, any> = {};
    if (updates.downloads !== undefined) data.downloads = updates.downloads;
    if (updates.likes !== undefined) data.likes = updates.likes;
    if (updates.likedBy !== undefined) data.likedBy = updates.likedBy;
    if (updates.name !== undefined) data.name = updates.name;
    if (updates.category !== undefined) data.category = updates.category;
    if (updates.tags !== undefined) data.tags = updates.tags;
    if (updates.svgContent !== undefined) data.svgContent = updates.svgContent;
    if (updates.fileUrl !== undefined) data.fileUrl = updates.fileUrl;
    if (updates.isLabPrivate !== undefined) data.isLabPrivate = updates.isLabPrivate;

    await prisma.icon.update({ where: { id }, data });
}

export async function getPublicIcons(): Promise<Icon[]> {
    await ensureSeeded();
    const rows = await prisma.icon.findMany({
        where: { isLabPrivate: false },
        orderBy: { createdAt: 'desc' },
    });
    return rows.map(toPlain);
}

export async function getLabIcons(labId: string): Promise<Icon[]> {
    await ensureSeeded();
    const rows = await prisma.icon.findMany({
        where: { labId },
        orderBy: { createdAt: 'desc' },
    });
    return rows.map(toPlain);
}
