import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface User {
    id: string;
    email: string;
    passwordHash: string;
    displayName: string;
    accountType: 'individual' | 'lab';
    labId?: string;
    labName?: string;
    labRole?: 'supervisor' | 'member';
    avatarUrl?: string;
    createdAt: string;
    downloads: string[];
    likes: string[];
}

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

async function readUsers(): Promise<User[]> {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf-8');
        return JSON.parse(data) as User[];
    } catch {
        return [];
    }
}

async function writeUsers(users: User[]): Promise<void> {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function findUserByEmail(email: string): Promise<User | null> {
    const users = await readUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function findUserById(id: string): Promise<User | null> {
    const users = await readUsers();
    return users.find(u => u.id === id) || null;
}

export async function createUser(data: {
    id: string;
    email: string;
    password: string;
    displayName: string;
    accountType: 'individual' | 'lab';
    labId?: string;
    labName?: string;
}): Promise<User> {
    const users = await readUsers();
    const existing = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(data.password, 12);
    const user: User = {
        id: data.id,
        email: data.email,
        passwordHash,
        displayName: data.displayName,
        accountType: data.accountType,
        labId: data.labId,
        labName: data.labName,
        avatarUrl: undefined,
        createdAt: new Date().toISOString(),
        downloads: [],
        likes: [],
    };
    users.push(user);
    await writeUsers(users);
    return user;
}

export async function validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
}

export async function updateUser(id: string, updates: Partial<User>): Promise<void> {
    const users = await readUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates };
        await writeUsers(users);
    }
}

export async function getLabMembers(labId: string): Promise<User[]> {
    const users = await readUsers();
    return users.filter(u => u.labId === labId);
}
