import Link from 'next/link';
import { getPublicIcons } from '@/lib/icons';

const CATEGORIES = [
  { id: 'Cell Biology', icon: '🔬', color: '#f97316' },
  { id: 'Microbiology', icon: '🦠', color: '#10b981' },
  { id: 'Lab Equipment', icon: '⚗️', color: '#6366f1' },
  { id: 'Arrows', icon: '➡️', color: '#0ea5e9' },
  { id: 'Shapes', icon: '⭕', color: '#8b5cf6' },
  { id: 'Neuroscience', icon: '🧠', color: '#f59e0b' },
  { id: 'Plant Biology', icon: '🌿', color: '#22c55e' },
  { id: 'Biochemistry', icon: '🧬', color: '#ec4899' },
  { id: 'Drosophila', icon: '🪰', color: '#a16207' },
  { id: 'Mosquito', icon: '🦟', color: '#4d7c0f' },
  { id: 'Biologicals', icon: '🔩', color: '#d946ef' },
  { id: 'Bioinfo', icon: '💻', color: '#0891b2' },
];

export default async function Home() {
  const allIcons = await getPublicIcons();
  const featured = allIcons.slice(0, 5);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">✨ Free for Researchers</div>
          <h1>The Biological <span>SVG Icon Library</span> for Scientists</h1>
          <p className="hero-sub">
            Download, share, and collaborate on scientific biological vector icons.
            Perfect for creating publication-ready figures, presentations, and diagrams.
          </p>
          <div className="hero-actions">
            <Link href="/gallery" className="btn btn-orange">Browse {allIcons.length}+ Icons</Link>
            <Link href="/auth/register" className="btn btn-secondary" style={{ padding: '0.7rem 1.8rem', fontSize: '1rem' }}>Join Free</Link>
          </div>
          {featured.length > 0 && (
            <div className="hero-floating-icons">
              {featured.map((icon) => (
                <div key={icon.id} className="hero-icon-card" title={icon.name}>
                  <div dangerouslySetInnerHTML={{ __html: icon.svgContent }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item"><div className="stat-num">{allIcons.length}+</div><div className="stat-label">SVG Icons</div></div>
          <div className="stat-item"><div className="stat-num">{CATEGORIES.length}</div><div className="stat-label">Categories</div></div>
          <div className="stat-item"><div className="stat-num">100%</div><div className="stat-label">Free</div></div>
          <div className="stat-item"><div className="stat-num">∞</div><div className="stat-label">Downloads</div></div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="section">
        <h2 className="section-title">Everything You Need for Scientific Figures</h2>
        <p className="section-sub">From organelles to organisms — all in clean, scalable SVG format.</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⬇️</div>
            <div className="feature-title">Free Downloads</div>
            <div className="feature-desc">Login once and download any icon as a clean SVG file. No watermarks, no limits.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📤</div>
            <div className="feature-title">Share Your Icons</div>
            <div className="feature-desc">Upload your own biological illustrations and share them with the community or your lab.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏫</div>
            <div className="feature-title">Lab Collaboration</div>
            <div className="feature-desc">Create a Lab ID, invite members, and share private icon libraries only visible to your team.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🪰</div>
            <div className="feature-title">Specialized Collections</div>
            <div className="feature-desc">Drosophila (all stages), Mosquito species, DNA/RNA structures, atoms, and much more.</div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section" style={{ paddingTop: 0 }}>
        <h2 className="section-title">Browse by Category</h2>
        <p className="section-sub">11 categories covering all your biological diagram needs.</p>
        <div className="category-grid">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} href={`/gallery?category=${encodeURIComponent(cat.id)}`} className="cat-card">
              <div className="cat-icon">{cat.icon}</div>
              <div className="cat-name">{cat.id}</div>
            </Link>
          ))}
          <Link href="/gallery?category=Bioinfo" className="cat-card">
            <div className="cat-icon">💻</div>
            <div className="cat-name">Bioinfo</div>
          </Link>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link href="/gallery" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>View All Icons →</Link>
        </div>
      </section>
    </>
  );
}
