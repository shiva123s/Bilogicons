import { prisma } from './prisma';

export interface LabInvite {
    email: string;
    token: string;
    invitedAt: string;
    expiresAt: string;
}

export interface Lab {
    id: string;
    name: string;
    description?: string;
    supervisorId: string;
    memberIds: string[];
    pendingInvites: LabInvite[];
    createdAt: string;
}

/** Convert a Prisma Lab + Invites into the plain interface the API routes already expect */
function toPlain(row: any, invites?: any[]): Lab {
    const pendingInvites: LabInvite[] = (invites ?? row.invites ?? []).map((i: any) => ({
        email: i.email,
        token: i.token,
        invitedAt: i.invitedAt instanceof Date ? i.invitedAt.toISOString() : i.invitedAt,
        expiresAt: i.expiresAt instanceof Date ? i.expiresAt.toISOString() : i.expiresAt,
    }));
    return {
        id: row.id,
        name: row.name,
        description: row.description ?? undefined,
        supervisorId: row.supervisorId,
        memberIds: row.memberIds ?? [],
        pendingInvites,
        createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt,
    };
}

export async function getAllLabs(): Promise<Lab[]> {
    const rows = await prisma.lab.findMany({ include: { invites: true } });
    return rows.map(r => toPlain(r));
}

export async function getLabById(id: string): Promise<Lab | null> {
    const row = await prisma.lab.findUnique({
        where: { id },
        include: { invites: true },
    });
    return row ? toPlain(row) : null;
}

export async function createLab(lab: Lab): Promise<Lab> {
    const existing = await prisma.lab.findUnique({ where: { id: lab.id } });
    if (existing) throw new Error('A lab with this ID already exists');

    const row = await prisma.lab.create({
        data: {
            id: lab.id,
            name: lab.name,
            description: lab.description ?? '',
            supervisorId: lab.supervisorId,
            memberIds: lab.memberIds,
        },
        include: { invites: true },
    });
    return toPlain(row);
}

export async function updateLab(id: string, updates: Partial<Lab>): Promise<void> {
    // Handle regular lab field updates
    const labData: Record<string, any> = {};
    if (updates.name !== undefined) labData.name = updates.name;
    if (updates.description !== undefined) labData.description = updates.description;
    if (updates.memberIds !== undefined) labData.memberIds = updates.memberIds;
    if (updates.supervisorId !== undefined) labData.supervisorId = updates.supervisorId;

    if (Object.keys(labData).length > 0) {
        await prisma.lab.update({ where: { id }, data: labData });
    }

    // Handle pendingInvites — replace the entire set in the Invite table
    if (updates.pendingInvites !== undefined) {
        // Delete existing invites for this lab
        await prisma.invite.deleteMany({ where: { labId: id } });
        // Re-create with the new set
        if (updates.pendingInvites.length > 0) {
            await prisma.invite.createMany({
                data: updates.pendingInvites.map(inv => ({
                    email: inv.email,
                    token: inv.token,
                    invitedAt: new Date(inv.invitedAt),
                    expiresAt: new Date(inv.expiresAt),
                    labId: id,
                })),
            });
        }
    }
}

export async function deleteLab(id: string): Promise<void> {
    // Invites cascade-deleted via onDelete: Cascade in schema
    await prisma.lab.delete({ where: { id } });
}

export async function getLabsByMember(userId: string): Promise<Lab[]> {
    const rows = await prisma.lab.findMany({
        where: {
            OR: [
                { memberIds: { has: userId } },
                { supervisorId: userId },
            ],
        },
        include: { invites: true },
    });
    return rows.map(r => toPlain(r));
}

export async function getLabBySupervisor(supervisorId: string): Promise<Lab | null> {
    const row = await prisma.lab.findFirst({
        where: { supervisorId },
        include: { invites: true },
    });
    return row ? toPlain(row) : null;
}

export async function getLabByInviteToken(token: string): Promise<{ lab: Lab; invite: LabInvite } | null> {
    const inviteRow = await prisma.invite.findUnique({
        where: { token },
        include: { lab: { include: { invites: true } } },
    });
    if (!inviteRow) return null;

    const lab = toPlain(inviteRow.lab);
    const invite: LabInvite = {
        email: inviteRow.email,
        token: inviteRow.token,
        invitedAt: inviteRow.invitedAt instanceof Date ? inviteRow.invitedAt.toISOString() : String(inviteRow.invitedAt),
        expiresAt: inviteRow.expiresAt instanceof Date ? inviteRow.expiresAt.toISOString() : String(inviteRow.expiresAt),
    };
    return { lab, invite };
}
