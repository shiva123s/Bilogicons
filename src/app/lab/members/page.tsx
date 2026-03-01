'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

/* ─── tiny helpers ─────────────────────────────────────────────── */
function Avatar({ member, isSup }: { member: any; isSup: boolean }) {
    const gradient = isSup
        ? 'linear-gradient(135deg,#0ea5e9,#8b5cf6)'
        : 'linear-gradient(135deg,#10b981,#22c55e)';
    return (
        <div style={{
            width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
            background: gradient, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'white', fontWeight: 800,
            fontSize: '1.25rem', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>
            {member.avatarUrl
                ? <img src={member.avatarUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                : (member.displayName || '?')[0].toUpperCase()}
        </div>
    );
}

function Badge({ children, color, bg }: { children: React.ReactNode; color: string; bg: string }) {
    return (
        <span style={{
            fontSize: '0.68rem', background: bg, color, padding: '0.15rem 0.6rem',
            borderRadius: 999, fontWeight: 700, whiteSpace: 'nowrap',
        }}>{children}</span>
    );
}

function Spinner() {
    return (
        <span style={{
            display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)',
            borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite',
            marginRight: 6, verticalAlign: 'middle',
        }} />
    );
}

/* ─── main page ─────────────────────────────────────────────────── */
export default function LabMembersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const user = session?.user as any;
    const labId = searchParams.get('labId') || user?.labId;

    const [lab, setLab] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    /* invite modal */
    const [showInvite, setShowInvite] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteStatus, setInviteStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [inviteMsg, setInviteMsg] = useState('');

    /* toast */
    const [toast, setToast] = useState('');
    const showToast = useCallback((msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    }, []);

    /* ── load lab ── */
    const loadLab = useCallback(async () => {
        if (!labId) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/labs/${labId}`);
            if (res.ok) setLab(await res.json());
            else router.push('/lab');
        } finally {
            setLoading(false);
        }
    }, [labId, router]);

    useEffect(() => {
        if (status === 'loading') return;
        if (status === 'unauthenticated') { router.push('/auth/login'); return; }
        if (!labId) { router.push('/lab'); return; }
        loadLab();
    }, [status, labId, loadLab]);

    /* ── invite ── */
    async function handleInvite(e: React.FormEvent) {
        e.preventDefault();
        setInviteStatus('loading');
        setInviteMsg('');
        const res = await fetch(`/api/labs/${labId}/invite`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: inviteEmail }),
        });
        const data = await res.json();
        if (!res.ok) {
            setInviteStatus('error');
            setInviteMsg(data.error || 'Something went wrong');
        } else {
            setInviteStatus('success');
            setInviteMsg("Invite sent! They'll see it in their Dashboard → Invitations tab.");
            setInviteEmail('');
            await loadLab();
        }
    }

    function closeModal() {
        setShowInvite(false);
        setInviteEmail('');
        setInviteStatus('idle');
        setInviteMsg('');
    }

    /* ── remove / cancel ── */
    async function handleRemoveMember(userId: string, name: string) {
        if (!confirm(`Remove ${name} from the lab?`)) return;
        const res = await fetch(`/api/labs/${labId}/members/${userId}`, { method: 'DELETE' });
        if (res.ok) { showToast(`${name} removed`); await loadLab(); }
    }

    async function handleCancelInvite(email: string) {
        await fetch(`/api/labs/${labId}/invite`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        showToast('Invite cancelled');
        await loadLab();
    }

    /* ── loading state ── */
    if (loading || status === 'loading') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '55vh', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem', animation: 'float 1.5s ease-in-out infinite' }}>👥</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading members…</p>
            </div>
        );
    }
    if (!lab) return null;

    const isSupervisor = lab.supervisorId === user?.id;
    const members: any[] = lab.members || [];

    /* ─── render ─────────────────────────────────────────────────── */
    return (
        <>
            {/* Spin keyframe for button spinner */}
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

            <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>

                {/* ── Breadcrumb ── */}
                <div style={{ marginBottom: '1.4rem', fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Link href="/lab" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Lab Manager</Link>
                    <span>›</span>
                    <span style={{ fontWeight: 700, color: 'var(--text)' }}>Members</span>
                </div>

                {/* ── Header ── */}
                <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '1.6rem 1.8rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.25rem' }}>
                            👥 {lab.name} — Members
                        </h1>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <strong style={{ color: 'var(--text)' }}>{members.length}</strong> member{members.length !== 1 ? 's' : ''}
                            {lab.pendingInvites?.length > 0 && (
                                <span> · <strong style={{ color: '#d97706' }}>{lab.pendingInvites.length}</strong> pending invite{lab.pendingInvites.length !== 1 ? 's' : ''}</span>
                            )}
                        </p>
                    </div>
                    {isSupervisor && (
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowInvite(true)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span>📧</span> Invite Member
                        </button>
                    )}
                </div>

                {/* ── Member cards grid (Bento Box) ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    {members.map(m => {
                        const isYou = m.id === user?.id;
                        const isMemberSup = m.id === lab.supervisorId;
                        return (
                            <div key={m.id} style={{
                                background: 'var(--surface)',
                                borderRadius: 'var(--radius-xl)',
                                padding: '1.4rem',
                                boxShadow: 'var(--shadow-md)',
                                borderTop: `3px solid ${isMemberSup ? '#0ea5e9' : '#10b981'}`,
                                display: 'flex', flexDirection: 'column', gap: '0.9rem',
                                transition: 'transform 0.15s, box-shadow 0.15s',
                            }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'; }}
                            >
                                {/* Top row: avatar + badges */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                    <Avatar member={m} isSup={isMemberSup} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {m.displayName}
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
                                            {isMemberSup && <Badge bg="#e0f2fe" color="#0369a1">👑 Supervisor</Badge>}
                                            {isYou && <Badge bg="#f0fdf4" color="#15803d">You</Badge>}
                                            {!isMemberSup && !isYou && <Badge bg="#f3f4f6" color="#6b7280">Member</Badge>}
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', wordBreak: 'break-all', lineHeight: 1.4 }}>
                                    {m.email}
                                </div>

                                {/* Action buttons */}
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                                    <Link
                                        href={`/lab/members/${m.id}?labId=${labId}`}
                                        className="btn btn-sm btn-primary"
                                        style={{ flex: 1, justifyContent: 'center', textAlign: 'center', textDecoration: 'none' }}>
                                        View Dashboard →
                                    </Link>
                                    {isSupervisor && !isYou && (
                                        <button
                                            className="btn btn-sm"
                                            style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0 }}
                                            onClick={() => handleRemoveMember(m.id, m.displayName)}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Empty state */}
                    {members.length === 0 && (
                        <div className="empty-state" style={{ gridColumn: '1/-1' }}>
                            <div className="empty-state-icon">👥</div>
                            <h3>No members yet</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Invite your first team member using the button above.</p>
                        </div>
                    )}
                </div>

                {/* ── Pending invites panel (supervisor only) ── */}
                {isSupervisor && lab.pendingInvites?.length > 0 && (
                    <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '1.4rem 1.6rem', boxShadow: 'var(--shadow-md)', borderLeft: '4px solid #f59e0b' }}>
                        <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            📨 Pending Invitations
                            <span style={{ background: '#fef3c7', color: '#92400e', borderRadius: 999, padding: '0.1rem 0.6rem', fontSize: '0.72rem', fontWeight: 700 }}>
                                {lab.pendingInvites.length}
                            </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {lab.pendingInvites.map((inv: any) => (
                                <div key={inv.email} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0.85rem', background: 'var(--bg)', borderRadius: 'var(--radius-md)', flexWrap: 'wrap', gap: '0.6rem', border: '1px solid var(--border)' }}>
                                    <div>
                                        <div style={{ fontSize: '0.87rem', fontWeight: 600 }}>{inv.email}</div>
                                        {inv.expiresAt && (
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
                                                Expires {new Date(inv.expiresAt).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                                        {inv.token && (
                                            <button
                                                style={{ background: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: 6, cursor: 'pointer', padding: '0.3rem 0.7rem', fontSize: '0.74rem', fontWeight: 600 }}
                                                onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/lab/accept?token=${inv.token}&lab=${labId}`); showToast('Accept link copied!'); }}>
                                                📋 Copy Link
                                            </button>
                                        )}
                                        <button
                                            style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer', padding: '0.3rem 0.7rem', fontSize: '0.74rem', fontWeight: 600 }}
                                            onClick={() => handleCancelInvite(inv.email)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Invite Modal ───────────────────────────────────────────── */}
            {showInvite && (
                <div
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(4px)' }}
                    onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
                    <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '2rem', width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', animation: 'float 0s' }}>

                        {/* Modal header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.25rem' }}>📧 Invite a Team Member</h2>
                                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                                    They'll see the invitation in their <strong>Dashboard → Invitations</strong> tab.
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', color: 'var(--text-muted)', lineHeight: 1, padding: '0 0.2rem', marginLeft: '1rem' }}
                                aria-label="Close">×</button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleInvite}>
                            <div className="form-group">
                                <label htmlFor="invite-email" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                                    Email Address
                                </label>
                                <input
                                    id="invite-email"
                                    className="form-input"
                                    type="email"
                                    placeholder="colleague@university.edu"
                                    value={inviteEmail}
                                    onChange={e => { setInviteEmail(e.target.value); setInviteStatus('idle'); setInviteMsg(''); }}
                                    required
                                    autoFocus
                                    disabled={inviteStatus === 'loading'}
                                    style={{ marginTop: '0.35rem' }}
                                />
                            </div>

                            {/* Status messages */}
                            {inviteStatus === 'success' && (
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.84rem', color: '#15803d' }}>
                                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>✅</span>
                                    <span>{inviteMsg}</span>
                                </div>
                            )}
                            {inviteStatus === 'error' && (
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', background: '#fff5f5', border: '1px solid #fca5a5', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.84rem', color: '#dc2626' }}>
                                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>⚠️</span>
                                    <span>{inviteMsg}</span>
                                </div>
                            )}

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={inviteStatus === 'loading' || !inviteEmail}
                                    style={{ flex: 1, justifyContent: 'center', opacity: !inviteEmail ? 0.6 : 1 }}>
                                    {inviteStatus === 'loading' ? (
                                        <><Spinner />Sending…</>
                                    ) : inviteStatus === 'success' ? (
                                        '📨 Send Another'
                                    ) : '📨 Send Invite'}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    {inviteStatus === 'success' ? 'Done' : 'Cancel'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Toast ── */}
            {toast && (
                <div style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', background: '#1e293b', color: 'white', padding: '0.65rem 1.4rem', borderRadius: 999, fontSize: '0.87rem', fontWeight: 600, boxShadow: '0 4px 24px rgba(0,0,0,0.2)', zIndex: 2000, whiteSpace: 'nowrap' }}>
                    ✓ {toast}
                </div>
            )}
        </>
    );
}
