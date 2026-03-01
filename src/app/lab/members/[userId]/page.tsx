'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function MemberProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const userId = params.userId as string;
    const labId = searchParams.get('labId') || (session?.user as any)?.labId;

    const [profile, setProfile] = useState<any>(null);
    const [icons, setIcons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const user = session?.user as any;

    useEffect(() => {
        if (status === 'loading') return;
        if (status === 'unauthenticated') { router.push('/auth/login'); return; }
        loadProfile();
    }, [status, userId]);

    async function loadProfile() {
        setLoading(true);
        try {
            // Fetch member details from lab API
            const labRes = await fetch(`/api/labs/${labId}`);
            if (labRes.ok) {
                const lab = await labRes.json();
                const member = lab.members?.find((m: any) => m.id === userId);
                if (member) setProfile(member);
            }
            // Fetch their uploaded icons
            const iconsRes = await fetch(`/api/icons?uploadedBy=${userId}`);
            if (iconsRes.ok) {
                const allIcons = await iconsRes.json();
                setIcons(Array.isArray(allIcons) ? allIcons : []);
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleDownload(icon: any) {
        const res = await fetch(`/api/icons/${icon.id}/download`);
        if (res.ok) {
            const { svgContent, filename } = await res.json();
            const blob = new Blob([svgContent], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = filename || `${icon.name}.svg`;
            a.click(); URL.revokeObjectURL(url);
        }
    }

    if (loading || status === 'loading') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '2rem', animation: 'float 1.5s ease-in-out infinite' }}>👤</div>
                <p style={{ color: 'var(--text-muted)' }}>Loading profile…</p>
            </div>
        );
    }

    const isOwnProfile = user?.id === userId;

    return (
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1.5rem' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Link href="/lab" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Lab Manager</Link>
                {' › '}
                <Link href={`/lab/members?labId=${labId}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>Members</Link>
                {' › '}<strong>{profile?.displayName || 'Profile'}</strong>
            </div>

            {profile ? (
                <>
                    {/* Profile card */}
                    <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-md)', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem', borderTop: '4px solid var(--primary)' }}>
                        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.8rem', flexShrink: 0 }}>
                            {profile.avatarUrl ? <img src={profile.avatarUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} alt="" /> : (profile.displayName || '?')[0].toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.25rem' }}>
                                {profile.displayName}
                                {isOwnProfile && <span style={{ marginLeft: '0.5rem', fontSize: '0.72rem', background: '#f0fdf4', color: '#15803d', padding: '0.1rem 0.5rem', borderRadius: 50, fontWeight: 700, verticalAlign: 'middle' }}>You</span>}
                            </h1>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{profile.email}</div>
                            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.78rem', background: '#e0f2fe', color: '#0369a1', padding: '0.15rem 0.6rem', borderRadius: 50, fontWeight: 600 }}>
                                    {icons.length} icon{icons.length !== 1 ? 's' : ''} uploaded
                                </span>
                                <span style={{ fontSize: '0.78rem', background: '#f0fdf4', color: '#059669', padding: '0.15rem 0.6rem', borderRadius: 50, fontWeight: 600 }}>
                                    Lab Member
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Icons by this member */}
                    <div style={{ marginBottom: '1rem', fontWeight: 700, fontSize: '1.05rem' }}>
                        🖼️ Icons by {isOwnProfile ? 'You' : profile.displayName} ({icons.length})
                    </div>
                    {icons.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🖼️</div>
                            <h3>No icons uploaded yet</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{isOwnProfile ? 'Upload your first icon!' : `${profile.displayName} hasn't uploaded any icons yet.`}</p>
                            {isOwnProfile && <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => router.push('/upload')}>Upload Icon</button>}
                        </div>
                    ) : (
                        <div className="icon-grid">
                            {icons.map((icon: any) => (
                                <div key={icon.id} className="icon-card">
                                    <div className="icon-preview">
                                        <div dangerouslySetInnerHTML={{ __html: icon.svgContent }} style={{ width: 90, height: 90 }} />
                                    </div>
                                    <div className="icon-info">
                                        <div className="icon-name">{icon.name}</div>
                                        <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{icon.category} · ⬇{icon.downloads}</div>
                                    </div>
                                    <button className="btn btn-sm btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                                        onClick={() => handleDownload(icon)}>SVG ⬇</button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="empty-state">
                    <div className="empty-state-icon">⚠️</div>
                    <h3>Member not found</h3>
                    <p style={{ color: 'var(--text-muted)' }}>This user is not in your lab or doesn't exist.</p>
                    <Link href="/lab/members" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>Back to Members</Link>
                </div>
            )}
        </div>
    );
}
