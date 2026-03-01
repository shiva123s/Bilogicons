'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '', displayName: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setError('');
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, accountType: 'individual' }),
        });
        const data = await res.json();
        setLoading(false);
        if (!res.ok) { setError(data.error || 'Registration failed'); return; }
        router.push('/auth/login?registered=1');
    };

    return (
        <div className="page-wrap" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
            <div className="auth-header">
                <div className="auth-logo">🔬 Bilogicons</div>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem', fontSize: '0.88rem' }}>Join thousands of scientists — free forever</p>
            </div>
            <div className="form-card" style={{ maxWidth: 480 }}>
                <div className="form-title">Create your account</div>
                <div className="form-sub">
                    Download unlimited icons instantly. Want to join a lab group? Ask your supervisor to invite you after you register.
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Display Name</label>
                        <input className="form-input" value={form.displayName} onChange={set('displayName')} required placeholder="Dr. Jane Scientist" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-input" type="email" value={form.email} onChange={set('email')} required placeholder="you@university.edu" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-input" type="password" value={form.password} onChange={set('password')} required placeholder="Min. 6 characters" minLength={6} />
                    </div>
                    {error && <div className="form-error" style={{ marginBottom: '1rem' }}>⚠ {error}</div>}
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', justifyContent: 'center' }}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>
                <div className="form-divider">
                    Already have an account? <Link href="/auth/login" className="form-link">Sign In</Link>
                </div>
                <div style={{ marginTop: '1rem', padding: '0.9rem', background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    🏫 <strong>Supervisor?</strong> Register first, then create your Lab Group from the <strong>Lab</strong> section in the navbar.
                </div>
            </div>
        </div>
    );
}
