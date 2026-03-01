'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const CAT_COLORS: Record<string, string> = {
    'Cell Biology': '#f97316', 'Microbiology': '#10b981', 'Lab Equipment': '#6366f1',
    'Arrows': '#0ea5e9', 'Shapes': '#8b5cf6', 'Neuroscience': '#f59e0b',
    'Plant Biology': '#22c55e', 'Biochemistry': '#ec4899', 'Drosophila': '#a16207',
    'Mosquito': '#4d7c0f', 'Biologicals': '#d946ef', 'Other': '#64748b',
};

export default function LabIconsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const labId = searchParams.get('labId') || (session?.user as any)?.labId;

    const [icons, setIcons] = useState<any[]>([]);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [labName, setLabName] = useState('');
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'loading') return;
        if (status === 'unauthenticated') { router.push('/auth/login'); return; }
        if (!labId) { router.push('/lab'); return; }
        loadData();
    }, [status, labId]);

    async function loadData() {
        setLoading(true);
        try {
            // Get all icons (public + lab icons for this lab)
            const [iconsRes, labRes] = await Promise.all([
                fetch('/api/icons'),
                fetch(`/api/labs/${labId}`),
            ]);
            if (iconsRes.ok) {
                const all = await iconsRes.json();
                // Show: (1) icons uploaded by any lab member (2) OR public icons
                if (labRes.ok) {
                    const lab = await labRes.json();
                    setLabName(lab.name);
                    const memberIds: string[] = lab.memberIds || [];
                    // Lab icons = uploaded by a lab member OR marked as labId
                    const labIcons = all.filter((icon: any) =>
                        memberIds.includes(icon.uploadedBy) || icon.labId === labId
                    );
                    setIcons(labIcons);
                } else {
                    setIcons(Array.isArray(all) ? all : []);
                }
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleDownload(icon: any) {
        setDownloadingId(icon.id);
        try {
            const res = await fetch(`/api/icons/${icon.id}/download`);
            if (res.ok) {
                const { svgContent, filename } = await res.json();
                const blob = new Blob([svgContent], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a'); a.href = url; a.download = filename || `${icon.name}.svg`;
                a.click(); URL.revokeObjectURL(url);
            }
        } finally {
            setDownloadingId(null);
        }
    }

    const categories = ['All', ...Array.from(new Set(icons.map(i => i.category))).sort()];
    const filtered = icons.filter(i =>
        (filter === 'All' || i.category === filter) &&
        (search === '' || i.name.toLowerCase().includes(search.toLowerCase()))
    );

    if (loading || status === 'loading') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '2rem', animation: 'float 1.5s ease-in-out infinite' }}>🖼️</div>
                <p style={{ color: 'var(--text-muted)' }}>Loading lab icons…</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Link href="/lab" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Lab Manager</Link>
                {' › '}<strong>Icons</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>🖼️ {labName} — Icons</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.3rem 0 0' }}>{icons.length} icon{icons.length !== 1 ? 's' : ''} from lab members</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link href="/upload" className="btn btn-primary">⬆ Upload Icon</Link>
                    <Link href="/gallery" className="btn btn-secondary">🌐 Public Gallery</Link>
                </div>
            </div>

            {/* Search + filter bar */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <input
                    className="form-input"
                    placeholder="Search icons…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ flex: 1, minWidth: 200 }}
                />
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setFilter(cat)}
                            style={{ padding: '0.35rem 0.8rem', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, background: filter === cat ? 'var(--primary)' : 'var(--surface)', color: filter === cat ? 'white' : 'var(--text-muted)', boxShadow: 'var(--shadow-sm)', transition: 'all 0.15s' }}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Icon grid */}
            {filtered.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🖼️</div>
                    <h3>{search ? 'No icons match your search' : 'No lab icons yet'}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Lab members can upload icons to share them here.</p>
                    <Link href="/upload" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>Upload Icon</Link>
                </div>
            ) : (
                <div className="icon-grid">
                    {filtered.map((icon: any) => (
                        <div key={icon.id} className="icon-card" style={{ borderLeftColor: CAT_COLORS[icon.category] || '#0ea5e9' }}>
                            <div className="icon-preview">
                                <div dangerouslySetInnerHTML={{ __html: icon.svgContent }} style={{ width: 90, height: 90 }} />
                            </div>
                            <div className="icon-info">
                                <div className="icon-name">{icon.name}</div>
                                <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                                    {icon.category} · {icon.isLabPrivate ? '🔒 Lab' : '🌐 Public'} · ⬇{icon.downloads}
                                </div>
                                {icon.uploaderName && (
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginTop: '0.15rem' }}>by {icon.uploaderName}</div>
                                )}
                            </div>
                            <button
                                className="btn btn-sm btn-primary"
                                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                                disabled={downloadingId === icon.id}
                                onClick={() => handleDownload(icon)}>
                                {downloadingId === icon.id ? 'Downloading…' : 'Download SVG'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
