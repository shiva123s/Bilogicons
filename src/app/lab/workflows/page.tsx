'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Built-in workflow templates for the lab (same as the public /workflows page but lab-contextualised)
const BUILTIN_WORKFLOWS = [
    { id: 'rna-seq', name: 'RNA-seq Pipeline', category: 'Transcriptomics', description: 'Quality control → STAR alignment → DESeq2 differential expression', icon: '🧬', color: '#10b981', steps: ['FastQC / MultiQC', 'Trim Galore', 'STAR / HISAT2 alignment', 'featureCounts', 'DESeq2 / edgeR'] },
    { id: 'chip-seq', name: 'ChIP-seq Pipeline', category: 'Epigenomics', description: 'Peak calling with MACS2, annotation with ChIPseeker', icon: '🔬', color: '#6366f1', steps: ['FastQC', 'Bowtie2 alignment', 'SAMtools dedup', 'MACS2 peak calling', 'DeepTools visualisation'] },
    { id: 'scrnaseq', name: 'scRNA-seq Analysis', category: 'Single Cell', description: 'Seurat v5 workflow from raw counts to cell clusters', icon: '🔭', color: '#f59e0b', steps: ['Cell Ranger / STARsolo', 'Seurat QC + filtering', 'Normalisation + PCA', 'UMAP clustering', 'Marker identification'] },
    { id: 'variant', name: 'Variant Calling', category: 'Genomics', description: 'GATK4 best-practices germline variant discovery', icon: '🧪', color: '#ec4899', steps: ['BWA-MEM alignment', 'GATK MarkDuplicates', 'Base Quality Score Recal.', 'HaplotypeCaller', 'VQSR filtering'] },
    { id: 'proteomics', name: 'Proteomics (DIA)', category: 'Proteomics', description: 'Data-independent acquisition analysis with DIA-NN', icon: '⚗️', color: '#0ea5e9', steps: ['Spectral library generation', 'DIA-NN analysis', 'Perseus statistical analysis', 'Volcano plots', 'GO enrichment'] },
    { id: 'metagenomics', name: 'Metagenomics', category: 'Metagenomics', description: 'Shotgun metagenomics: classification + functional annotation', icon: '🌱', color: '#a16207', steps: ['KneadData host removal', 'Kraken2 + Bracken', 'HUMAnN3 functional', 'LEfSe differential', 'Visualisation'] },
];

export default function LabWorkflowsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const labId = searchParams.get('labId') || (session?.user as any)?.labId;

    const [labName, setLabName] = useState('');
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const user = session?.user as any;

    useEffect(() => {
        if (status === 'loading') return;
        if (status === 'unauthenticated') { router.push('/auth/login'); return; }
        if (!labId) { router.push('/lab'); return; }
        loadLab();
    }, [status, labId]);

    async function loadLab() {
        setLoading(true);
        try {
            const res = await fetch(`/api/labs/${labId}`);
            if (res.ok) { const lab = await res.json(); setLabName(lab.name); }
        } finally {
            setLoading(false);
        }
    }

    function handleDownloadMarkdown(wf: typeof BUILTIN_WORKFLOWS[0]) {
        const md = `# ${wf.name}\n\n**Category:** ${wf.category}\n\n**Description:** ${wf.description}\n\n## Steps\n\n${wf.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n`;
        const blob = new Blob([md], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `${wf.id}-workflow.md`;
        a.click(); URL.revokeObjectURL(url);
    }

    const filtered = BUILTIN_WORKFLOWS.filter(wf =>
        search === '' || wf.name.toLowerCase().includes(search.toLowerCase()) || wf.category.toLowerCase().includes(search.toLowerCase())
    );

    if (loading || status === 'loading') {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '2rem', animation: 'float 1.5s ease-in-out infinite' }}>📁</div>
                <p style={{ color: 'var(--text-muted)' }}>Loading workflows…</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Link href="/lab" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Lab Manager</Link>
                {' › '}<strong>Workflows</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>📁 {labName} — Workflows</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.3rem 0 0' }}>
                        Standard bioinformatics pipelines · Download as Markdown
                    </p>
                </div>
                <Link href="/workflows" className="btn btn-secondary">🌐 Public Templates</Link>
            </div>

            {/* Search */}
            <input
                className="form-input"
                placeholder="Search workflows…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginBottom: '1.5rem', maxWidth: 400, display: 'block' }}
            />

            {/* Workflow cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filtered.map(wf => (
                    <div key={wf.id} style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', overflow: 'hidden', borderLeft: `4px solid ${wf.color}` }}>
                        {/* Header row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.3rem', cursor: 'pointer', flexWrap: 'wrap' }}
                            onClick={() => setExpandedId(expandedId === wf.id ? null : wf.id)}>
                            <div style={{ fontSize: '1.8rem' }}>{wf.icon}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{wf.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{wf.category} · {wf.steps.length} steps</div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={e => { e.stopPropagation(); handleDownloadMarkdown(wf); }}>
                                    ⬇ Download
                                </button>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', userSelect: 'none' }}>
                                    {expandedId === wf.id ? '▲' : '▼'}
                                </span>
                            </div>
                        </div>

                        {/* Expanded steps */}
                        {expandedId === wf.id && (
                            <div style={{ padding: '0 1.3rem 1.2rem' }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>{wf.description}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    {wf.steps.map((step, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.45rem 0.75rem', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
                                            <span style={{ width: 22, height: 22, borderRadius: '50%', background: wf.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                                            <span style={{ fontSize: '0.85rem' }}>{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
