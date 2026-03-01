'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LabManagerPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const user = session?.user as any;

    const [pageReady, setPageReady] = useState(false);
    const [myLab, setMyLab] = useState<any>(null);
    const [labDetail, setLabDetail] = useState<any>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Create lab form
    const [createForm, setCreateForm] = useState({ labId: '', name: '', description: '' });
    const [createError, setCreateError] = useState('');
    const [createLoading, setCreateLoading] = useState(false);
    const [toast, setToast] = useState('');
    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

    useEffect(() => {
        if (status === 'loading') return;
        if (status === 'unauthenticated') { router.push('/auth/login'); return; }
        loadData();
    }, [status]);

    if (status === 'loading' || !pageReady) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem', animation: 'float 1.5s ease-in-out infinite' }}>🏫</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading lab manager…</p>
            </div>
        );
    }

    async function loadData() {
        try {
            const labsRes = await fetch('/api/labs');
            if (!labsRes.ok) return;
            const labs = await labsRes.json();
            if (Array.isArray(labs) && labs.length > 0) {
                const lab = labs[0];
                setMyLab(lab);
                // Try to get full detail (members list etc) — not required for rendering
                try {
                    const detailRes = await fetch(`/api/labs/${lab.id}`);
                    if (detailRes.ok) setLabDetail(await detailRes.json());
                    else setLabDetail(lab); // use basic data as fallback
                } catch {
                    setLabDetail(lab); // fallback to the basic labs[] entry
                }
            }
        } catch (err) {
            console.error('Lab data load error:', err);
        } finally {
            setPageReady(true);
        }
    }

    async function handleCreateLab(e: React.FormEvent) {
        e.preventDefault();
        setCreateLoading(true); setCreateError('');
        const res = await fetch('/api/labs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createForm),
        });
        const data = await res.json();
        setCreateLoading(false);
        if (!res.ok) { setCreateError(data.error); return; }
        showToast(`Lab "${data.name}" created!`);
        setShowCreateForm(false);
        await loadData();
    }

    async function handleDeleteLab() {
        if (!confirm(`Permanently delete "${myLab.name}"? This cannot be undone.`)) return;
        const res = await fetch(`/api/labs/${myLab.id}`, { method: 'DELETE' });
        if (res.ok) { setMyLab(null); setLabDetail(null); showToast('Lab deleted'); }
    }

    async function handleLeaveLab() {
        if (!confirm('Leave this lab?')) return;
        const res = await fetch(`/api/labs/${myLab.id}/join`, { method: 'DELETE' });
        if (res.ok) { setMyLab(null); setLabDetail(null); showToast('Left the lab'); }
    }

    // Derived
    const hasLab = myLab !== null;
    const isSupervisor = hasLab && labDetail?.supervisorId === user?.id;

    const statCard = (emoji: string, value: string | number, label: string, color: string) => (
        <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '1.2rem 1.4rem', boxShadow: 'var(--shadow-md)', borderTop: `4px solid ${color}`, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{emoji}</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem', fontWeight: 600 }}>{label}</div>
        </div>
    );

    return (
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '2rem 1.5rem' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>🏫 Lab Manager</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                {hasLab ? `Managing: ${labDetail?.name || myLab?.name}` : 'Create your lab group or accept an invitation.'}
            </p>

            {/* ════ NO LAB — 3 option cards ════ */}
            {!hasLab && !showCreateForm && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem', marginBottom: '1.5rem' }}>
                    <div className="feature-card" style={{ borderTop: '4px solid var(--primary)' }}>
                        <div className="feature-icon">🏛️</div>
                        <div className="feature-title">Create a Lab</div>
                        <div className="feature-desc" style={{ marginBottom: '1rem' }}>Start your lab group as supervisor and invite team members.</div>
                        <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>Create Lab Group</button>
                    </div>
                    <div className="feature-card" style={{ borderTop: '4px solid var(--accent-green)' }}>
                        <div className="feature-icon">🔔</div>
                        <div className="feature-title">Check Invitations</div>
                        <div className="feature-desc" style={{ marginBottom: '1rem' }}>If a supervisor invited you, accept it from your Dashboard.</div>
                        <Link href="/dashboard" className="btn btn-secondary" style={{ display: 'inline-flex' }}>Go to Dashboard</Link>
                    </div>
                    <div className="feature-card" style={{ borderTop: '4px solid #8b5cf6' }}>
                        <div className="feature-icon">🖼️</div>
                        <div className="feature-title">Browse Icons</div>
                        <div className="feature-desc" style={{ marginBottom: '1rem' }}>Explore the public biological SVG icon library.</div>
                        <Link href="/gallery" className="btn btn-secondary" style={{ display: 'inline-flex' }}>Browse Gallery</Link>
                    </div>
                </div>
            )}

            {/* ════ Create lab form ════ */}
            {!hasLab && showCreateForm && (
                <div className="form-card" style={{ maxWidth: 540, marginBottom: '1.5rem' }}>
                    <div className="form-title">Create Your Lab Group</div>
                    <div className="form-sub">You'll become the supervisor. Invite members via Dashboard → Invitations.</div>
                    <form onSubmit={handleCreateLab}>
                        <div className="form-group">
                            <label>Lab ID <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(unique, no spaces)</span></label>
                            <input className="form-input" placeholder="smithlab2024" required minLength={3} maxLength={30}
                                value={createForm.labId}
                                onChange={e => setCreateForm(f => ({ ...f, labId: e.target.value.replace(/[^a-zA-Z0-9_-]/g, '') }))} />
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Letters, numbers, hyphens, underscores. 3–30 chars.</div>
                        </div>
                        <div className="form-group">
                            <label>Lab Name</label>
                            <input className="form-input" placeholder="Smith Lab" required value={createForm.name}
                                onChange={e => setCreateForm(f => ({ ...f, name: e.target.value }))} />
                        </div>
                        <div className="form-group">
                            <label>Description <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
                            <input className="form-input" placeholder="Computational biology since 2010"
                                value={createForm.description} onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))} />
                        </div>
                        {createError && <div className="form-error" style={{ marginBottom: '0.8rem' }}>⚠ {createError}</div>}
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button type="submit" className="btn btn-primary" disabled={createLoading} style={{ flex: 1, justifyContent: 'center' }}>
                                {createLoading ? 'Creating…' : '🏛️ Create Lab'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowCreateForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {/* ════ HAS LAB — 3 stat cards + 3 action cards ════ */}
            {hasLab && labDetail && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Lab name + description */}
                    <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '1.4rem 1.6rem', boxShadow: 'var(--shadow-md)', borderLeft: '4px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{labDetail.name}</h2>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                                <code style={{ background: 'var(--bg)', padding: '0.1rem 0.4rem', borderRadius: 4, fontFamily: 'monospace' }}>{labDetail.id}</code>
                                {labDetail.description && <span style={{ marginLeft: '0.6rem' }}>{labDetail.description}</span>}
                            </div>
                        </div>
                        <span style={{ background: isSupervisor ? '#e0f2fe' : '#f0fdf4', color: isSupervisor ? '#0369a1' : '#15803d', borderRadius: 50, padding: '0.3rem 1rem', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                            {isSupervisor ? '👑 Supervisor' : '👤 Member'}
                        </span>
                    </div>

                    {/* 3 stat cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        {statCard('👥', labDetail.memberIds?.length || 0, 'Members', 'var(--primary)')}
                        {statCard('📨', labDetail.pendingInvites?.length || 0, 'Pending Invites', '#d97706')}
                        {statCard(isSupervisor ? '👑' : '👤', isSupervisor ? 'Supervisor' : 'Member', 'Your Role', isSupervisor ? '#0ea5e9' : '#10b981')}
                    </div>

                    {/* ── 3 BIG ASSET CARDS ─────────────────────────────────────── */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
                        {/* Card 1 — Members */}
                        <Link href={`/lab/members?labId=${labDetail.id}`} style={{ textDecoration: 'none' }}>
                            <div className="feature-card" style={{ borderTop: '4px solid var(--primary)', cursor: 'pointer', transition: 'transform 0.15s', height: '100%' }}
                                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                                onMouseLeave={e => (e.currentTarget.style.transform = '')}>
                                <div className="feature-icon">👥</div>
                                <div className="feature-title">Members</div>
                                <div className="feature-desc">View all lab members, their profiles, and manage invitations.</div>
                                <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600 }}>Open Members →</div>
                            </div>
                        </Link>

                        {/* Card 2 — Icons */}
                        <Link href={`/lab/icons?labId=${labDetail.id}`} style={{ textDecoration: 'none' }}>
                            <div className="feature-card" style={{ borderTop: '4px solid #8b5cf6', cursor: 'pointer', transition: 'transform 0.15s', height: '100%' }}
                                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                                onMouseLeave={e => (e.currentTarget.style.transform = '')}>
                                <div className="feature-icon">🖼️</div>
                                <div className="feature-title">Icons</div>
                                <div className="feature-desc">Browse and download icons uploaded by your lab members.</div>
                                <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: '#7c3aed', fontWeight: 600 }}>Open Icons →</div>
                            </div>
                        </Link>

                        {/* Card 3 — Workflows */}
                        <Link href={`/lab/workflows?labId=${labDetail.id}`} style={{ textDecoration: 'none' }}>
                            <div className="feature-card" style={{ borderTop: '4px solid var(--accent-green)', cursor: 'pointer', transition: 'transform 0.15s', height: '100%' }}
                                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                                onMouseLeave={e => (e.currentTarget.style.transform = '')}>
                                <div className="feature-icon">📁</div>
                                <div className="feature-title">Workflows</div>
                                <div className="feature-desc">Access bioinformatics workflow templates shared by your lab.</div>
                                <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: '#059669', fontWeight: 600 }}>Open Workflows →</div>
                            </div>
                        </Link>
                    </div>

                    {/* Danger zone */}
                    <div style={{ background: '#fff5f5', border: '1.5px solid #fca5a5', borderRadius: 'var(--radius-lg)', padding: '1.2rem 1.5rem' }}>
                        <div style={{ fontWeight: 700, color: '#991b1b', marginBottom: '0.6rem' }}>⚠️ Danger Zone</div>
                        {isSupervisor ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Delete this lab</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Permanently removes the lab. All members lose access immediately.</div>
                                </div>
                                <button className="btn btn-sm" style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '0.4rem 1rem' }}
                                    onClick={handleDeleteLab}>Delete Lab</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Leave this lab</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>You'll lose access to private lab resources.</div>
                                </div>
                                <button className="btn btn-sm" style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '0.4rem 1rem' }}
                                    onClick={handleLeaveLab}>Leave Lab</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {toast && <div className="toast success">{toast}</div>}
        </div>
    );
}
