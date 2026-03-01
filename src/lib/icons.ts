import { promises as fs } from 'fs';
import path from 'path';
import { BUILT_IN_ICONS } from './svgIcons';

export interface Icon {
    id: string;
    name: string;
    category: string;
    tags: string[];
    svgContent: string;
    uploadedBy: string; // 'system' or userId
    uploaderName: string;
    labId?: string; // if set, only lab members can see
    isLabPrivate: boolean;
    downloads: number;
    likes: number;
    likedBy: string[];
    createdAt: string;
    fileName?: string;
}

const ICONS_FILE = path.join(process.cwd(), 'data', 'icons.json');

async function ensureIconsFile(): Promise<Icon[]> {
    try {
        const data = await fs.readFile(ICONS_FILE, 'utf-8');
        const parsed = JSON.parse(data) as Icon[];
        // If empty, seed with built-in icons
        if (parsed.length === 0) {
            await fs.writeFile(ICONS_FILE, JSON.stringify(BUILT_IN_ICONS, null, 2));
            return BUILT_IN_ICONS;
        }
        return parsed;
    } catch {
        // File doesn't exist, seed it
        await fs.writeFile(ICONS_FILE, JSON.stringify(BUILT_IN_ICONS, null, 2));
        return BUILT_IN_ICONS;
    }
}

export async function getAllIcons(): Promise<Icon[]> {
    return ensureIconsFile();
}

export async function getIconById(id: string): Promise<Icon | null> {
    const icons = await ensureIconsFile();
    return icons.find(i => i.id === id) || null;
}

export async function searchIcons(query: string, category?: string): Promise<Icon[]> {
    const icons = await ensureIconsFile();
    const q = query.toLowerCase();
    return icons.filter(icon => {
        const matchesQuery = !q ||
            icon.name.toLowerCase().includes(q) ||
            icon.tags.some(t => t.toLowerCase().includes(q)) ||
            icon.category.toLowerCase().includes(q);
        const matchesCategory = !category || icon.category === category;
        return matchesQuery && matchesCategory;
    });
}

export async function addIcon(icon: Icon): Promise<void> {
    const icons = await ensureIconsFile();
    icons.unshift(icon);
    await fs.writeFile(ICONS_FILE, JSON.stringify(icons, null, 2));
}

export async function updateIcon(id: string, updates: Partial<Icon>): Promise<void> {
    const icons = await ensureIconsFile();
    const idx = icons.findIndex(i => i.id === id);
    if (idx !== -1) {
        icons[idx] = { ...icons[idx], ...updates };
        await fs.writeFile(ICONS_FILE, JSON.stringify(icons, null, 2));
    }
}

export async function getPublicIcons(): Promise<Icon[]> {
    const icons = await ensureIconsFile();
    return icons.filter(i => !i.isLabPrivate);
}

export async function getLabIcons(labId: string): Promise<Icon[]> {
    const icons = await ensureIconsFile();
    return icons.filter(i => i.labId === labId);
}
