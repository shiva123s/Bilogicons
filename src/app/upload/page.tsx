'use client';
import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['Cell Biology', 'Microbiology', 'Lab Equipment', 'Arrows', 'Shapes', 'Neuroscience', 'Plant Biology', 'Biochemistry', 'Drosophila', 'Mosquito', 'Biologicals', 'Other'];

export default function UploadPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const fileRef = useRef<HTMLInputElement>(null);
    const [svgContent, setSvgContent] = useState('');
    const [form, setForm] = useState({ name: '', category: 'Cell Biology', tags: '', isLabPrivate: false });
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    if (!session) {
        return (
            <div className="empty-state" style={{ paddingTop: '6rem' }}>
                <div className="empty-state-icon">🔒</div>
                <h3>Login required to upload icons</h3>
                <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => router.push('/auth/login')}>Sign In</button>
            </div>
        );
    }

    const user = session.user as any;

    const readSvg = (file: File) => {
        if (!file.name.endsWith('.svg')) { setError('Only SVG files are supported'); return; }
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            setSvgContent(text);
            if (!form.name) setForm(f => ({ ...f, name: file.name.replace('.svg', '').replace(/_/g, ' ') }));
        };
        reader.readAsText(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) readSvg(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) readSvg(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!svgContent) { setError('Please upload an SVG file first'); return; }
        setLoading(true); setError(''); setSuccess('');
        const res = await fetch('/api/icons', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, svgContent }),
        });
        const data = await res.json();
        setLoading(false);
        if (!res.ok) { setError(data.error || 'Upload failed'); return; }
        setSuccess('Icon uploaded successfully! 🎉');
        setTimeout(() => router.push('/gallery'), 1500);
    };

    return (
        <div className="section" style={{ maxWidth: 680 }}>
            <h1 className="section-title">Upload Your Icon</h1>
            <p className="section-sub">Share your biological SVG icons with the community or your lab.</p>

            <div className="form-card" style={{ maxWidth: '100%' }}>
                {/* Drop Zone */}
                <div
                    className={`upload-zone ${dragging ? 'drag-over' : ''}`}
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileRef.current?.click()}
                    style={{ marginBottom: '1.5rem' }}
                >
                    <input ref={fileRef} type="file" accept=".svg" style={{ display: 'none' }} onChange={handleFileChange} />
                    {svgContent ? (
                        <div className="svg-preview-wrap" style={{ margin: 0, border: 'none', background: 'transparent' }}>
                            <div dangerouslySetInnerHTML={{ __html: svgContent }} style={{ width: 180, height: 180 }} />
                        </div>
                    ) : (
                        <>
                            <div className="upload-icon">📁</div>
                            <p className="upload-text"><span className="upload-link">Click to browse</span> or drag & drop your SVG file here</p>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '0.4rem' }}>Only .svg files are accepted</p>
                        </>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Icon Name *</label>
                        <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="e.g., Drosophila Pupal Stage" />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Category *</label>
                            <select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tags (comma-separated)</label>
                            <input className="form-input" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="fly, adult, male" />
                        </div>
                    </div>
                    {user?.labId && (
                        <div className="form-group">
                            <label className="toggle-wrap" style={{ cursor: 'pointer' }}>
                                <div className={`toggle ${form.isLabPrivate ? 'on' : ''}`} onClick={() => setForm(f => ({ ...f, isLabPrivate: !f.isLabPrivate }))} />
                                <span>Share privately with <strong>{user.labName}</strong> only</span>
                            </label>
                        </div>
                    )}
                    {error && <div className="form-error" style={{ marginBottom: '1rem' }}>⚠ {error}</div>}
                    {success && <div className="form-success" style={{ marginBottom: '1rem' }}>✓ {success}</div>}
                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', justifyContent: 'center' }}>
                        {loading ? 'Uploading...' : '📤 Upload Icon'}
                    </button>
                </form>
            </div>
        </div>
    );
}
