'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setError('');
        const res = await signIn('credentials', { email, password, redirect: false });
        setLoading(false);
        if (res?.error) { setError('Invalid email or password'); return; }
        router.push('/gallery');
    };

    return (
        <div className="page-wrap">
            <div className="auth-header">
                <div className="auth-logo">🔬 Bilogicons</div>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem', fontSize: '0.88rem' }}>Sign in to download and share icons</p>
            </div>
            <div className="form-card">
                <div className="form-title">Welcome back</div>
                <div className="form-sub">Enter your credentials to continue</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@lab.edu" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
                    </div>
                    {error && <div className="form-error">⚠ {error}</div>}
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', fontSize: '1rem', justifyContent: 'center' }}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <div className="form-divider">New to BioLogIcons?</div>
                <Link href="/auth/register" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '0.7rem' }}>Create Account</Link>
            </div>
        </div>
    );
}
