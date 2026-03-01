import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUserByEmail, validatePassword, findUserById } from './users';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await findUserByEmail(credentials.email);
                if (!user) return null;
                const valid = await validatePassword(user, credentials.password);
                if (!valid) return null;
                return {
                    id: user.id,
                    email: user.email,
                    name: user.displayName,
                    image: user.avatarUrl || null,
                    accountType: user.accountType,
                    labId: user.labId,
                    labName: user.labName,
                    labRole: user.labRole,
                };
            },
        }),
    ],
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            // On initial sign-in, seed the token from the authorize() return value
            if (user) {
                token.id = user.id;
                token.accountType = (user as any).accountType;
                token.labId = (user as any).labId;
                token.labName = (user as any).labName;
                token.labRole = (user as any).labRole;
            }

            // On every subsequent request, always refresh lab fields from DB.
            // This means lab creation / joining takes effect on the very next page load
            // without requiring the user to log out.
            if (token.id) {
                try {
                    const fresh = await findUserById(token.id as string);
                    if (fresh) {
                        token.labId = fresh.labId || null;
                        token.labName = fresh.labName || null;
                        token.labRole = fresh.labRole || null;
                        token.name = fresh.displayName; // keep displayName in sync too
                    }
                } catch {
                    // If DB read fails, keep existing token values
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).accountType = token.accountType;
                (session.user as any).labId = token.labId;
                (session.user as any).labName = token.labName;
                (session.user as any).labRole = token.labRole;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
