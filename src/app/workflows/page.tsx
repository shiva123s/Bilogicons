'use client';
import Link from 'next/link';

const WORKFLOWS = [
    {
        id: 'rna-seq',
        title: 'RNA-seq Analysis',
        subtitle: 'Differential gene expression workflow',
        color: '#0ea5e9',
        tags: ['NGS', 'expression', 'DEG', 'R'],
        steps: [
            { label: 'Raw Reads (.fastq)', color: '#e0f2ff', border: '#0ea5e9' },
            { label: 'Quality Control (FastQC / Trimmomatic)', color: '#f0fdf4', border: '#22c55e' },
            { label: 'Alignment (STAR / HISAT2)', color: '#fffbeb', border: '#f59e0b' },
            { label: 'Count Matrix (featureCounts)', color: '#fdf4ff', border: '#d946ef' },
            { label: 'DEG Analysis (DESeq2 / edgeR)', color: '#fff1f2', border: '#ef4444' },
            { label: 'Visualization (heatmap / volcano)', color: '#f0f9ff', border: '#0891b2' },
        ],
        tools: ['FastQC', 'Trimmomatic', 'STAR', 'featureCounts', 'DESeq2', 'ggplot2'],
        description: 'Standard bulk RNA-seq pipeline for identifying differentially expressed genes between conditions.',
    },
    {
        id: 'chip-seq',
        title: 'ChIP-seq Analysis',
        subtitle: 'Chromatin immunoprecipitation sequencing',
        color: '#8b5cf6',
        tags: ['ChIP-seq', 'peaks', 'TF binding', 'histone'],
        steps: [
            { label: 'Raw Reads (.fastq)', color: '#e0f2ff', border: '#0ea5e9' },
            { label: 'Trim Adapters (Trimmomatic)', color: '#f0fdf4', border: '#22c55e' },
            { label: 'Alignment (Bowtie2 / BWA)', color: '#fffbeb', border: '#f59e0b' },
            { label: 'Filter & Remove Duplicates (samtools, Picard)', color: '#fdf4ff', border: '#d946ef' },
            { label: 'Peak Calling (MACS3)', color: '#fff1f2', border: '#ef4444' },
            { label: 'Motif Enrichment (HOMER / MEME)', color: '#f5f3ff', border: '#8b5cf6' },
        ],
        tools: ['Bowtie2', 'SAMtools', 'Picard', 'MACS3', 'deepTools', 'HOMER'],
        description: 'Identify protein–DNA interaction sites and histone modification regions across the genome.',
    },
    {
        id: 'scrnaseq',
        title: 'Single-Cell RNA-seq (scRNA-seq)',
        subtitle: 'Cell-type discovery & trajectory analysis',
        color: '#f97316',
        tags: ['scRNA-seq', 'Seurat', 'clusters', 'single cell'],
        steps: [
            { label: 'Raw Libraries (10x Chromium)', color: '#e0f2ff', border: '#0ea5e9' },
            { label: 'Alignment (Cell Ranger / STARsolo)', color: '#f0fdf4', border: '#22c55e' },
            { label: 'QC & Filtering (Seurat / Scanpy)', color: '#fffbeb', border: '#f59e0b' },
            { label: 'Normalization & Dimensionality Reduction (PCA)', color: '#fdf4ff', border: '#d946ef' },
            { label: 'Clustering (Louvain / Leiden)', color: '#fff1f2', border: '#ef4444' },
            { label: 'Annotation & Trajectory (Monocle3)', color: '#fff7ed', border: '#f97316' },
        ],
        tools: ['Cell Ranger', 'Seurat', 'Scanpy', 'UMAP', 'Monocle3', 'CellChat'],
        description: 'End-to-end single-cell RNA-seq workflow from raw reads to cell type annotation and pseudotime.',
    },
    {
        id: 'wgs-variant',
        title: 'WGS Variant Calling',
        subtitle: 'Germline & somatic mutation detection',
        color: '#10b981',
        tags: ['WGS', 'SNP', 'INDEL', 'GATK', 'variant'],
        steps: [
            { label: 'Raw Reads (WGS / WES)', color: '#e0f2ff', border: '#0ea5e9' },
            { label: 'Alignment (BWA-MEM2)', color: '#f0fdf4', border: '#22c55e' },
            { label: 'Mark Duplicates (Picard / GATK)', color: '#fffbeb', border: '#f59e0b' },
            { label: 'Base Quality Recalibration (BQSR)', color: '#fdf4ff', border: '#d946ef' },
            { label: 'Variant Calling (HaplotypeCaller / Mutect2)', color: '#fff1f2', border: '#ef4444' },
            { label: 'Annotation (ANNOVAR / VEP)', color: '#f0fdf4', border: '#10b981' },
        ],
        tools: ['BWA-MEM2', 'GATK4', 'Picard', 'VEP', 'ANNOVAR', 'bcftools'],
        description: 'GATK Best Practices pipeline for detecting germline SNPs, INDELs, and copy number variants.',
    },
    {
        id: 'metagenomics',
        title: 'Shotgun Metagenomics',
        subtitle: 'Taxonomic & functional profiling of microbiomes',
        color: '#ec4899',
        tags: ['metagenomics', 'microbiome', 'taxonomy', 'abundance'],
        steps: [
            { label: 'Raw Shotgun Reads', color: '#e0f2ff', border: '#0ea5e9' },
            { label: 'Host Removal (Bowtie2)', color: '#f0fdf4', border: '#22c55e' },
            { label: 'Taxonomic Profiling (Kraken2 / MetaPhlAn)', color: '#fffbeb', border: '#f59e0b' },
            { label: 'Assembly (MEGAHIT / metaSPAdes)', color: '#fdf4ff', border: '#d946ef' },
            { label: 'Gene Prediction (Prodigal)', color: '#fff1f2', border: '#ef4444' },
            { label: 'Functional Annotation (HUMAnN / COG)', color: '#fdf2f8', border: '#ec4899' },
        ],
        tools: ['Kraken2', 'MetaPhlAn4', 'MEGAHIT', 'Prodigal', 'HUMAnN3', 'Bracken'],
        description: 'Whole-community metagenomics workflow from raw reads to species-level taxonomy and pathway abundance.',
    },
    {
        id: 'atac-seq',
        title: 'ATAC-seq Analysis',
        subtitle: 'Open chromatin & accessibility mapping',
        color: '#f59e0b',
        tags: ['ATAC-seq', 'chromatin', 'accessibility', 'peaks'],
        steps: [
            { label: 'Raw Reads (paired-end)', color: '#e0f2ff', border: '#0ea5e9' },
            { label: 'Trim Adapters (Trim Galore)', color: '#f0fdf4', border: '#22c55e' },
            { label: 'Alignment (Bowtie2)', color: '#fffbeb', border: '#f59e0b' },
            { label: 'Filter Duplicates + Mitochondrial Reads', color: '#fdf4ff', border: '#d946ef' },
            { label: 'Peak Calling (MACS2 / Genrich)', color: '#fff1f2', border: '#ef4444' },
            { label: 'Differential Accessibility (DiffBind)', color: '#fffbeb', border: '#f59e0b' },
        ],
        tools: ['Trim Galore', 'Bowtie2', 'SAMtools', 'MACS2', 'Genrich', 'DiffBind'],
        description: 'Map genome-wide open chromatin regions and identify differential accessibility between conditions.',
    },
];

export default function WorkflowsPage() {
    return (
        <div className="section" style={{ paddingTop: '2.5rem' }}>
            {/* Header */}
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <h1 className="section-title" style={{ margin: 0 }}>Workflow Templates</h1>
                    <span style={{ background: '#e0f2fe', color: '#0369a1', borderRadius: 50, padding: '0.2rem 0.75rem', fontSize: '0.78rem', fontWeight: 700 }}>{WORKFLOWS.length} workflows</span>
                </div>
                <p className="section-sub">
                    Copy-paste ready bioinformatics pipelines — from raw reads to publication figures.
                    Each template includes step-by-step stages, recommended tools, and usage tips.
                </p>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                {WORKFLOWS.map(wf => (
                    <div key={wf.id} className="feature-card" style={{ borderTop: `4px solid ${wf.color}`, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Title */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                <span style={{ fontSize: '1.4rem' }}>🗂️</span>
                                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>{wf.title}</h2>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{wf.subtitle}</p>
                        </div>

                        {/* Tags */}
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {wf.tags.map(t => (
                                <span key={t} style={{ background: wf.color + '18', color: wf.color, borderRadius: 50, padding: '0.15rem 0.6rem', fontSize: '0.72rem', fontWeight: 600 }}>{t}</span>
                            ))}
                        </div>

                        {/* Steps */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {wf.steps.map((step, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: wf.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                                    <div style={{ flex: 1, background: step.color, border: `1.5px solid ${step.border}`, borderRadius: 6, padding: '0.3rem 0.7rem', fontSize: '0.78rem', fontWeight: 500, color: 'var(--text)' }}>
                                        {step.label}
                                    </div>
                                    {i < wf.steps.length - 1 && (
                                        <div style={{ position: 'absolute', left: '1.5rem', display: 'none' }} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{wf.description}</p>

                        {/* Tools */}
                        <div>
                            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Key Tools</div>
                            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                                {wf.tools.map(t => (
                                    <span key={t} style={{ background: 'var(--surface-alt)', border: '1px solid var(--border)', borderRadius: 6, padding: '0.2rem 0.55rem', fontSize: '0.74rem', fontWeight: 600, fontFamily: 'monospace', color: 'var(--text)' }}>{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Browse Icons button */}
                        <Link
                            href={`/gallery?q=${encodeURIComponent(wf.tags[0])}`}
                            className="btn btn-secondary btn-sm"
                            style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
                        >
                            🔍 Browse Related Icons
                        </Link>
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: 'var(--surface)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💡</div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>Need a custom workflow?</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>Upload your own pipeline diagram as an SVG and share it with the community.</p>
                <Link href="/upload" className="btn btn-primary" style={{ padding: '0.7rem 1.8rem', fontSize: '0.95rem' }}>Upload Workflow Diagram</Link>
            </div>
        </div>
    );
}
