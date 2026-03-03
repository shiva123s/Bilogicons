'use client';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const CATEGORIES = ['All', 'Cell Biology', 'Microbiology', 'Lab Equipment', 'Arrows', 'Shapes', 'Neuroscience', 'Plant Biology', 'Biochemistry', 'Drosophila', 'Mosquito', 'Biologicals', 'Bioinfo'];

const CAT_COLORS: Record<string, string> = {
    'Cell Biology': '#f97316', 'Microbiology': '#10b981', 'Lab Equipment': '#6366f1',
    'Arrows': '#0ea5e9', 'Shapes': '#8b5cf6', 'Neuroscience': '#f59e0b',
    'Plant Biology': '#22c55e', 'Biochemistry': '#ec4899', 'Drosophila': '#a16207',
    'Mosquito': '#4d7c0f', 'Biologicals': '#d946ef', 'Bioinfo': '#0891b2',
};

function catClass(cat: string) {
    return 'cat-' + cat.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function GalleryContent() {
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [icons, setIcons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
    const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

    const fetchIcons = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (category && category !== 'All') params.set('category', category);
        const res = await fetch(`/api/icons?${params.toString()}`);
        const data = await res.json();
        setIcons(data);
        setLoading(false);
    }, [query, category]);

    useEffect(() => { fetchIcons(); }, [fetchIcons]);

    const showToast = (msg: string, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleDownload = async (id: string, name: string) => {
        if (!session) { router.push('/auth/login'); return; }
        const res = await fetch(`/api/icons/${id}/download`);
        if (!res.ok) { showToast('Download failed', 'error'); return; }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `${name.replace(/\s+/g, '_')}.svg`; a.click();
        URL.revokeObjectURL(url);
        showToast(`Downloaded ${name}!`);
        fetchIcons();
    };

    const handleLike = async (id: string) => {
        if (!session) { router.push('/auth/login'); return; }
        const res = await fetch(`/api/icons/${id}/like`, { method: 'POST' });
        if (res.ok) {
            const data = await res.json();
            setLikedIds(prev => {
                const next = new Set(prev);
                data.liked ? next.add(id) : next.delete(id);
                return next;
            });
            fetchIcons();
        }
    };

    return (
        <div className="gallery-layout">
            <div className="gallery-header">
                <div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.25rem' }}>Browse Icons</h1>
                    <div className="gallery-results">{loading ? 'Loading...' : `${icons.length} icons found`}</div>
                </div>
                {session && <Link href="/upload" className="btn btn-primary">+ Upload Icon</Link>}
            </div>

            {/* Search */}
            <div className="search-wrap">
                <div className="search-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        className="search-input" placeholder="Search icons..."
                        value={query} onChange={e => setQuery(e.target.value)}
                    />
                </div>
                <select className="select-filter" value={category} onChange={e => setCategory(e.target.value)}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {/* Category Pills */}
            <div className="pills-row">
                {CATEGORIES.map(c => (
                    <button key={c} className={`pill ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
                ))}
            </div>

            {/* Grid */}
            {loading ? (
                <div className="empty-state"><div className="empty-state-icon">⏳</div><h3>Loading icons...</h3></div>
            ) : icons.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h3>No icons found</h3>
                    <p>Try a different search or category</p>
                </div>
            ) : (
                <div className="icon-grid">
                    {icons.map(icon => (
                        <div key={icon.id} className={`icon-card ${catClass(icon.category)}`} style={{ borderLeftColor: CAT_COLORS[icon.category] || '#0ea5e9' }}>
                            <div className="icon-preview">
                                {icon.svgContent ? (
                                    <div dangerouslySetInnerHTML={{ __html: icon.svgContent }} style={{ width: 110, height: 110 }} />
                                ) : icon.fileUrl ? (
                                    <img src={icon.fileUrl} alt={icon.name} style={{ width: 110, height: 110, objectFit: 'contain' }} />
                                ) : (
                                    <div style={{ width: 110, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No preview</div>
                                )}
                            </div>
                            <div className="icon-info">
                                <div className="icon-name">{icon.name}</div>
                                <div className="icon-meta">
                                    <span className="icon-cat-badge" style={{ background: (CAT_COLORS[icon.category] || '#0ea5e9') + '18', color: CAT_COLORS[icon.category] || '#0ea5e9' }}>
                                        {icon.category}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>⬇{icon.downloads}</span>
                                </div>
                                <div className="icon-actions">
                                    <button className="icon-btn icon-btn-download" onClick={() => handleDownload(icon.id, icon.name)} title={session ? 'Download SVG' : 'Login to download'}>
                                        {session ? '⬇ Download' : '🔒 Login'}
                                    </button>
                                    <button className={`icon-btn icon-btn-like ${likedIds.has(icon.id) ? 'liked' : ''}`} onClick={() => handleLike(icon.id)}>
                                        ♥ {icon.likes}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
        </div>
    );
}

export default function GalleryPage() {
    return <Suspense fallback={<div className="empty-state"><div className="empty-state-icon">⏳</div><h3>Loading...</h3></div>}><GalleryContent /></Suspense>;
}
