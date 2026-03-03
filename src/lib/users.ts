import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export interface User {
    id: string;
    email: string;
    passwordHash: string;
    displayName: string;
    accountType: string;
    labId?: string | null;
    labName?: string | null;
    labRole?: string | null;
    avatarUrl?: string | null;
    createdAt: string;
    downloads: string[];
    likes: string[];
}

/** Convert a Prisma User row into a plain serialisable object that matches the old interface */
function toPlain(row: any): User {
    return {
        id: row.id,
        email: row.email,
        passwordHash: row.passwordHash,
        displayName: row.displayName,
        accountType: row.accountType,
        labId: row.labId ?? undefined,
        labName: row.labName ?? undefined,
        labRole: row.labRole ?? undefined,
        avatarUrl: row.avatarUrl ?? undefined,
        createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt,
        downloads: row.downloads ?? [],
        likes: row.likes ?? [],
    };
}

export async function findUserByEmail(email: string): Promise<User | null> {
    const row = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
    });
    return row ? toPlain(row) : null;
}

export async function findUserById(id: string): Promise<User | null> {
    const row = await prisma.user.findUnique({
        where: { id },
    });
    return row ? toPlain(row) : null;
}

export async function createUser(data: {
    id: string;
    email: string;
    password: string;
    displayName: string;
    accountType: string;
    labId?: string;
    labName?: string;
}): Promise<User> {
    const existing = await prisma.user.findUnique({
        where: { email: data.email.toLowerCase() },
    });
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(data.password, 12);

    const row = await prisma.user.create({
        data: {
            id: data.id,
            email: data.email.toLowerCase(),
            passwordHash,
            displayName: data.displayName,
            accountType: data.accountType,
            labId: data.labId,
            labName: data.labName,
        },
    });
    return toPlain(row);
}

export async function validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
}

export async function updateUser(id: string, updates: Partial<User>): Promise<void> {
    // Strip out undefined values — Prisma ignores undefined but
    // explicit undefined on nullable fields can be tricky across versions.
    const clean: Record<string, any> = {};
    for (const [k, v] of Object.entries(updates)) {
        if (k === 'createdAt') continue; // never mutate this
        clean[k] = v === undefined ? null : v;
    }
    await prisma.user.update({
        where: { id },
        data: clean,
    });
}

export async function getLabMembers(labId: string): Promise<User[]> {
    const rows = await prisma.user.findMany({
        where: { labId },
    });
    return rows.map(toPlain);
}
