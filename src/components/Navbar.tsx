'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const user = session?.user as any;

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link href="/" className="nav-logo">🔬 Bilogicons</Link>
                <div className="nav-links">
                    <Link href="/gallery" className={`nav-link ${pathname === '/gallery' ? 'active' : ''}`}>Browse Icons</Link>
                    <Link href="/workflows" className={`nav-link ${pathname === '/workflows' ? 'active' : ''}`}>Workflows</Link>
                    {session && (
                        <>
                            <Link href="/upload" className={`nav-link ${pathname === '/upload' ? 'active' : ''}`}>Upload</Link>
                            <Link href="/lab" className={`nav-link ${pathname === '/lab' ? 'active' : ''}`}>Lab</Link>
                            <Link href="/dashboard" className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
                        </>
                    )}
                </div>
                <div className="nav-links">
                    {session ? (
                        <>
                            <span className="nav-link" style={{ color: 'var(--text)', fontWeight: 600 }}>
                                {user?.name || user?.email}
                                {user?.labName && <span style={{ color: 'var(--primary)', fontSize: '0.78rem', marginLeft: '0.4rem' }}>· {user.labName}</span>}
                            </span>
                            <button className="btn btn-secondary btn-sm" onClick={() => signOut()}>Sign Out</button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="btn btn-secondary btn-sm">Sign In</Link>
                            <Link href="/auth/register" className="btn btn-primary btn-sm">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
