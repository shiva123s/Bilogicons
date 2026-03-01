'use client';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const CAT_COLORS: Record<string, string> = {
    'Cell Biology': '#f97316', 'Microbiology': '#10b981', 'Lab Equipment': '#6366f1',
    'Arrows': '#0ea5e9', 'Shapes': '#8b5cf6', 'Neuroscience': '#f59e0b',
    'Plant Biology': '#22c55e', 'Biochemistry': '#ec4899', 'Drosophila': '#a16207',
    'Mosquito': '#4d7c0f', 'Biologicals': '#d946ef', 'Other': '#64748b',
};

export default function DashboardPage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const [tab, setTab] = useState('My Icons');
    const [allIcons, setAllIcons] = useState<any[]>([]);
    const [profile, setProfile] = useState<any>(null);
    const [displayName, setDisplayName] = useState('');
    const [profileMsg, setProfileMsg] = useState('');
    const [saving, setSaving] = useState(false);
    const [pageReady, setPageReady] = useState(false);

    // Invitations state
    const [invites, setInvites] = useState<any[]>([]);
    const [inviteAction, setInviteAction] = useState<Record<string, 'accepting' | 'declining' | null>>({});
    const [inviteMsg, setInviteMsg] = useState('');

    const avatarRef = useRef<HTMLInputElement>(null);
    const user = session?.user as any;

    useEffect(() => {
        if (status === 'loading') return;
        if (status === 'unauthenticated') { router.push('/auth/login'); return; }
        loadAll();
    }, [status]);

    async function loadAll() {
        try {
            const [iconsRes, profileRes, invitesRes] = await Promise.all([
                fetch('/api/icons'),
                fetch('/api/user/profile'),
                fetch('/api/labs/pending'),
            ]);
            if (iconsRes.ok) setAllIcons(await iconsRes.json());
            if (profileRes.ok) {
                const p = await profileRes.json();
                setProfile(p); setDisplayName(p.displayName || '');
            }
            if (invitesRes.ok) {
                const inv = await invitesRes.json();
                setInvites(Array.isArray(inv) ? inv : []);
            }
        } finally {
            setPageReady(true);
        }
    }

    async function handleAcceptInvite(invite: any) {
        setInviteAction(a => ({ ...a, [invite.id]: 'accepting' }));
        const res = await fetch('/api/labs/accept', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: invite.invite?.token, labId: invite.id }),
        });
        const data = await res.json();
        if (res.ok) {
            setInviteMsg(`✓ Joined ${invite.name}! Refresh to see your lab dashboard.`);
            setInvites(prev => prev.filter(i => i.id !== invite.id));
            await update(); // refresh session so user.labId is set
        } else {
            setInviteMsg(`⚠ ${data.error}`);
        }
        setInviteAction(a => ({ ...a, [invite.id]: null }));
    }

    async function handleDeclineInvite(invite: any) {
        setInviteAction(a => ({ ...a, [invite.id]: 'declining' }));
        // Decline = just remove from local state (no DELETE API needed since it's just visibility)
        setInvites(prev => prev.filter(i => i.id !== invite.id));
        setInviteAction(a => ({ ...a, [invite.id]: null }));
    }

    const handleAvatarUpload = async (file: File) => {
        const fd = new FormData();
        fd.append('avatar', file);
        if (displayName) fd.append('displayName', displayName);
        setSaving(true);
        const res = await fetch('/api/user/profile', { method: 'PATCH', body: fd });
        const data = await res.json();
        setSaving(false);
        if (res.ok) { setProfile((p: any) => ({ ...p, ...data })); setProfileMsg('Profile updated!'); }
        else setProfileMsg('Update failed');
        setTimeout(() => setProfileMsg(''), 3000);
    };

    const handleSaveName = async () => {
        const fd = new FormData();
        fd.append('displayName', displayName);
        setSaving(true);
        await fetch('/api/user/profile', { method: 'PATCH', body: fd });
        setSaving(false);
        setProfileMsg('Name updated!');
        setTimeout(() => setProfileMsg(''), 3000);
    };

    if (status === 'loading' || !pageReady) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '2.5rem', animation: 'float 1.5s ease-in-out infinite' }}>📊</div>
                <p style={{ color: 'var(--text-muted)' }}>Loading your dashboard…</p>
            </div>
        );
    }

    const myIcons = allIcons.filter(i => i.uploadedBy === user?.id);
    const hasLab = !!user?.labId;
    const pendingInviteCount = invites.length;

    // Sidebar tabs — only show relevant ones
    const TABS = [
        { key: 'My Icons', icon: '📦', label: 'My Icons' },
        { key: 'Downloads', icon: '⬇️', label: 'Downloads' },
        ...(pendingInviteCount > 0 || !hasLab ? [{ key: 'Invitations', icon: '📬', label: 'Invitations', badge: pendingInviteCount }] : []),
        { key: 'Profile', icon: '👤', label: 'Profile' },
    ];

    const IconGrid = ({ icons }: { icons: any[] }) => (
        icons.length === 0 ? (
            <div className="empty-state">
                <div className="empty-state-icon">🖼️</div>
                <h3>No icons yet</h3>
                <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>Upload your first icon to get started</p>
                <button className="btn btn-primary" onClick={() => router.push('/upload')}>Upload Icon</button>
            </div>
        ) : (
            <div className="icon-grid">
                {icons.map(icon => (
                    <div key={icon.id} className="icon-card" style={{ borderLeftColor: CAT_COLORS[icon.category] || '#0ea5e9' }}>
                        <div className="icon-preview">
                            <div dangerouslySetInnerHTML={{ __html: icon.svgContent }} style={{ width: 100, height: 100 }} />
                        </div>
                        <div className="icon-info">
                            <div className="icon-name">{icon.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                                {icon.category} · {icon.isLabPrivate ? '🔒 Lab' : '🌐 Public'} · ⬇{icon.downloads}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    );

    return (
        <div className="dashboard-layout">
            {/* ─── Sidebar ─────────────────────────────────────── */}
            <aside>
                <div className="profile-card">
                    <div className="avatar-wrap" onClick={() => avatarRef.current?.click()} style={{ cursor: 'pointer' }} title="Click to change photo">
                        {profile?.avatarUrl
                            ? <Image src={profile.avatarUrl} alt="avatar" width={80} height={80} style={{ objectFit: 'cover', borderRadius: '50%' }} />
                            : <span className="avatar-fallback">{(user?.name || 'U')[0].toUpperCase()}</span>}
                        <input ref={avatarRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleAvatarUpload(f); }} />
                    </div>
                    <div className="profile-name">{user?.name || 'User'}</div>
                    <div className="profile-type">{user?.accountType === 'lab' ? '🏫 Lab Account' : '👤 Individual'}</div>
                    {user?.labName && <div className="profile-lab">Lab: {user.labName}</div>}
                </div>

                {/* Navigation tabs */}
                <div className="profile-card" style={{ padding: '0.75rem' }}>
                    {TABS.map(t => (
                        <button key={t.key} className={`sidebar-nav-item ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}
                            style={{ position: 'relative' }}>
                            {t.icon} {t.label}
                            {(t as any).badge > 0 && (
                                <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: '#ef4444', color: 'white', borderRadius: 999, padding: '0 0.4rem', fontSize: '0.68rem', fontWeight: 700, minWidth: 18, textAlign: 'center', lineHeight: '18px' }}>
                                    {(t as any).badge}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Lab quick-link (only when user is in a lab) */}
                {hasLab && (
                    <div className="profile-card" style={{ padding: '0.75rem' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Lab</div>
                        <Link href="/lab" style={{ textDecoration: 'none', display: 'block' }}>
                            <div style={{ padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', background: 'var(--bg)', cursor: 'pointer' }}>
                                🏫 {user.labName}
                            </div>
                        </Link>
                        <Link href={`/lab/members?labId=${user.labId}`} style={{ textDecoration: 'none', display: 'block', marginTop: '0.3rem' }}>
                            <div style={{ padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', background: 'var(--bg)', cursor: 'pointer' }}>
                                👥 Members
                            </div>
                        </Link>
                        <Link href={`/lab/icons?labId=${user.labId}`} style={{ textDecoration: 'none', display: 'block', marginTop: '0.3rem' }}>
                            <div style={{ padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', background: 'var(--bg)', cursor: 'pointer' }}>
                                🖼️ Lab Icons
                            </div>
                        </Link>
                        <Link href={`/lab/workflows?labId=${user.labId}`} style={{ textDecoration: 'none', display: 'block', marginTop: '0.3rem' }}>
                            <div style={{ padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', background: 'var(--bg)', cursor: 'pointer' }}>
                                📁 Lab Workflows
                            </div>
                        </Link>
                    </div>
                )}
            </aside>

            {/* ─── Main content ─────────────────────────────────── */}
            <div className="dashboard-main">
                {tab === 'My Icons' && (
                    <>
                        <div className="dash-section-title">My Uploaded Icons ({myIcons.length})</div>
                        <IconGrid icons={myIcons} />
                    </>
                )}

                {tab === 'Downloads' && (
                    <div className="empty-state">
                        <div className="empty-state-icon">⬇️</div>
                        <h3>Download history coming soon</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Browse the gallery to download icons</p>
                        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => router.push('/gallery')}>Browse Gallery</button>
                    </div>
                )}

                {tab === 'Invitations' && (
                    <div>
                        <div className="dash-section-title">📬 Lab Invitations</div>

                        {inviteMsg && (
                            <div className={`${inviteMsg.startsWith('⚠') ? 'form-error' : 'form-success'}`} style={{ marginBottom: '1rem' }}>{inviteMsg}</div>
                        )}

                        {invites.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">📬</div>
                                <h3>No pending invitations</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                                    {hasLab ? `You're already a member of ${user.labName}.` : 'A lab supervisor can invite you by entering your email on their Lab Manager page.'}
                                </p>
                                {!hasLab && (
                                    <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={() => router.push('/lab')}>Go to Lab Manager</button>
                                )}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {invites.map((inv: any) => (
                                    <div key={inv.id} style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '1.3rem 1.5rem', boxShadow: 'var(--shadow-md)', borderLeft: '4px solid #f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>
                                                🏫 Invitation to join <span style={{ color: 'var(--primary)' }}>{inv.name}</span>
                                            </div>
                                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Lab ID: <code>{inv.id}</code></div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                                            <button
                                                className="btn btn-primary"
                                                disabled={inviteAction[inv.id] === 'accepting'}
                                                onClick={() => handleAcceptInvite(inv)}>
                                                {inviteAction[inv.id] === 'accepting' ? 'Joining…' : '✓ Accept'}
                                            </button>
                                            <button
                                                className="btn btn-secondary"
                                                disabled={inviteAction[inv.id] === 'declining'}
                                                onClick={() => handleDeclineInvite(inv)}>
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {tab === 'Profile' && (
                    <div style={{ maxWidth: 480 }}>
                        <div className="dash-section-title">Edit Profile</div>
                        <div className="form-card" style={{ maxWidth: '100%' }}>
                            <div className="form-group">
                                <label>Profile Picture</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div className="avatar-wrap" style={{ width: 60, height: 60, flexShrink: 0 }}>
                                        {profile?.avatarUrl
                                            ? <Image src={profile.avatarUrl} alt="avatar" width={60} height={60} style={{ objectFit: 'cover', borderRadius: '50%' }} />
                                            : <span className="avatar-fallback" style={{ fontSize: '1.3rem' }}>{(user?.name || 'U')[0].toUpperCase()}</span>}
                                    </div>
                                    <button className="btn btn-secondary btn-sm" onClick={() => avatarRef.current?.click()} type="button">Choose Image</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Display Name</label>
                                <input className="form-input" value={displayName} onChange={e => setDisplayName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input className="form-input" value={user?.email || ''} disabled style={{ opacity: 0.6 }} />
                            </div>
                            {user?.labName && (
                                <div className="form-group">
                                    <label>Lab</label>
                                    <input className="form-input" value={`${user.labName} (${user.labId})`} disabled style={{ opacity: 0.6 }} />
                                </div>
                            )}
                            {profileMsg && <div className="form-success" style={{ marginBottom: '0.8rem' }}>✓ {profileMsg}</div>}
                            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSaveName} disabled={saving}>
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
