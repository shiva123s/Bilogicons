import { promises as fs } from 'fs';
import path from 'path';

export interface LabInvite {
    email: string;       // invitee email
    token: string;       // random token for secure accept link
    invitedAt: string;   // ISO timestamp
    expiresAt: string;   // ISO timestamp (7 days)
}

export interface Lab {
    id: string;           // unique lab ID (e.g. "smithlab2024")
    name: string;         // display name (e.g. "Smith Lab")
    description?: string;
    supervisorId: string; // userId of the lab supervisor/creator
    memberIds: string[];  // array of userIds who have joined
    pendingInvites: LabInvite[]; // structured invites with tokens
    createdAt: string;
}

const LABS_FILE = path.join(process.cwd(), 'data', 'labs.json');

async function readLabs(): Promise<Lab[]> {
    try {
        const data = await fs.readFile(LABS_FILE, 'utf-8');
        const parsed = JSON.parse(data) as any[];
        // Migrate legacy string-based pendingInvites to LabInvite objects
        return parsed.map(l => ({
            ...l,
            pendingInvites: (l.pendingInvites || []).map((inv: any) =>
                typeof inv === 'string'
                    ? { email: inv, token: '', invitedAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 7 * 864e5).toISOString() }
                    : inv
            ),
        }));
    } catch {
        return [];
    }
}

async function writeLabs(labs: Lab[]): Promise<void> {
    await fs.writeFile(LABS_FILE, JSON.stringify(labs, null, 2));
}

export async function getAllLabs(): Promise<Lab[]> {
    return readLabs();
}

export async function getLabById(id: string): Promise<Lab | null> {
    const labs = await readLabs();
    return labs.find(l => l.id === id) || null;
}

export async function createLab(lab: Lab): Promise<Lab> {
    const labs = await readLabs();
    const existing = labs.find(l => l.id === lab.id);
    if (existing) throw new Error('A lab with this ID already exists');
    labs.push(lab);
    await writeLabs(labs);
    return lab;
}

export async function updateLab(id: string, updates: Partial<Lab>): Promise<void> {
    const labs = await readLabs();
    const idx = labs.findIndex(l => l.id === id);
    if (idx !== -1) {
        labs[idx] = { ...labs[idx], ...updates };
        await writeLabs(labs);
    }
}

export async function deleteLab(id: string): Promise<void> {
    const labs = await readLabs();
    await writeLabs(labs.filter(l => l.id !== id));
}

export async function getLabsByMember(userId: string): Promise<Lab[]> {
    const labs = await readLabs();
    return labs.filter(l => l.memberIds.includes(userId) || l.supervisorId === userId);
}

export async function getLabBySupervisor(supervisorId: string): Promise<Lab | null> {
    const labs = await readLabs();
    return labs.find(l => l.supervisorId === supervisorId) || null;
}

// Find a lab that has a pending invite with the given token
export async function getLabByInviteToken(token: string): Promise<{ lab: Lab; invite: LabInvite } | null> {
    const labs = await readLabs();
    for (const lab of labs) {
        const invite = lab.pendingInvites.find(i => i.token === token);
        if (invite) return { lab, invite };
    }
    return null;
}
