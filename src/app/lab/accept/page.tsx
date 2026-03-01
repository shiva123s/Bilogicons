'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AcceptInvitePage() {
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get('token') || '';
    const labId = searchParams.get('lab') || '';

    const [state, setState] = useState<'loading' | 'ready' | 'joining' | 'success' | 'error'>('loading');
    const [labName, setLabName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Decode labId to show lab name while loading session
    useEffect(() => {
        if (labId) setLabName(labId.replace(/-/g, ' '));
    }, [labId]);

    useEffect(() => {
        if (status === 'loading') return;
        if (status === 'unauthenticated') {
            // Not logged in — redirect to login then come back
            setState('ready'); // show the "please login" view
        } else {
            setState('ready');
        }
    }, [status]);

    const handleAccept = async () => {
        if (!session?.user) {
            router.push(`/auth/login?callbackUrl=${encodeURIComponent(`/lab/accept?token=${token}&lab=${labId}`)}`);
            return;
        }

        setState('joining');
        try {
            const res = await fetch('/api/labs/accept', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, labId }),
            });
            const data = await res.json();
            if (!res.ok) {
                setState('error');
                setErrorMsg(data.error || 'Failed to accept invite');
                return;
            }
            setLabName(data.labName || labId);
            setState('success');
        } catch {
            setState('error');
            setErrorMsg('Network error. Please try again.');
        }
    };

    if (state === 'loading') {
        return (
            <div className="page-wrap">
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem', animation: 'float 1.5s ease-in-out infinite' }}>🔬</div>
                    <p style={{ color: 'var(--text-muted)' }}>Loading invitation…</p>
                </div>
            </div>
        );
    }

    if (state === 'success') {
        return (
            <div className="page-wrap">
                <div className="form-card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>You've joined!</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Welcome to <strong>{labName}</strong>. You now have access to all private lab icons and workflows.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/lab" className="btn btn-primary">View Lab Dashboard</Link>
                        <Link href="/gallery" className="btn btn-secondary">Browse Icons</Link>
                    </div>
                </div>
            </div>
        );
    }

    if (state === 'error') {
        return (
            <div className="page-wrap">
                <div className="form-card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.6rem' }}>Invitation Error</h1>
                    <p style={{ color: '#ef4444', marginBottom: '1.5rem' }}>{errorMsg}</p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/lab" className="btn btn-primary">Go to Lab Manager</Link>
                        <Link href="/" className="btn btn-secondary">Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    // ready state
    return (
        <div className="page-wrap">
            <div className="form-card" style={{ maxWidth: 480, textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏫</div>
                <div className="auth-logo" style={{ marginBottom: '0.3rem' }}>Bilogicons</div>

                <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '1.2rem 0 0.5rem' }}>
                    Lab Invitation
                </h1>
                {labName && (
                    <div style={{ background: '#e0f2fe', color: '#0369a1', borderRadius: 50, display: 'inline-block', padding: '0.2rem 1rem', fontWeight: 700, fontSize: '0.9rem', margin: '0.5rem 0 1rem' }}>
                        {labName}
                    </div>
                )}

                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    You've been invited to join a lab on Bilogicons. As a member, you'll get access to:
                </p>

                <div style={{ background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                    {[['🖼️', 'Private lab icon library'], ['🗂️', 'Lab workflow templates'], ['⬇️', 'Download SVG icons'], ['📤', 'Upload to lab library']].map(([icon, text]) => (
                        <div key={text} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.88rem', color: 'var(--text)' }}>
                            <span>{icon}</span><span>{text}</span>
                        </div>
                    ))}
                </div>

                {!session ? (
                    <>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: '1.2rem' }}>
                            Sign in (or register) with the email address this invitation was sent to, then click Accept.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
                            <Link
                                href={`/auth/login?callbackUrl=${encodeURIComponent(`/lab/accept?token=${token}&lab=${labId}`)}`}
                                className="btn btn-primary"
                                style={{ justifyContent: 'center', padding: '0.75rem' }}
                            >
                                Sign In to Accept
                            </Link>
                            <Link
                                href={`/auth/register`}
                                className="btn btn-secondary"
                                style={{ justifyContent: 'center', padding: '0.7rem', fontSize: '0.88rem' }}
                            >
                                New here? Register with the invited email
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                            Logged in as <strong>{(session.user as any)?.email}</strong>
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={handleAccept}
                            disabled={state === 'joining'}
                            style={{ width: '100%', justifyContent: 'center', padding: '0.8rem', fontSize: '1rem' }}
                        >
                            {state === 'joining' ? 'Joining…' : '✓ Accept & Join Lab'}
                        </button>
                    </>
                )}

                {!token && (
                    <div style={{ marginTop: '1rem', color: '#ef4444', fontSize: '0.82rem' }}>
                        ⚠️ Invalid invite link — missing token. Please use the link from your email.
                    </div>
                )}
            </div>
        </div>
    );
}
