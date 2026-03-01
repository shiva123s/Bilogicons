import { Icon } from './icons';

function makeIcon(
    id: string, name: string, category: string, tags: string[], svgContent: string
): Icon {
    return {
        id, name, category, tags, svgContent,
        uploadedBy: 'system', uploaderName: 'BioLogIcons Library',
        isLabPrivate: false, downloads: 0, likes: 0, likedBy: [],
        createdAt: '2024-01-01T00:00:00Z',
    };
}

// ── Cell Biology ──────────────────────────────────────────────────────────────
const cellBiology: Icon[] = [
    makeIcon('cb-001', 'Animal Cell', 'Cell Biology', ['cell', 'animal', 'eukaryote'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="105" rx="85" ry="75" fill="#fde8d8" stroke="#e8834a" stroke-width="3"/>
      <ellipse cx="100" cy="105" rx="75" ry="65" fill="none" stroke="#e8834a" stroke-width="1.5" stroke-dasharray="6,3" opacity="0.5"/>
      <ellipse cx="100" cy="100" rx="28" ry="24" fill="#c5d5f5" stroke="#4a6fc5" stroke-width="2.5"/>
      <ellipse cx="100" cy="100" rx="14" ry="11" fill="#8faae8" stroke="#4a6fc5" stroke-width="1.5"/>
      <ellipse cx="148" cy="90" rx="18" ry="10" fill="#b8e8b8" stroke="#3a9a3a" stroke-width="2"/>
      <path d="M143 84 Q148 80 153 84 Q158 90 153 96 Q148 100 143 96 Q138 90 143 84" fill="#7acc7a" stroke="#3a9a3a" stroke-width="1"/>
      <rect x="60" y="130" width="30" height="14" rx="7" fill="#f5c5e8" stroke="#c54a9a" stroke-width="1.5"/>
      <rect x="68" y="133" width="14" height="8" rx="3" fill="#e880cc"/>
      <circle cx="70" cy="75" r="8" fill="#ffe0a0" stroke="#c8903a" stroke-width="1.5"/>
      <circle cx="130" cy="130" r="6" fill="#ffd0d0" stroke="#c83a3a" stroke-width="1.5"/>
      <circle cx="62" cy="110" r="5" fill="#ffd0d0" stroke="#c83a3a" stroke-width="1.2"/>
    </svg>`),

    makeIcon('cb-002', 'Plant Cell', 'Cell Biology', ['cell', 'plant', 'chloroplast', 'vacuole'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="160" height="160" rx="8" fill="#e8f5e8" stroke="#2d7a2d" stroke-width="4"/>
      <rect x="28" y="28" width="144" height="144" rx="5" fill="#f0faf0" stroke="#2d7a2d" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.6"/>
      <rect x="40" y="40" width="120" height="120" rx="10" fill="#d0efd0" stroke="#3a9a3a" stroke-width="1.5" opacity="0.4"/>
      <ellipse cx="100" cy="95" rx="25" ry="22" fill="#b8d5f5" stroke="#3a6ac5" stroke-width="2.5"/>
      <ellipse cx="100" cy="95" rx="12" ry="10" fill="#80a8e8" stroke="#3a6ac5" stroke-width="1.5"/>
      <ellipse cx="58" cy="75" rx="22" ry="12" fill="#7acc7a" stroke="#2a7a2a" stroke-width="2"/>
      <ellipse cx="148" cy="130" rx="22" ry="12" fill="#5ab85a" stroke="#2a7a2a" stroke-width="2"/>
      <line x1="36" y1="75" x2="80" y2="75" stroke="#4a9a4a" stroke-width="1.5"/>
      <line x1="126" y1="130" x2="170" y2="130" stroke="#4a9a4a" stroke-width="1.5"/>
    </svg>`),

    makeIcon('cb-003', 'Mitochondria', 'Cell Biology', ['mitochondria', 'energy', 'ATP', 'organelle'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="100" rx="82" ry="55" fill="#ffe4b4" stroke="#d4820a" stroke-width="3"/>
      <ellipse cx="100" cy="100" rx="74" ry="47" fill="#fff0cc" stroke="#d4820a" stroke-width="1.5" stroke-dasharray="5,3"/>
      <path d="M30 100 Q50 70 70 100 Q90 130 110 100 Q130 70 150 100 Q170 130 170 100" fill="none" stroke="#d4820a" stroke-width="2.5"/>
      <path d="M30 100 Q50 120 70 100 Q90 80 110 100 Q130 120 150 100" fill="none" stroke="#f0a030" stroke-width="1.5" opacity="0.6"/>
      <text x="100" y="170" text-anchor="middle" font-size="12" fill="#8a5500" font-family="Arial">Mitochondria</text>
    </svg>`),

    makeIcon('cb-004', 'Cell Nucleus', 'Cell Biology', ['nucleus', 'DNA', 'nuclear envelope'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="100" rx="80" ry="75" fill="#d8e8ff" stroke="#4060c0" stroke-width="3.5"/>
      <ellipse cx="100" cy="100" rx="72" ry="67" fill="#e8f0ff" stroke="#4060c0" stroke-width="1.5" stroke-dasharray="8,4"/>
      <ellipse cx="78" cy="88" rx="8" ry="6" fill="#4060c0" opacity="0.5"/>
      <ellipse cx="122" cy="88" rx="8" ry="6" fill="#4060c0" opacity="0.5"/>
      <ellipse cx="100" cy="112" rx="8" ry="6" fill="#4060c0" opacity="0.5"/>
      <ellipse cx="100" cy="95" rx="30" ry="22" fill="#80a0e8" stroke="#2040a0" stroke-width="2" opacity="0.8"/>
    </svg>`),

    makeIcon('cb-005', 'Chloroplast', 'Cell Biology', ['chloroplast', 'photosynthesis', 'thylakoid', 'plant'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="100" rx="82" ry="55" fill="#b8f0b8" stroke="#2a8a2a" stroke-width="3"/>
      <ellipse cx="100" cy="100" rx="74" ry="47" fill="#d0f8d0" stroke="#2a8a2a" stroke-width="1.5" stroke-dasharray="5,3"/>
      <rect x="50" y="85" width="100" height="12" rx="6" fill="#4ab84a" stroke="#1a6a1a" stroke-width="1.5"/>
      <rect x="50" y="103" width="100" height="12" rx="6" fill="#4ab84a" stroke="#1a6a1a" stroke-width="1.5"/>
      <rect x="55" y="94" width="8" height="12" rx="2" fill="#2a8a2a"/>
      <rect x="70" y="94" width="8" height="12" rx="2" fill="#2a8a2a"/>
      <rect x="85" y="94" width="8" height="12" rx="2" fill="#2a8a2a"/>
      <rect x="100" y="94" width="8" height="12" rx="2" fill="#2a8a2a"/>
      <rect x="115" y="94" width="8" height="12" rx="2" fill="#2a8a2a"/>
      <rect x="130" y="94" width="8" height="12" rx="2" fill="#2a8a2a"/>
    </svg>`),

    makeIcon('cb-006', 'Golgi Apparatus', 'Cell Biology', ['golgi', 'vesicle', 'secretion'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 90 Q100 70 160 90" fill="none" stroke="#c060c0" stroke-width="12" stroke-linecap="round"/>
      <path d="M45 105 Q100 85 155 105" fill="none" stroke="#d070d0" stroke-width="10" stroke-linecap="round"/>
      <path d="M50 118 Q100 100 150 118" fill="none" stroke="#e080e0" stroke-width="8" stroke-linecap="round"/>
      <path d="M55 128 Q100 112 145 128" fill="none" stroke="#e898e8" stroke-width="6" stroke-linecap="round"/>
      <circle cx="168" cy="90" r="10" fill="#c060c0" opacity="0.7"/>
      <circle cx="175" cy="77" r="7" fill="#c060c0" opacity="0.5"/>
      <circle cx="162" cy="105" r="8" fill="#d070d0" opacity="0.6"/>
    </svg>`),

    makeIcon('cb-007', 'Endoplasmic Reticulum', 'Cell Biology', ['ER', 'rough ER', 'smooth ER', 'ribosome'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 60 Q60 40 100 60 Q140 80 180 60" fill="none" stroke="#a06030" stroke-width="8" stroke-linecap="round"/>
      <path d="M20 80 Q60 60 100 80 Q140 100 180 80" fill="none" stroke="#a06030" stroke-width="8" stroke-linecap="round"/>
      <path d="M20 100 Q60 80 100 100 Q140 120 180 100" fill="none" stroke="#b07040" stroke-width="8" stroke-linecap="round"/>
      <path d="M20 120 Q60 100 100 120 Q140 140 180 120" fill="none" stroke="#b07040" stroke-width="8" stroke-linecap="round"/>
      <circle cx="30" cy="60" r="5" fill="#604020"/>
      <circle cx="55" cy="48" r="5" fill="#604020"/>
      <circle cx="80" cy="56" r="5" fill="#604020"/>
      <circle cx="105" cy="65" r="5" fill="#604020"/>
      <circle cx="130" cy="73" r="5" fill="#604020"/>
      <circle cx="155" cy="65" r="5" fill="#604020"/>
      <circle cx="175" cy="58" r="5" fill="#604020"/>
    </svg>`),

    makeIcon('cb-008', 'Lysosome', 'Cell Biology', ['lysosome', 'digestion', 'enzyme'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="70" fill="#ffe0e0" stroke="#c83030" stroke-width="3"/>
      <circle cx="100" cy="100" r="60" fill="#ffd0d0" stroke="#c83030" stroke-width="1" stroke-dasharray="5,3" opacity="0.5"/>
      <text x="100" y="90" text-anchor="middle" font-size="28" fill="#c83030">H⁺</text>
      <text x="100" y="118" text-anchor="middle" font-size="11" fill="#802020">Acid Hydrolases</text>
      <circle cx="55" cy="65" r="5" fill="#c83030" opacity="0.5"/>
      <circle cx="145" cy="65" r="5" fill="#c83030" opacity="0.5"/>
      <circle cx="55" cy="135" r="5" fill="#c83030" opacity="0.5"/>
      <circle cx="145" cy="135" r="5" fill="#c83030" opacity="0.5"/>
    </svg>`),
];

// ── Microbiology ──────────────────────────────────────────────────────────────
const microbiology: Icon[] = [
    makeIcon('mb-001', 'Rod Bacteria', 'Microbiology', ['bacteria', 'rod', 'bacillus', 'prokaryote'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="70" width="120" height="60" rx="30" fill="#c8f0c8" stroke="#2a8a2a" stroke-width="3"/>
      <ellipse cx="100" cy="100" rx="35" ry="20" fill="#90d890" opacity="0.5"/>
      <line x1="100" y1="70" x2="100" y2="30" stroke="#2a8a2a" stroke-width="1.5"/>
      <line x1="130" y1="73" x2="145" y2="35" stroke="#2a8a2a" stroke-width="1.5"/>
      <line x1="70" y1="73" x2="55" y2="35" stroke="#2a8a2a" stroke-width="1.5"/>
      <line x1="100" y1="130" x2="100" y2="170" stroke="#2a8a2a" stroke-width="1.5"/>
      <line x1="130" y1="127" x2="145" y2="165" stroke="#2a8a2a" stroke-width="1.5"/>
      <line x1="70" y1="127" x2="55" y2="165" stroke="#2a8a2a" stroke-width="1.5"/>
    </svg>`),

    makeIcon('mb-002', 'Cocci Bacteria', 'Microbiology', ['bacteria', 'cocci', 'sphere', 'streptococcus'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="80" r="35" fill="#d0e8ff" stroke="#2050c0" stroke-width="2.5"/>
      <circle cx="130" cy="80" r="35" fill="#d0e8ff" stroke="#2050c0" stroke-width="2.5"/>
      <circle cx="70" cy="140" r="35" fill="#d0e8ff" stroke="#2050c0" stroke-width="2.5"/>
      <circle cx="130" cy="140" r="35" fill="#d0e8ff" stroke="#2050c0" stroke-width="2.5"/>
      <ellipse cx="70" cy="80" rx="15" ry="12" fill="#a0c4f0" opacity="0.5"/>
      <ellipse cx="130" cy="80" rx="15" ry="12" fill="#a0c4f0" opacity="0.5"/>
      <ellipse cx="70" cy="140" rx="15" ry="12" fill="#a0c4f0" opacity="0.5"/>
      <ellipse cx="130" cy="140" rx="15" ry="12" fill="#a0c4f0" opacity="0.5"/>
    </svg>`),

    makeIcon('mb-003', 'Bacteriophage', 'Microbiology', ['phage', 'virus', 'bacteria', 'DNA'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,20 130,50 130,90 100,105 70,90 70,50" fill="#d0d0ff" stroke="#4040c0" stroke-width="2.5"/>
      <rect x="92" y="100" width="16" height="55" fill="#8080d0" stroke="#4040c0" stroke-width="2"/>
      <line x1="100" y1="155" x2="75" y2="175" stroke="#4040c0" stroke-width="2"/>
      <line x1="100" y1="155" x2="90" y2="178" stroke="#4040c0" stroke-width="2"/>
      <line x1="100" y1="155" x2="100" y2="180" stroke="#4040c0" stroke-width="2"/>
      <line x1="100" y1="155" x2="110" y2="178" stroke="#4040c0" stroke-width="2"/>
      <line x1="100" y1="155" x2="125" y2="175" stroke="#4040c0" stroke-width="2"/>
      <circle cx="75" cy="177" r="4" fill="#4040c0"/>
      <circle cx="90" cy="180" r="4" fill="#4040c0"/>
      <circle cx="100" cy="182" r="4" fill="#4040c0"/>
      <circle cx="110" cy="180" r="4" fill="#4040c0"/>
      <circle cx="125" cy="177" r="4" fill="#4040c0"/>
    </svg>`),

    makeIcon('mb-004', 'Virus Particle', 'Microbiology', ['virus', 'icosahedron', 'capsid', 'pathogen'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="65" fill="#ffe0d0" stroke="#c04020" stroke-width="3"/>
      <circle cx="100" cy="100" r="55" fill="#ffd0c0" stroke="#c04020" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>
      <line x1="100" y1="35" x2="145" y2="60" stroke="#c04020" stroke-width="1.5"/>
      <line x1="145" y1="60" x2="165" y2="100" stroke="#c04020" stroke-width="1.5"/>
      <line x1="165" y1="100" x2="145" y2="140" stroke="#c04020" stroke-width="1.5"/>
      <line x1="145" y1="140" x2="100" y2="165" stroke="#c04020" stroke-width="1.5"/>
      <line x1="100" y1="165" x2="55" y2="140" stroke="#c04020" stroke-width="1.5"/>
      <line x1="55" y1="140" x2="35" y2="100" stroke="#c04020" stroke-width="1.5"/>
      <line x1="35" y1="100" x2="55" y2="60" stroke="#c04020" stroke-width="1.5"/>
      <line x1="55" y1="60" x2="100" y2="35" stroke="#c04020" stroke-width="1.5"/>
      <circle cx="100" cy="35" r="5" fill="#c04020"/>
      <circle cx="145" cy="60" r="5" fill="#c04020"/>
      <circle cx="165" cy="100" r="5" fill="#c04020"/>
      <circle cx="145" cy="140" r="5" fill="#c04020"/>
      <circle cx="100" cy="165" r="5" fill="#c04020"/>
      <circle cx="55" cy="140" r="5" fill="#c04020"/>
      <circle cx="35" cy="100" r="5" fill="#c04020"/>
      <circle cx="55" cy="60" r="5" fill="#c04020"/>
    </svg>`),
];

// ── Lab Equipment ─────────────────────────────────────────────────────────────
const labEquipment: Icon[] = [
    makeIcon('le-001', 'Microscope', 'Lab Equipment', ['microscope', 'lab', 'optics', 'magnification'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="72" y="155" width="56" height="15" rx="4" fill="#607080" stroke="#304050" stroke-width="2"/>
      <rect x="85" y="125" width="8" height="35" fill="#708090" stroke="#304050" stroke-width="1.5"/>
      <rect x="107" y="125" width="8" height="35" fill="#708090" stroke="#304050" stroke-width="1.5"/>
      <rect x="83" y="120" width="34" height="10" rx="3" fill="#8090a0" stroke="#304050" stroke-width="1.5"/>
      <rect x="90" y="90" width="20" height="35" rx="3" fill="#9090b0" stroke="#304050" stroke-width="2"/>
      <rect x="93" y="65" width="14" height="30" rx="2" fill="#a0a0c0" stroke="#304050" stroke-width="1.5"/>
      <circle cx="100" cy="58" r="12" fill="#c0d0e0" stroke="#304050" stroke-width="2"/>
      <circle cx="100" cy="58" r="6" fill="#80a0c0"/>
      <line x1="100" y1="120" x2="155" y2="85" stroke="#304050" stroke-width="2"/>
      <circle cx="160" cy="82" r="8" fill="#c0c0d0" stroke="#304050" stroke-width="1.5"/>
      <ellipse cx="100" cy="155" rx="40" ry="6" fill="#d0d0d0" stroke="#304050" stroke-width="1.5"/>
    </svg>`),

    makeIcon('le-002', 'Erlenmeyer Flask', 'Lab Equipment', ['flask', 'erlenmeyer', 'conical', 'lab'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M78 30 L78 95 L30 165 Q28 175 38 178 L162 178 Q172 175 170 165 L122 95 L122 30 Z" fill="#d0f0ff" stroke="#3070a0" stroke-width="2.5"/>
      <path d="M78 30 L78 95 L30 165" fill="none" stroke="#3070a0" stroke-width="2.5"/>
      <rect x="73" y="22" width="54" height="14" rx="5" fill="#b0d0e8" stroke="#3070a0" stroke-width="2"/>
      <path d="M60 140 Q100 155 140 140" fill="#a0d8f0" opacity="0.5"/>
      <ellipse cx="100" cy="155" rx="42" ry="12" fill="#70c0e8" opacity="0.4"/>
    </svg>`),

    makeIcon('le-003', 'Test Tube', 'Lab Equipment', ['test tube', 'lab', 'sample'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="78" y="25" width="44" height="130" rx="4" fill="#e8f8f0" stroke="#2a8a5a" stroke-width="2.5"/>
      <ellipse cx="100" cy="160" rx="22" ry="10" fill="#e8f8f0" stroke="#2a8a5a" stroke-width="2.5"/>
      <rect x="78" y="18" width="44" height="16" rx="4" fill="#b0d8c8" stroke="#2a8a5a" stroke-width="2"/>
      <rect x="78" y="120" width="44" height="40" rx="2" fill="#a0e0c0" opacity="0.6"/>
      <ellipse cx="100" cy="120" rx="22" ry="5" fill="#80d0a8" opacity="0.5"/>
    </svg>`),

    makeIcon('le-004', 'Petri Dish', 'Lab Equipment', ['petri dish', 'culture', 'agar', 'bacteria'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="110" rx="80" ry="55" fill="#f0ffe0" stroke="#60a020" stroke-width="2.5"/>
      <ellipse cx="100" cy="100" rx="78" ry="52" fill="#e8ffd8" stroke="#60a020" stroke-width="2"/>
      <ellipse cx="100" cy="100" rx="65" ry="42" fill="#d8f8c8" stroke="#60a020" stroke-width="1.5" opacity="0.7"/>
      <circle cx="80" cy="95" r="8" fill="#90c840" opacity="0.6"/>
      <circle cx="110" cy="105" r="6" fill="#70a830" opacity="0.6"/>
      <circle cx="95" cy="115" r="5" fill="#a0d850" opacity="0.6"/>
      <circle cx="120" cy="88" r="7" fill="#80b838" opacity="0.6"/>
    </svg>`),

    makeIcon('le-005', 'Pipette', 'Lab Equipment', ['pipette', 'micropipette', 'lab', 'liquid'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="88" y="20" width="24" height="100" rx="8" fill="#d0e8ff" stroke="#3060a0" stroke-width="2"/>
      <polygon points="88,120 112,120 106,175 94,175" fill="#b0d0f0" stroke="#3060a0" stroke-width="2"/>
      <line x1="100" y1="175" x2="100" y2="190" stroke="#3060a0" stroke-width="2"/>
      <rect x="84" y="28" width="32" height="20" rx="4" fill="#a0c8e8" stroke="#3060a0" stroke-width="1.5"/>
      <ellipse cx="100" cy="165" rx="5" ry="8" fill="#60a8e0" opacity="0.5"/>
    </svg>`),

    makeIcon('le-006', 'Beaker', 'Lab Equipment', ['beaker', 'lab', 'glass', 'liquid'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M55 40 L55 145 Q55 175 100 175 Q145 175 145 145 L145 40 Z" fill="#e0f4ff" stroke="#3070b0" stroke-width="2.5"/>
      <path d="M55 40 L145 40" fill="none" stroke="#3070b0" stroke-width="2.5"/>
      <path d="M145 40 L155 35" fill="none" stroke="#3070b0" stroke-width="2"/>
      <path d="M55 115 Q100 125 145 115" fill="#90c8f0" opacity="0.5"/>
      <ellipse cx="100" cy="140" rx="42" ry="12" fill="#60b0e8" opacity="0.4"/>
      <line x1="68" y1="80" x2="80" y2="80" stroke="#3070b0" stroke-width="1" opacity="0.6"/>
      <line x1="68" y1="95" x2="80" y2="95" stroke="#3070b0" stroke-width="1" opacity="0.6"/>
      <line x1="68" y1="110" x2="80" y2="110" stroke="#3070b0" stroke-width="1" opacity="0.6"/>
    </svg>`),
];

// ── Arrows ─────────────────────────────────────────────────────────────────────
const arrows: Icon[] = [
    makeIcon('ar-001', 'Straight Arrow Right', 'Arrows', ['arrow', 'direction', 'right', 'flow'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="100" x2="155" y2="100" stroke="#0ea5e9" stroke-width="8" stroke-linecap="round"/>
      <polygon points="150,78 180,100 150,122" fill="#0ea5e9"/>
    </svg>`),

    makeIcon('ar-002', 'Curved Arrow', 'Arrows', ['arrow', 'curved', 'pathway', 'process'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 150 Q30 50 150 50" fill="none" stroke="#f97316" stroke-width="8" stroke-linecap="round"/>
      <polygon points="138,30 162,52 138,70" fill="#f97316" transform="rotate(15,150,50)"/>
    </svg>`),

    makeIcon('ar-003', 'Bidirectional Arrow', 'Arrows', ['arrow', 'bidirectional', 'reversible', 'equilibrium'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="45" y1="100" x2="155" y2="100" stroke="#8b5cf6" stroke-width="7" stroke-linecap="round"/>
      <polygon points="48,80 18,100 48,120" fill="#8b5cf6"/>
      <polygon points="152,80 182,100 152,120" fill="#8b5cf6"/>
    </svg>`),

    makeIcon('ar-004', 'Inhibition Arrow', 'Arrows', ['inhibition', 'block', 'suppress', 'signal'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="100" x2="155" y2="100" stroke="#ef4444" stroke-width="7" stroke-linecap="round"/>
      <line x1="158" y1="78" x2="158" y2="122" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
    </svg>`),

    makeIcon('ar-005', 'Block Arrow Right', 'Arrows', ['arrow', 'block', 'thick', 'bold'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,78 140,78 140,55 185,100 140,145 140,122 20,122" fill="#10b981" stroke="#065f46" stroke-width="1.5"/>
    </svg>`),

    makeIcon('ar-006', 'Circular Arrow', 'Arrows', ['arrow', 'cycle', 'circular', 'rotation', 'clockwise'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 30 A70 70 0 1 1 30 100" fill="none" stroke="#6366f1" stroke-width="8" stroke-linecap="round"/>
      <polygon points="18,78 32,108 50,88" fill="#6366f1"/>
    </svg>`),

    makeIcon('ar-007', 'Activation Arrow', 'Arrows', ['activation', 'pathway', 'signal', 'positive'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="100" x2="155" y2="100" stroke="#22c55e" stroke-width="7" stroke-linecap="round" stroke-dasharray="12,5"/>
      <polygon points="150,78 180,100 150,122" fill="#22c55e"/>
    </svg>`),

    makeIcon('ar-008', 'Double Headed Block Arrow', 'Arrows', ['arrow', 'double', 'bidirectional', 'block'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="15,100 60,65 60,82 140,82 140,65 185,100 140,135 140,118 60,118 60,135" fill="#f59e0b" stroke="#92400e" stroke-width="1.5"/>
    </svg>`),
];

// ── Concentric / Shapes ────────────────────────────────────────────────────────
const concentricShapes: Icon[] = [
    makeIcon('sh-001', 'Concentric Circles', 'Shapes', ['concentric', 'circle', 'diffusion', 'gradient'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="none" stroke="#0ea5e9" stroke-width="2" opacity="0.2"/>
      <circle cx="100" cy="100" r="72" fill="none" stroke="#0ea5e9" stroke-width="2.5" opacity="0.35"/>
      <circle cx="100" cy="100" r="54" fill="none" stroke="#0ea5e9" stroke-width="3" opacity="0.5"/>
      <circle cx="100" cy="100" r="36" fill="none" stroke="#0ea5e9" stroke-width="3.5" opacity="0.7"/>
      <circle cx="100" cy="100" r="18" fill="#0ea5e9" opacity="0.9"/>
    </svg>`),

    makeIcon('sh-002', 'Venn Diagram', 'Shapes', ['venn', 'overlap', 'intersection', 'set'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="75" cy="105" r="60" fill="#60a0e8" opacity="0.45" stroke="#2060c0" stroke-width="2.5"/>
      <circle cx="125" cy="105" r="60" fill="#e86060" opacity="0.45" stroke="#c02020" stroke-width="2.5"/>
      <text x="58" y="108" text-anchor="middle" font-size="11" fill="#102060" font-family="Arial">A</text>
      <text x="142" y="108" text-anchor="middle" font-size="11" fill="#601010" font-family="Arial">B</text>
      <text x="100" y="108" text-anchor="middle" font-size="10" fill="#301060" font-family="Arial">A∩B</text>
    </svg>`),

    makeIcon('sh-003', 'Target / Bullseye', 'Shapes', ['target', 'bullseye', 'focus', 'goal'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="88" fill="#fde8e8" stroke="#ef4444" stroke-width="3"/>
      <circle cx="100" cy="100" r="65" fill="#ffffff" stroke="#ef4444" stroke-width="3"/>
      <circle cx="100" cy="100" r="42" fill="#fde8e8" stroke="#ef4444" stroke-width="3"/>
      <circle cx="100" cy="100" r="19" fill="#ef4444" stroke="#ef4444" stroke-width="3"/>
    </svg>`),

    makeIcon('sh-004', 'Concentric Rectangles', 'Shapes', ['concentric', 'rectangle', 'nested', 'box'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="176" height="176" rx="4" fill="none" stroke="#8b5cf6" stroke-width="2" opacity="0.3"/>
      <rect x="30" y="30" width="140" height="140" rx="4" fill="none" stroke="#8b5cf6" stroke-width="2.5" opacity="0.5"/>
      <rect x="48" y="48" width="104" height="104" rx="4" fill="none" stroke="#8b5cf6" stroke-width="3" opacity="0.7"/>
      <rect x="66" y="66" width="68" height="68" rx="4" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" stroke-width="3.5"/>
    </svg>`),

    makeIcon('sh-005', 'Diffusion Gradient Circles', 'Shapes', ['diffusion', 'gradient', 'concentration', 'osmosis'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0ea5e9" stop-opacity="1"/>
          <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.05"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#dg1)"/>
      <circle cx="100" cy="100" r="60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.4"/>
      <circle cx="100" cy="100" r="30" fill="none" stroke="#0ea5e9" stroke-width="1.5" opacity="0.6"/>
    </svg>`),
];

// ── Neuroscience ───────────────────────────────────────────────────────────────
const neuroscience: Icon[] = [
    makeIcon('ns-001', 'Neuron', 'Neuroscience', ['neuron', 'nerve cell', 'axon', 'dendrite', 'brain'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="100" rx="28" ry="25" fill="#ffe0a0" stroke="#c08000" stroke-width="2.5"/>
      <line x1="100" y1="125" x2="100" y2="185" stroke="#c08000" stroke-width="3"/>
      <line x1="72" y1="90" x2="25" y2="60" stroke="#c08000" stroke-width="2"/>
      <line x1="72" y1="100" x2="18" y2="90" stroke="#c08000" stroke-width="2"/>
      <line x1="75" y1="112" x2="30" y2="130" stroke="#c08000" stroke-width="2"/>
      <line x1="128" y1="90" x2="175" y2="60" stroke="#c08000" stroke-width="2"/>
      <line x1="128" y1="100" x2="182" y2="90" stroke="#c08000" stroke-width="2"/>
      <line x1="125" y1="112" x2="170" y2="130" stroke="#c08000" stroke-width="2"/>
      <circle cx="100" cy="185" r="7" fill="#e0a000" stroke="#c08000" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="10" fill="#f0c040" opacity="0.6"/>
    </svg>`),

    makeIcon('ns-002', 'Synapse', 'Neuroscience', ['synapse', 'neurotransmitter', 'vesicle', 'signal'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 100 Q75 100 95 100" fill="none" stroke="#c08000" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="100" cy="85" rx="35" ry="28" fill="#ffe8b0" stroke="#c08000" stroke-width="2"/>
      <circle cx="88" cy="82" r="5" fill="#e0a000" opacity="0.8"/>
      <circle cx="100" cy="88" r="5" fill="#e0a000" opacity="0.8"/>
      <circle cx="112" cy="80" r="5" fill="#e0a000" opacity="0.8"/>
      <circle cx="95" cy="72" r="4" fill="#e0a000" opacity="0.6"/>
      <line x1="88" y1="113" x2="88" y2="130" stroke="#c08000" stroke-width="1.5" opacity="0.6"/>
      <line x1="100" y1="113" x2="100" y2="130" stroke="#c08000" stroke-width="1.5" opacity="0.6"/>
      <line x1="112" y1="113" x2="112" y2="130" stroke="#c08000" stroke-width="1.5" opacity="0.6"/>
      <ellipse cx="100" cy="148" rx="42" ry="20" fill="#d0e8ff" stroke="#3060c0" stroke-width="2"/>
      <path d="M105 170 Q130 170 165 100" fill="none" stroke="#3060c0" stroke-width="5" stroke-linecap="round"/>
    </svg>`),
];

// ── Plant Biology ──────────────────────────────────────────────────────────────
const plantBiology: Icon[] = [
    makeIcon('pb-001', 'Leaf', 'Plant Biology', ['leaf', 'plant', 'photosynthesis', 'green'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 175 Q30 120 40 55 Q70 20 100 20 Q130 20 160 55 Q170 120 100 175Z" fill="#4ade80" stroke="#15803d" stroke-width="2.5"/>
      <line x1="100" y1="175" x2="100" y2="30" stroke="#15803d" stroke-width="2"/>
      <line x1="100" y1="80" x2="65" y2="60" stroke="#15803d" stroke-width="1.5"/>
      <line x1="100" y1="100" x2="58" y2="90" stroke="#15803d" stroke-width="1.5"/>
      <line x1="100" y1="120" x2="62" y2="118" stroke="#15803d" stroke-width="1.5"/>
      <line x1="100" y1="80" x2="135" y2="60" stroke="#15803d" stroke-width="1.5"/>
      <line x1="100" y1="100" x2="142" y2="90" stroke="#15803d" stroke-width="1.5"/>
      <line x1="100" y1="120" x2="138" y2="118" stroke="#15803d" stroke-width="1.5"/>
    </svg>`),

    makeIcon('pb-002', 'Stomata', 'Plant Biology', ['stomata', 'guard cell', 'gas exchange', 'leaf'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="100" rx="88" ry="70" fill="#e0f5e0" stroke="#2a8a2a" stroke-width="1.5" opacity="0.5"/>
      <ellipse cx="72" cy="100" rx="25" ry="40" fill="#5ab85a" stroke="#2a7a2a" stroke-width="2.5"/>
      <ellipse cx="128" cy="100" rx="25" ry="40" fill="#5ab85a" stroke="#2a7a2a" stroke-width="2.5"/>
      <ellipse cx="100" cy="100" rx="12" ry="28" fill="#e8f8e8" stroke="#2a7a2a" stroke-width="1"/>
      <ellipse cx="72" cy="100" rx="10" ry="15" fill="#80c880" opacity="0.4"/>
      <ellipse cx="128" cy="100" rx="10" ry="15" fill="#80c880" opacity="0.4"/>
    </svg>`),
];

// ── Biochemistry ───────────────────────────────────────────────────────────────
const biochemistry: Icon[] = [
    makeIcon('bc-001', 'ATP Molecule', 'Biochemistry', ['ATP', 'energy', 'adenosine', 'phosphate'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="85" r="38" fill="#fff0c0" stroke="#c0900a" stroke-width="2.5"/>
      <text x="100" y="92" text-anchor="middle" font-size="16" font-weight="bold" fill="#8a6000" font-family="Arial">ATP</text>
      <line x1="100" y1="123" x2="100" y2="140" stroke="#c0900a" stroke-width="2.5"/>
      <circle cx="100" cy="148" r="10" fill="#ffd060" stroke="#c0900a" stroke-width="2"/>
      <line x1="110" y1="148" x2="126" y2="148" stroke="#c0900a" stroke-width="2"/>
      <circle cx="134" cy="148" r="10" fill="#ffd060" stroke="#c0900a" stroke-width="2"/>
      <line x1="144" y1="148" x2="160" y2="148" stroke="#c0900a" stroke-width="2"/>
      <circle cx="168" cy="148" r="10" fill="#ffc030" stroke="#c0900a" stroke-width="2"/>
      <text x="100" y="152" text-anchor="middle" font-size="7" fill="#604000" font-family="Arial">P</text>
      <text x="134" y="152" text-anchor="middle" font-size="7" fill="#604000" font-family="Arial">P</text>
      <text x="168" y="152" text-anchor="middle" font-size="7" fill="#604000" font-family="Arial">P</text>
    </svg>`),

    makeIcon('bc-002', 'Lipid Bilayer', 'Biochemistry', ['lipid', 'bilayer', 'membrane', 'phospholipid'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="85" width="180" height="30" rx="2" fill="#ffe8d0" stroke="#c06030" stroke-width="1"/>
      <g>
        <circle cx="22" cy="90" r="7" fill="#c06030"/>
        <line x1="22" y1="97" x2="20" y2="110" stroke="#c06030" stroke-width="2"/>
        <line x1="22" y1="97" x2="24" y2="110" stroke="#c06030" stroke-width="2"/>
        <circle cx="42" cy="90" r="7" fill="#c06030"/>
        <line x1="42" y1="97" x2="40" y2="110" stroke="#c06030" stroke-width="2"/>
        <line x1="42" y1="97" x2="44" y2="110" stroke="#c06030" stroke-width="2"/>
        <circle cx="62" cy="90" r="7" fill="#c06030"/>
        <line x1="62" y1="97" x2="60" y2="110" stroke="#c06030" stroke-width="2"/>
        <line x1="62" y1="97" x2="64" y2="110" stroke="#c06030" stroke-width="2"/>
        <circle cx="82" cy="90" r="7" fill="#c06030"/>
        <line x1="82" y1="97" x2="80" y2="110" stroke="#c06030" stroke-width="2"/>
        <line x1="82" y1="97" x2="84" y2="110" stroke="#c06030" stroke-width="2"/>
        <circle cx="102" cy="90" r="7" fill="#c06030"/>
        <line x1="102" y1="97" x2="100" y2="110" stroke="#c06030" stroke-width="2"/>
        <line x1="102" y1="97" x2="104" y2="110" stroke="#c06030" stroke-width="2"/>
        <circle cx="122" cy="90" r="7" fill="#c06030"/>
        <line x1="122" y1="97" x2="120" y2="110" stroke="#c06030" stroke-width="2"/>
        <line x1="122" y1="97" x2="124" y2="110" stroke="#c06030" stroke-width="2"/>
        <circle cx="142" cy="90" r="7" fill="#c06030"/>
        <line x1="142" y1="97" x2="140" y2="110" stroke="#c06030" stroke-width="2"/>
        <line x1="142" y1="97" x2="144" y2="110" stroke="#c06030" stroke-width="2"/>
        <circle cx="162" cy="90" r="7" fill="#c06030"/>
        <line x1="162" y1="97" x2="160" y2="110" stroke="#c06030" stroke-width="2"/>
        <line x1="162" y1="97" x2="164" y2="110" stroke="#c06030" stroke-width="2"/>
        <circle cx="182" cy="90" r="7" fill="#c06030"/>
        <line x1="182" y1="97" x2="180" y2="110" stroke="#c06030" stroke-width="2"/>
        <line x1="182" y1="97" x2="184" y2="110" stroke="#c06030" stroke-width="2"/>
      </g>
      <g>
        <circle cx="22" cy="110" r="7" fill="#c06030"/>
        <line x1="22" y1="103" x2="20" y2="90" stroke="#c06030" stroke-width="2"/>
        <line x1="22" y1="103" x2="24" y2="90" stroke="#c06030" stroke-width="2"/>
        <circle cx="42" cy="110" r="7" fill="#c06030"/>
        <line x1="42" y1="103" x2="40" y2="90" stroke="#c06030" stroke-width="2"/>
        <line x1="42" y1="103" x2="44" y2="90" stroke="#c06030" stroke-width="2"/>
        <circle cx="62" cy="110" r="7" fill="#c06030"/>
        <line x1="62" y1="103" x2="60" y2="90" stroke="#c06030" stroke-width="2"/>
        <line x1="62" y1="103" x2="64" y2="90" stroke="#c06030" stroke-width="2"/>
        <circle cx="82" cy="110" r="7" fill="#c06030"/>
        <line x1="82" y1="103" x2="80" y2="90" stroke="#c06030" stroke-width="2"/>
        <line x1="82" y1="103" x2="84" y2="90" stroke="#c06030" stroke-width="2"/>
        <circle cx="102" cy="110" r="7" fill="#c06030"/>
        <line x1="102" y1="103" x2="100" y2="90" stroke="#c06030" stroke-width="2"/>
        <line x1="102" y1="103" x2="104" y2="90" stroke="#c06030" stroke-width="2"/>
        <circle cx="122" cy="110" r="7" fill="#c06030"/>
        <line x1="122" y1="103" x2="120" y2="90" stroke="#c06030" stroke-width="2"/>
        <line x1="122" y1="103" x2="124" y2="90" stroke="#c06030" stroke-width="2"/>
        <circle cx="142" cy="110" r="7" fill="#c06030"/>
        <line x1="142" y1="103" x2="140" y2="90" stroke="#c06030" stroke-width="2"/>
        <line x1="142" y1="103" x2="144" y2="90" stroke="#c06030" stroke-width="2"/>
        <circle cx="162" cy="110" r="7" fill="#c06030"/>
        <line x1="162" y1="103" x2="160" y2="90" stroke="#c06030" stroke-width="2"/>
        <line x1="162" y1="103" x2="164" y2="90" stroke="#c06030" stroke-width="2"/>
        <circle cx="182" cy="110" r="7" fill="#c06030"/>
        <line x1="182" y1="103" x2="180" y2="90" stroke="#c06030" stroke-width="2"/>
        <line x1="182" y1="103" x2="184" y2="90" stroke="#c06030" stroke-width="2"/>
      </g>
    </svg>`),
];

// ── Drosophila ────────────────────────────────────────────────────────────────
const drosophila: Icon[] = [
    makeIcon('dr-001', 'Drosophila Male Adult', 'Drosophila', ['drosophila', 'male', 'fly', 'insect'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="115" rx="22" ry="35" fill="#c8a060" stroke="#704020" stroke-width="2"/>
      <ellipse cx="100" cy="80" rx="18" ry="16" fill="#d4aa70" stroke="#704020" stroke-width="2"/>
      <ellipse cx="100" cy="62" rx="10" ry="8" fill="#c89050" stroke="#704020" stroke-width="1.5"/>
      <circle cx="93" cy="58" r="4" fill="#200000"/>
      <circle cx="107" cy="58" r="4" fill="#200000"/>
      <ellipse cx="58" cy="75" rx="40" ry="14" fill="#e0e8ff" stroke="#6070a0" stroke-width="1.5" opacity="0.85"/>
      <ellipse cx="142" cy="75" rx="40" ry="14" fill="#e0e8ff" stroke="#6070a0" stroke-width="1.5" opacity="0.85"/>
      <path d="M78 105 Q60 120 45 145" stroke="#704020" stroke-width="1.5" fill="none"/>
      <path d="M78 112 Q55 130 40 158" stroke="#704020" stroke-width="1.5" fill="none"/>
      <path d="M78 118 Q62 138 55 165" stroke="#704020" stroke-width="1.5" fill="none"/>
      <path d="M122 105 Q140 120 155 145" stroke="#704020" stroke-width="1.5" fill="none"/>
      <path d="M122 112 Q145 130 160 158" stroke="#704020" stroke-width="1.5" fill="none"/>
      <path d="M122 118 Q138 138 145 165" stroke="#704020" stroke-width="1.5" fill="none"/>
      <path d="M100 150 Q92 158 88 165" stroke="#704020" stroke-width="2" fill="none"/>
      <path d="M100 150 Q108 158 112 165" stroke="#704020" stroke-width="2" fill="none"/>
      <text x="100" y="195" text-anchor="middle" font-size="9" fill="#604020" font-family="Arial">♂ Male</text>
    </svg>`),

    makeIcon('dr-002', 'Drosophila Female Adult', 'Drosophila', ['drosophila', 'female', 'fly', 'insect'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="118" rx="22" ry="40" fill="#c8a060" stroke="#704020" stroke-width="2"/>
      <ellipse cx="100" cy="78" rx="18" ry="16" fill="#d4aa70" stroke="#704020" stroke-width="2"/>
      <ellipse cx="100" cy="60" rx="10" ry="8" fill="#c89050" stroke="#704020" stroke-width="1.5"/>
      <circle cx="93" cy="56" r="4" fill="#200000"/>
      <circle cx="107" cy="56" r="4" fill="#200000"/>
      <ellipse cx="58" cy="73" rx="42" ry="15" fill="#e0e8ff" stroke="#6070a0" stroke-width="1.5" opacity="0.85"/>
      <ellipse cx="142" cy="73" rx="42" ry="15" fill="#e0e8ff" stroke="#6070a0" stroke-width="1.5" opacity="0.85"/>
      <path d="M78 105 Q60 120 45 145" stroke="#704020" stroke-width="1.5" fill="none"/>
      <path d="M78 115 Q55 132 40 160" stroke="#704020" stroke-width="1.5" fill="none"/>
      <path d="M78 122 Q62 140 55 168" stroke="#704020" stroke-width="1.5" fill="none"/>
      <path d="M122 105 Q140 120 155 145" stroke="#704020" stroke-width="1.5" fill="none"/>
      <path d="M122 115 Q145 132 160 160" stroke="#704020" stroke-width="1.5" fill="none"/>
      <path d="M122 122 Q138 140 145 168" stroke="#704020" stroke-width="1.5" fill="none"/>
      <ellipse cx="100" cy="158" rx="14" ry="8" fill="#a07040" stroke="#704020" stroke-width="1.5"/>
      <text x="100" y="195" text-anchor="middle" font-size="9" fill="#604020" font-family="Arial">♀ Female</text>
    </svg>`),

    makeIcon('dr-003', 'Drosophila Adult Brain', 'Drosophila', ['drosophila', 'brain', 'adult', 'nervous system'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="88" rx="62" ry="52" fill="#ffe0d8" stroke="#c05040" stroke-width="2.5"/>
      <ellipse cx="68" cy="80" rx="28" ry="35" fill="#ffc8b8" stroke="#c05040" stroke-width="2"/>
      <ellipse cx="132" cy="80" rx="28" ry="35" fill="#ffc8b8" stroke="#c05040" stroke-width="2"/>
      <ellipse cx="100" cy="55" rx="18" ry="10" fill="#ffb0a0" stroke="#c05040" stroke-width="1.5"/>
      <ellipse cx="68" cy="125" rx="14" ry="10" fill="#e89080" stroke="#c05040" stroke-width="1.5"/>
      <ellipse cx="132" cy="125" rx="14" ry="10" fill="#e89080" stroke="#c05040" stroke-width="1.5"/>
      <path d="M86 140 Q100 152 114 140" fill="#d07060" stroke="#c05040" stroke-width="1.5"/>
      <line x1="60" y1="88" x2="140" y2="88" stroke="#c05040" stroke-width="1" opacity="0.4"/>
      <text x="100" y="180" text-anchor="middle" font-size="9" fill="#803020" font-family="Arial">Adult Brain</text>
    </svg>`),

    makeIcon('dr-004', 'Ventral Nerve Cord', 'Drosophila', ['VNC', 'ventral nerve cord', 'drosophila', 'nervous system'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="40" rx="30" ry="20" fill="#ffe0d8" stroke="#c05040" stroke-width="2.5"/>
      <rect x="85" y="58" width="30" height="110" rx="10" fill="#ffc8b8" stroke="#c05040" stroke-width="2"/>
      <ellipse cx="100" cy="75" rx="20" ry="8" fill="#ffb0a0" stroke="#c05040" stroke-width="1.5"/>
      <ellipse cx="100" cy="100" rx="20" ry="8" fill="#ffb0a0" stroke="#c05040" stroke-width="1.5"/>
      <ellipse cx="100" cy="125" rx="20" ry="8" fill="#ffb0a0" stroke="#c05040" stroke-width="1.5"/>
      <line x1="65" y1="75" x2="85" y2="75" stroke="#c05040" stroke-width="1.5"/>
      <line x1="115" y1="75" x2="135" y2="75" stroke="#c05040" stroke-width="1.5"/>
      <line x1="65" y1="100" x2="85" y2="100" stroke="#c05040" stroke-width="1.5"/>
      <line x1="115" y1="100" x2="135" y2="100" stroke="#c05040" stroke-width="1.5"/>
      <line x1="65" y1="125" x2="85" y2="125" stroke="#c05040" stroke-width="1.5"/>
      <line x1="115" y1="125" x2="135" y2="125" stroke="#c05040" stroke-width="1.5"/>
      <text x="100" y="185" text-anchor="middle" font-size="9" fill="#803020" font-family="Arial">Ventral Nerve Cord</text>
    </svg>`),

    makeIcon('dr-005', 'Drosophila Egg', 'Drosophila', ['drosophila', 'egg', 'oocyte', 'embryo'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="108" rx="45" ry="70" fill="#fffde0" stroke="#c8b030" stroke-width="2.5"/>
      <ellipse cx="100" cy="108" rx="37" ry="62" fill="#fffacc" stroke="#c8b030" stroke-width="1" opacity="0.5"/>
      <path d="M90 42 Q100 30 110 42" fill="none" stroke="#c8b030" stroke-width="2"/>
      <path d="M80 48 Q82 35 90 42" fill="none" stroke="#c8b030" stroke-width="1.5"/>
      <path d="M120 48 Q118 35 110 42" fill="none" stroke="#c8b030" stroke-width="1.5"/>
      <ellipse cx="100" cy="90" rx="20" ry="15" fill="#e8d860" opacity="0.3"/>
      <text x="100" y="190" text-anchor="middle" font-size="9" fill="#806010" font-family="Arial">Egg</text>
    </svg>`),

    makeIcon('dr-006', '1st Instar Larva', 'Drosophila', ['drosophila', 'larva', '1st instar', 'L1'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 100 Q40 60 100 58 Q160 60 160 100 Q160 140 100 142 Q40 140 40 100Z" fill="#e8f0c8" stroke="#608020" stroke-width="2.5"/>
      <ellipse cx="148" cy="100" rx="16" ry="14" fill="#f0f8d8" stroke="#608020" stroke-width="2"/>
      <circle cx="154" cy="96" r="4" fill="#201000"/>
      <line x1="60" y1="82" x2="60" y2="118" stroke="#608020" stroke-width="1.5"/>
      <line x1="80" y1="80" x2="80" y2="120" stroke="#608020" stroke-width="1.5"/>
      <line x1="100" y1="79" x2="100" y2="121" stroke="#608020" stroke-width="1.5"/>
      <line x1="120" y1="80" x2="120" y2="120" stroke="#608020" stroke-width="1.5"/>
      <text x="100" y="170" text-anchor="middle" font-size="9" fill="#406010" font-family="Arial">1st Instar (L1)</text>
    </svg>`),

    makeIcon('dr-007', '2nd Instar Larva', 'Drosophila', ['drosophila', 'larva', '2nd instar', 'L2'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 105 Q30 55 100 52 Q170 55 170 105 Q170 150 100 153 Q30 150 30 105Z" fill="#d8ecc0" stroke="#508020" stroke-width="2.5"/>
      <ellipse cx="158" cy="105" rx="18" ry="16" fill="#e8f4d0" stroke="#508020" stroke-width="2"/>
      <circle cx="164" cy="100" r="5" fill="#201000"/>
      <line x1="55" y1="84" x2="55" y2="126" stroke="#508020" stroke-width="1.5"/>
      <line x1="78" y1="81" x2="78" y2="128" stroke="#508020" stroke-width="1.5"/>
      <line x1="100" y1="80" x2="100" y2="130" stroke="#508020" stroke-width="1.5"/>
      <line x1="122" y1="81" x2="122" y2="128" stroke="#508020" stroke-width="1.5"/>
      <line x1="140" y1="84" x2="140" y2="126" stroke="#508020" stroke-width="1.5"/>
      <text x="100" y="172" text-anchor="middle" font-size="9" fill="#406010" font-family="Arial">2nd Instar (L2)</text>
    </svg>`),

    makeIcon('dr-008', '3rd Instar Larva', 'Drosophila', ['drosophila', 'larva', '3rd instar', 'L3', 'wandering'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 105 Q18 48 100 45 Q182 48 182 105 Q182 158 100 161 Q18 158 18 105Z" fill="#c8e0b0" stroke="#408020" stroke-width="2.5"/>
      <ellipse cx="170" cy="105" rx="20" ry="18" fill="#d8ecc0" stroke="#408020" stroke-width="2"/>
      <circle cx="176" cy="99" r="6" fill="#200800"/>
      <line x1="42" y1="82" x2="42" y2="128" stroke="#408020" stroke-width="1.5"/>
      <line x1="65" y1="78" x2="65" y2="132" stroke="#408020" stroke-width="1.5"/>
      <line x1="88" y1="76" x2="88" y2="134" stroke="#408020" stroke-width="1.5"/>
      <line x1="112" y1="76" x2="112" y2="134" stroke="#408020" stroke-width="1.5"/>
      <line x1="135" y1="78" x2="135" y2="132" stroke="#408020" stroke-width="1.5"/>
      <line x1="155" y1="82" x2="155" y2="128" stroke="#408020" stroke-width="1.5"/>
      <text x="100" y="180" text-anchor="middle" font-size="9" fill="#305010" font-family="Arial">3rd Instar (L3)</text>
    </svg>`),

    makeIcon('dr-009', 'Larval Brain', 'Drosophila', ['drosophila', 'larval brain', 'central brain', 'optic lobe'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="100" rx="30" ry="40" fill="#ffd0c8" stroke="#c04030" stroke-width="2.5"/>
      <ellipse cx="60" cy="100" rx="30" ry="40" fill="#ffb8a8" stroke="#c04030" stroke-width="2"/>
      <ellipse cx="140" cy="100" rx="30" ry="40" fill="#ffb8a8" stroke="#c04030" stroke-width="2"/>
      <line x1="70" y1="100" x2="130" y2="100" stroke="#c04030" stroke-width="1" opacity="0.4"/>
      <text x="60" y="155" text-anchor="middle" font-size="7" fill="#803020" font-family="Arial">OL</text>
      <text x="100" y="155" text-anchor="middle" font-size="7" fill="#803020" font-family="Arial">CB</text>
      <text x="140" y="155" text-anchor="middle" font-size="7" fill="#803020" font-family="Arial">OL</text>
      <text x="100" y="175" text-anchor="middle" font-size="9" fill="#803020" font-family="Arial">Larval Brain</text>
    </svg>`),

    makeIcon('dr-010', 'Larval Wing Disc', 'Drosophila', ['drosophila', 'wing disc', 'imaginal disc', 'larva'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 100 Q65 50 100 45 Q150 42 155 80 Q160 105 140 120 Q120 138 100 140 Q70 140 60 120 Q50 110 60 100Z" fill="#d8f0e8" stroke="#208060" stroke-width="2.5"/>
      <path d="M60 100 Q65 50 100 45 Q150 42 155 80" fill="none" stroke="#208060" stroke-width="1.5" stroke-dasharray="5,3"/>
      <ellipse cx="88" cy="120" rx="25" ry="18" fill="#b8e8d8" stroke="#208060" stroke-width="2"/>
      <ellipse cx="120" cy="85" rx="30" ry="25" fill="#a8e0d0" stroke="#208060" stroke-width="1.5" opacity="0.7"/>
      <text x="100" y="170" text-anchor="middle" font-size="9" fill="#106040" font-family="Arial">Wing Disc</text>
    </svg>`),

    makeIcon('dr-011', 'Larval Eye Disc', 'Drosophila', ['drosophila', 'eye disc', 'imaginal disc', 'retina'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="98" rx="65" ry="55" fill="#e8d8f8" stroke="#6030a0" stroke-width="2.5"/>
      <ellipse cx="100" cy="98" rx="50" ry="40" fill="#dcc8f0" stroke="#6030a0" stroke-width="1.5"/>
      <line x1="50" y1="98" x2="150" y2="98" stroke="#6030a0" stroke-width="2" stroke-dasharray="5,3"/>
      <text x="80" y="94" text-anchor="middle" font-size="8" fill="#401080" font-family="Arial">Eye</text>
      <text x="125" y="94" text-anchor="middle" font-size="8" fill="#401080" font-family="Arial">Antenna</text>
      <ellipse cx="78" cy="110" rx="22" ry="18" fill="#c8b0e8" stroke="#6030a0" stroke-width="1.5"/>
      <ellipse cx="125" cy="105" rx="20" ry="15" fill="#b8a0e0" stroke="#6030a0" stroke-width="1.5"/>
      <text x="100" y="170" text-anchor="middle" font-size="9" fill="#401080" font-family="Arial">Eye-Antenna Disc</text>
    </svg>`),

    makeIcon('dr-012', 'Larval Leg Disc', 'Drosophila', ['drosophila', 'leg disc', 'imaginal disc', 'limb'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="95" r="60" fill="#f0e0d8" stroke="#a05030" stroke-width="2.5"/>
      <circle cx="100" cy="95" r="45" fill="#f8e8e0" stroke="#a05030" stroke-width="1.5"/>
      <circle cx="100" cy="95" r="30" fill="#e8d0c8" stroke="#a05030" stroke-width="1.5"/>
      <circle cx="100" cy="95" r="15" fill="#d8b8a8" stroke="#a05030" stroke-width="2"/>
      <circle cx="100" cy="95" r="5" fill="#a05030"/>
      <text x="100" y="172" text-anchor="middle" font-size="9" fill="#703020" font-family="Arial">Leg Disc</text>
    </svg>`),
];

// ── Mosquito ──────────────────────────────────────────────────────────────────
const mosquito: Icon[] = [
    makeIcon('mq-001', 'Aedes Mosquito Adult', 'Mosquito', ['mosquito', 'aedes', 'adult', 'dengue', 'zika'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="115" rx="18" ry="38" fill="#606040" stroke="#303020" stroke-width="2"/>
      <ellipse cx="100" cy="83" rx="16" ry="13" fill="#708040" stroke="#303020" stroke-width="2"/>
      <ellipse cx="100" cy="68" rx="9" ry="7" fill="#506030" stroke="#303020" stroke-width="1.5"/>
      <line x1="100" y1="61" x2="100" y2="30" stroke="#303020" stroke-width="1.5"/>
      <line x1="96" y1="32" x2="100" y2="30" stroke="#303020" stroke-width="1"/>
      <line x1="104" y1="32" x2="100" y2="30" stroke="#303020" stroke-width="1"/>
      <circle cx="94" cy="64" r="3" fill="#101000"/>
      <circle cx="106" cy="64" r="3" fill="#101000"/>
      <ellipse cx="55" cy="80" rx="44" ry="12" fill="#c8d8c0" stroke="#506040" stroke-width="1.5" opacity="0.8"/>
      <ellipse cx="145" cy="80" rx="44" ry="12" fill="#c8d8c0" stroke="#506040" stroke-width="1.5" opacity="0.8"/>
      <path d="M55 60 Q40 55 30 62" stroke="#303020" stroke-width="1.5" fill="none"/>
      <path d="M55 65 Q38 63 28 72" stroke="#303020" stroke-width="1.5" fill="none"/>
      <path d="M82 98 Q65 110 50 130" stroke="#303020" stroke-width="1.5" fill="none"/>
      <path d="M82 108 Q60 122 48 148" stroke="#303020" stroke-width="1.5" fill="none"/>
      <path d="M82 118 Q64 132 55 158" stroke="#303020" stroke-width="1.5" fill="none"/>
      <path d="M118 98 Q135 110 150 130" stroke="#303020" stroke-width="1.5" fill="none"/>
      <path d="M118 108 Q140 122 152 148" stroke="#303020" stroke-width="1.5" fill="none"/>
      <path d="M118 118 Q136 132 145 158" stroke="#303020" stroke-width="1.5" fill="none"/>
      <rect x="85" y="92" width="30" height="4" rx="2" fill="#f0e8d0" opacity="0.6"/>
      <text x="100" y="190" text-anchor="middle" font-size="8" fill="#303020" font-family="Arial">Aedes aegypti</text>
    </svg>`),

    makeIcon('mq-002', 'Anopheles Mosquito Adult', 'Mosquito', ['mosquito', 'anopheles', 'malaria', 'adult'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="112" rx="17" ry="36" fill="#706050" stroke="#402010" stroke-width="2"/>
      <ellipse cx="100" cy="80" rx="15" ry="13" fill="#806060" stroke="#402010" stroke-width="2"/>
      <ellipse cx="100" cy="66" rx="9" ry="7" fill="#604040" stroke="#402010" stroke-width="1.5"/>
      <line x1="100" y1="59" x2="100" y2="28" stroke="#402010" stroke-width="1.5"/>
      <circle cx="94" cy="62" r="3" fill="#100000"/>
      <circle cx="106" cy="62" r="3" fill="#100000"/>
      <ellipse cx="55" cy="75" rx="44" ry="12" fill="#d8c8a8" stroke="#604030" stroke-width="1.5" opacity="0.8"/>
      <ellipse cx="145" cy="75" rx="44" ry="12" fill="#d8c8a8" stroke="#604030" stroke-width="1.5" opacity="0.8"/>
      <path d="M100 148 L90 168 M100 148 L110 168" stroke="#402010" stroke-width="2" fill="none"/>
      <ellipse cx="100" cy="148" rx="10" ry="5" fill="#503020"/>
      <path d="M82 95 Q65 108 50 128" stroke="#402010" stroke-width="1.5" fill="none"/>
      <path d="M82 108 Q60 120 48 145" stroke="#402010" stroke-width="1.5" fill="none"/>
      <path d="M118 95 Q135 108 150 128" stroke="#402010" stroke-width="1.5" fill="none"/>
      <path d="M118 108 Q140 120 152 145" stroke="#402010" stroke-width="1.5" fill="none"/>
      <text x="100" y="192" text-anchor="middle" font-size="8" fill="#402010" font-family="Arial">Anopheles gambiae</text>
    </svg>`),

    makeIcon('mq-003', 'Mosquito Larva', 'Mosquito', ['mosquito', 'larva', 'wriggler', 'aquatic'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 100 Q30 60 80 58 Q130 56 160 80 Q175 95 170 115 Q165 135 145 140 Q120 145 90 140 Q50 135 30 100Z" fill="#d0e8c8" stroke="#406020" stroke-width="2.5"/>
      <ellipse cx="165" cy="100" rx="18" ry="15" fill="#e0f0d0" stroke="#406020" stroke-width="2"/>
      <circle cx="172" cy="95" r="5" fill="#201000"/>
      <line x1="40" y1="82" x2="40" y2="118" stroke="#406020" stroke-width="1.5"/>
      <line x1="62" y1="76" x2="62" y2="122" stroke="#406020" stroke-width="1.5"/>
      <line x1="84" y1="73" x2="84" y2="124" stroke="#406020" stroke-width="1.5"/>
      <line x1="106" y1="73" x2="106" y2="124" stroke="#406020" stroke-width="1.5"/>
      <line x1="128" y1="76" x2="128" y2="122" stroke="#406020" stroke-width="1.5"/>
      <line x1="148" y1="82" x2="148" y2="118" stroke="#406020" stroke-width="1.5"/>
      <path d="M88 56 Q88 38 95 32" fill="none" stroke="#406020" stroke-width="2"/>
      <circle cx="96" cy="30" r="5" fill="#406020"/>
      <text x="100" y="175" text-anchor="middle" font-size="9" fill="#305010" font-family="Arial">Mosquito Larva</text>
    </svg>`),

    makeIcon('mq-004', 'Mosquito Egg Raft', 'Mosquito', ['mosquito', 'egg', 'raft', 'culex'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="120" rx="80" ry="30" fill="#d0e8f8" stroke="#3060a0" stroke-width="1.5" opacity="0.4"/>
      <g fill="#808060" stroke="#404020" stroke-width="1">
        <ellipse cx="55" cy="110" rx="7" ry="22"/>
        <ellipse cx="70" cy="108" rx="7" ry="22"/>
        <ellipse cx="85" cy="107" rx="7" ry="22"/>
        <ellipse cx="100" cy="107" rx="7" ry="22"/>
        <ellipse cx="115" cy="107" rx="7" ry="22"/>
        <ellipse cx="130" cy="108" rx="7" ry="22"/>
        <ellipse cx="145" cy="110" rx="7" ry="22"/>
      </g>
      <ellipse cx="100" cy="130" rx="78" ry="12" fill="#a0b8d0" opacity="0.5"/>
      <text x="100" y="160" text-anchor="middle" font-size="9" fill="#304060" font-family="Arial">Egg Raft (Culex)</text>
    </svg>`),

    makeIcon('mq-005', 'Mosquito Pupa', 'Mosquito', ['mosquito', 'pupa', 'tumbler', 'metamorphosis'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M90 45 Q130 42 140 70 Q148 90 135 110 Q118 130 100 138 Q82 145 70 138 Q52 128 48 108 Q44 85 58 68 Q70 50 90 45Z" fill="#c8d8b0" stroke="#405020" stroke-width="2.5"/>
      <ellipse cx="115" cy="60" rx="22" ry="16" fill="#d8e8c0" stroke="#405020" stroke-width="2"/>
      <circle cx="120" cy="58" r="4" fill="#201000"/>
      <path d="M70 140 Q65 162 62 178" stroke="#405020" stroke-width="2.5" fill="none"/>
      <path d="M80 143 Q78 165 76 180" stroke="#405020" stroke-width="2" fill="none"/>
      <path d="M90 145 Q90 165 90 180" stroke="#405020" stroke-width="2" fill="none"/>
      <text x="100" y="195" text-anchor="middle" font-size="9" fill="#304010" font-family="Arial">Pupa (Tumbler)</text>
    </svg>`),

    makeIcon('mq-006', 'Mosquito Brain', 'Mosquito', ['mosquito', 'brain', 'optic lobe', 'nervous system'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="98" rx="25" ry="32" fill="#ffccc0" stroke="#b04030" stroke-width="2.5"/>
      <ellipse cx="62" cy="98" rx="28" ry="38" fill="#ffb8aa" stroke="#b04030" stroke-width="2"/>
      <ellipse cx="138" cy="98" rx="28" ry="38" fill="#ffb8aa" stroke="#b04030" stroke-width="2"/>
      <line x1="75" y1="98" x2="125" y2="98" stroke="#b04030" stroke-width="1" opacity="0.4"/>
      <text x="62" y="148" text-anchor="middle" font-size="7" fill="#702020" font-family="Arial">OL</text>
      <text x="100" y="144" text-anchor="middle" font-size="7" fill="#702020" font-family="Arial">CB</text>
      <text x="138" y="148" text-anchor="middle" font-size="7" fill="#702020" font-family="Arial">OL</text>
      <path d="M88 130 Q100 142 112 130" fill="#e08070" stroke="#b04030" stroke-width="1.5"/>
      <text x="100" y="172" text-anchor="middle" font-size="9" fill="#702020" font-family="Arial">Mosquito Brain</text>
    </svg>`),
];

// ── Biologicals ───────────────────────────────────────────────────────────────
const biologicals: Icon[] = [
    makeIcon('bi-001', 'DNA Double Helix (Straight)', 'Biologicals', ['DNA', 'helix', 'double helix', 'genetics'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 20 Q100 40 130 60 Q100 80 70 100 Q100 120 130 140 Q100 160 70 180" fill="none" stroke="#e05050" stroke-width="4" stroke-linecap="round"/>
      <path d="M130 20 Q100 40 70 60 Q100 80 130 100 Q100 120 70 140 Q100 160 130 180" fill="none" stroke="#5050e0" stroke-width="4" stroke-linecap="round"/>
      <line x1="70" y1="20" x2="130" y2="20" stroke="#808080" stroke-width="2.5"/>
      <line x1="100" y1="40" x2="100" y2="40" stroke="#808080" stroke-width="2.5"/>
      <line x1="85" y1="50" x2="115" y2="50" stroke="#80c080" stroke-width="2.5"/>
      <line x1="70" y1="60" x2="130" y2="60" stroke="#c08080" stroke-width="2.5"/>
      <line x1="85" y1="70" x2="115" y2="70" stroke="#8080c0" stroke-width="2.5"/>
      <line x1="100" y1="80" x2="100" y2="80" stroke="#808080" stroke-width="2.5"/>
      <line x1="85" y1="90" x2="115" y2="90" stroke="#c0c080" stroke-width="2.5"/>
      <line x1="70" y1="100" x2="130" y2="100" stroke="#808080" stroke-width="2.5"/>
      <line x1="85" y1="110" x2="115" y2="110" stroke="#80c080" stroke-width="2.5"/>
      <line x1="70" y1="120" x2="130" y2="120" stroke="#c08080" stroke-width="2.5"/>
      <line x1="85" y1="130" x2="115" y2="130" stroke="#8080c0" stroke-width="2.5"/>
      <line x1="70" y1="140" x2="130" y2="140" stroke="#808080" stroke-width="2.5"/>
      <line x1="85" y1="150" x2="115" y2="150" stroke="#c0c080" stroke-width="2.5"/>
      <line x1="100" y1="160" x2="100" y2="160" stroke="#808080" stroke-width="2.5"/>
      <line x1="85" y1="170" x2="115" y2="170" stroke="#80c080" stroke-width="2.5"/>
      <line x1="70" y1="180" x2="130" y2="180" stroke="#808080" stroke-width="2.5"/>
    </svg>`),

    makeIcon('bi-002', 'Circular DNA (Plasmid)', 'Biologicals', ['plasmid', 'circular DNA', 'bacterial', 'vector'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="70" fill="none" stroke="#e05050" stroke-width="5"/>
      <circle cx="100" cy="100" r="62" fill="none" stroke="#5050e0" stroke-width="5"/>
      <line x1="100" y1="30" x2="100" y2="62" stroke="#404040" stroke-width="2.5"/>
      <line x1="151" y1="55" x2="131" y2="81" stroke="#404040" stroke-width="2.5"/>
      <line x1="170" y1="100" x2="138" y2="100" stroke="#404040" stroke-width="2.5"/>
      <line x1="151" y1="145" x2="131" y2="119" stroke="#404040" stroke-width="2.5"/>
      <line x1="49" y1="55" x2="69" y2="81" stroke="#404040" stroke-width="2.5"/>
      <line x1="30" y1="100" x2="62" y2="100" stroke="#404040" stroke-width="2.5"/>
      <rect x="82" y="82" width="36" height="12" rx="4" fill="#e0f0ff" stroke="#3060a0" stroke-width="1.5"/>
      <text x="100" y="92" text-anchor="middle" font-size="8" fill="#304080" font-family="Arial">ori</text>
    </svg>`),

    makeIcon('bi-003', 'RNA Strand (Straight)', 'Biologicals', ['RNA', 'mRNA', 'strand', 'bases', 'genetics'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 18 Q100 182 100 182" fill="none" stroke="#e07020" stroke-width="5" stroke-linecap="round"/>
      <circle cx="100" cy="40" r="10" fill="#e05050" stroke="#a02020" stroke-width="1.5"/>
      <text x="100" y="44" text-anchor="middle" font-size="9" fill="white" font-family="Arial">A</text>
      <line x1="100" y1="50" x2="138" y2="50" stroke="#606060" stroke-width="2"/>
      <circle cx="148" cy="50" r="10" fill="#5050e0" stroke="#2020a0" stroke-width="1.5"/>
      <text x="148" y="54" text-anchor="middle" font-size="9" fill="white" font-family="Arial">U</text>
      <circle cx="100" cy="75" r="10" fill="#20a020" stroke="#105010" stroke-width="1.5"/>
      <text x="100" y="79" text-anchor="middle" font-size="9" fill="white" font-family="Arial">G</text>
      <line x1="100" y1="85" x2="62" y2="85" stroke="#606060" stroke-width="2"/>
      <circle cx="52" cy="85" r="10" fill="#e0a020" stroke="#a06010" stroke-width="1.5"/>
      <text x="52" y="89" text-anchor="middle" font-size="9" fill="white" font-family="Arial">C</text>
      <circle cx="100" cy="110" r="10" fill="#e05050" stroke="#a02020" stroke-width="1.5"/>
      <text x="100" y="114" text-anchor="middle" font-size="9" fill="white" font-family="Arial">A</text>
      <line x1="100" y1="120" x2="138" y2="120" stroke="#606060" stroke-width="2"/>
      <circle cx="148" cy="120" r="10" fill="#20a020" stroke="#105010" stroke-width="1.5"/>
      <text x="148" y="124" text-anchor="middle" font-size="9" fill="white" font-family="Arial">G</text>
      <circle cx="100" cy="145" r="10" fill="#5050e0" stroke="#2020a0" stroke-width="1.5"/>
      <text x="100" y="149" text-anchor="middle" font-size="9" fill="white" font-family="Arial">U</text>
      <line x1="100" y1="155" x2="62" y2="155" stroke="#606060" stroke-width="2"/>
      <circle cx="52" cy="155" r="10" fill="#e0a020" stroke="#a06010" stroke-width="1.5"/>
      <text x="52" y="159" text-anchor="middle" font-size="9" fill="white" font-family="Arial">C</text>
    </svg>`),

    makeIcon('bi-004', 'RNA Strand (Curved)', 'Biologicals', ['RNA', 'tRNA', 'curved', 'secondary structure'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 170 Q20 100 60 60 Q100 20 140 50 Q170 80 160 130 Q150 165 120 175 Q90 185 70 170" fill="none" stroke="#e07020" stroke-width="5" stroke-linecap="round"/>
      <circle cx="42" cy="168" r="9" fill="#e05050" stroke="#a02020" stroke-width="1.5"/>
      <text x="42" y="172" text-anchor="middle" font-size="8" fill="white" font-family="Arial">A</text>
      <circle cx="62" cy="52" r="9" fill="#20a020" stroke="#105010" stroke-width="1.5"/>
      <text x="62" y="56" text-anchor="middle" font-size="8" fill="white" font-family="Arial">G</text>
      <circle cx="140" cy="52" r="9" fill="#5050e0" stroke="#2020a0" stroke-width="1.5"/>
      <text x="140" y="56" text-anchor="middle" font-size="8" fill="white" font-family="Arial">U</text>
      <circle cx="160" cy="130" r="9" fill="#e0a020" stroke="#a06010" stroke-width="1.5"/>
      <text x="160" y="134" text-anchor="middle" font-size="8" fill="white" font-family="Arial">C</text>
      <circle cx="70" cy="172" r="9" fill="#e05050" stroke="#a02020" stroke-width="1.5"/>
      <text x="70" y="176" text-anchor="middle" font-size="8" fill="white" font-family="Arial">A</text>
    </svg>`),

    makeIcon('bi-005', 'Protein Single Lobe', 'Biologicals', ['protein', 'single lobe', 'globular', 'structure'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 30 Q145 28 162 55 Q178 85 170 115 Q160 148 130 162 Q100 175 70 162 Q40 148 32 115 Q24 82 42 55 Q58 28 100 30Z" fill="#d8e8ff" stroke="#3060c0" stroke-width="2.5"/>
      <path d="M78 60 Q68 80 72 100 Q76 120 90 130" fill="none" stroke="#6090e0" stroke-width="2" stroke-dasharray="5,3"/>
      <path d="M122 60 Q132 80 128 100 Q124 120 110 130" fill="none" stroke="#6090e0" stroke-width="2" stroke-dasharray="5,3"/>
      <path d="M78 60 Q100 50 122 60" fill="none" stroke="#6090e0" stroke-width="2"/>
      <path d="M90 130 Q100 138 110 130" fill="none" stroke="#6090e0" stroke-width="2"/>
      <ellipse cx="100" cy="95" rx="18" ry="15" fill="#a0c0f0" opacity="0.5"/>
      <text x="100" y="178" text-anchor="middle" font-size="10" fill="#204080" font-family="Arial">Single-Lobe Protein</text>
    </svg>`),

    makeIcon('bi-006', 'Protein Multi Lobe', 'Biologicals', ['protein', 'multi lobe', 'quaternary', 'complex'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="75" cy="85" rx="42" ry="38" fill="#d8e8ff" stroke="#3060c0" stroke-width="2"/>
      <ellipse cx="125" cy="85" rx="42" ry="38" fill="#ffe0d8" stroke="#c04030" stroke-width="2"/>
      <ellipse cx="75" cy="130" rx="42" ry="38" fill="#d8ffe0" stroke="#20a040" stroke-width="2"/>
      <ellipse cx="125" cy="130" rx="42" ry="38" fill="#fff0d0" stroke="#c08020" stroke-width="2"/>
      <ellipse cx="100" cy="108" rx="25" ry="22" fill="#f0f0f0" stroke="#808080" stroke-width="1.5" opacity="0.7"/>
      <text x="75" y="88" text-anchor="middle" font-size="9" fill="#204080" font-family="Arial">α</text>
      <text x="125" y="88" text-anchor="middle" font-size="9" fill="#802010" font-family="Arial">β</text>
      <text x="75" y="133" text-anchor="middle" font-size="9" fill="#106030" font-family="Arial">γ</text>
      <text x="125" y="133" text-anchor="middle" font-size="9" fill="#806010" font-family="Arial">δ</text>
    </svg>`),

    makeIcon('bi-007', 'Magnesium Ion (Mg²⁺)', 'Biologicals', ['magnesium', 'Mg', 'ion', 'atom', 'cofactor'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="55" fill="#e8ffe8" stroke="#20a020" stroke-width="3"/>
      <circle cx="100" cy="100" r="42" fill="#d0f8d0" stroke="#20a020" stroke-width="2" opacity="0.6"/>
      <text x="100" y="95" text-anchor="middle" font-size="28" font-weight="bold" fill="#107010" font-family="Arial">Mg</text>
      <text x="100" y="118" text-anchor="middle" font-size="16" fill="#107010" font-family="Arial">²⁺</text>
      <text x="100" y="170" text-anchor="middle" font-size="10" fill="#107010" font-family="Arial">Magnesium (Z=12)</text>
    </svg>`),

    makeIcon('bi-008', 'Chloride Ion (Cl⁻)', 'Biologicals', ['chlorine', 'chloride', 'Cl', 'ion', 'atom'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="58" fill="#fff0e8" stroke="#e07020" stroke-width="3"/>
      <circle cx="100" cy="100" r="44" fill="#ffe8d8" stroke="#e07020" stroke-width="2" opacity="0.6"/>
      <text x="100" y="95" text-anchor="middle" font-size="28" font-weight="bold" fill="#a04010" font-family="Arial">Cl</text>
      <text x="100" y="118" text-anchor="middle" font-size="16" fill="#a04010" font-family="Arial">⁻</text>
      <text x="100" y="170" text-anchor="middle" font-size="10" fill="#a04010" font-family="Arial">Chloride (Z=17)</text>
    </svg>`),

    makeIcon('bi-009', 'Calcium Ion (Ca²⁺)', 'Biologicals', ['calcium', 'Ca', 'ion', 'atom', 'signaling'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="55" fill="#fff8e8" stroke="#c08020" stroke-width="3"/>
      <circle cx="100" cy="100" r="42" fill="#fff0d8" stroke="#c08020" stroke-width="2" opacity="0.6"/>
      <text x="100" y="95" text-anchor="middle" font-size="28" font-weight="bold" fill="#806010" font-family="Arial">Ca</text>
      <text x="100" y="118" text-anchor="middle" font-size="16" fill="#806010" font-family="Arial">²⁺</text>
      <text x="100" y="170" text-anchor="middle" font-size="10" fill="#806010" font-family="Arial">Calcium (Z=20)</text>
    </svg>`),

    makeIcon('bi-010', 'Sodium Ion (Na⁺)', 'Biologicals', ['sodium', 'Na', 'ion', 'atom', 'membrane potential'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="55" fill="#e8f0ff" stroke="#2050c0" stroke-width="3"/>
      <circle cx="100" cy="100" r="42" fill="#d8e8ff" stroke="#2050c0" stroke-width="2" opacity="0.6"/>
      <text x="100" y="95" text-anchor="middle" font-size="28" font-weight="bold" fill="#1030a0" font-family="Arial">Na</text>
      <text x="100" y="118" text-anchor="middle" font-size="16" fill="#1030a0" font-family="Arial">⁺</text>
      <text x="100" y="170" text-anchor="middle" font-size="10" fill="#1030a0" font-family="Arial">Sodium (Z=11)</text>
    </svg>`),

    makeIcon('bi-011', 'Water Molecule (H₂O)', 'Biologicals', ['water', 'H2O', 'molecule', 'solvent'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="32" fill="#c0d8f8" stroke="#3070d0" stroke-width="2.5"/>
      <circle cx="57" cy="68" r="22" fill="#e0eeff" stroke="#3070d0" stroke-width="2"/>
      <circle cx="143" cy="68" r="22" fill="#e0eeff" stroke="#3070d0" stroke-width="2"/>
      <text x="100" y="106" text-anchor="middle" font-size="14" font-weight="bold" fill="#2050a0" font-family="Arial">O</text>
      <text x="57" y="74" text-anchor="middle" font-size="14" font-weight="bold" fill="#204080" font-family="Arial">H</text>
      <text x="143" y="74" text-anchor="middle" font-size="14" font-weight="bold" fill="#204080" font-family="Arial">H</text>
      <line x1="78" y1="89" x2="90" y2="95" stroke="#3070d0" stroke-width="2"/>
      <line x1="122" y1="89" x2="110" y2="95" stroke="#3070d0" stroke-width="2"/>
      <text x="100" y="165" text-anchor="middle" font-size="12" fill="#204080" font-family="Arial">H₂O  (104.5°)</text>
    </svg>`),

    makeIcon('bi-012', 'Phosphate Group', 'Biologicals', ['phosphate', 'PO4', 'ATP', 'nucleotide'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="28" fill="#ffe0c0" stroke="#c06020" stroke-width="3"/>
      <text x="100" y="106" text-anchor="middle" font-size="16" font-weight="bold" fill="#803010" font-family="Arial">P</text>
      <circle cx="100" cy="48" r="18" fill="#ffd0b0" stroke="#c06020" stroke-width="2"/>
      <text x="100" y="54" text-anchor="middle" font-size="12" fill="#803010" font-family="Arial">O</text>
      <circle cx="148" cy="78" r="18" fill="#ffd0b0" stroke="#c06020" stroke-width="2"/>
      <text x="148" y="84" text-anchor="middle" font-size="12" fill="#803010" font-family="Arial">O</text>
      <circle cx="148" cy="122" r="18" fill="#ffd0b0" stroke="#c06020" stroke-width="2"/>
      <text x="148" y="128" text-anchor="middle" font-size="12" fill="#803010" font-family="Arial">O</text>
      <circle cx="52" cy="100" r="18" fill="#ffd0b0" stroke="#c06020" stroke-width="2"/>
      <text x="52" y="106" text-anchor="middle" font-size="12" fill="#803010" font-family="Arial">O</text>
      <line x1="100" y1="72" x2="100" y2="66" stroke="#c06020" stroke-width="2.5"/>
      <line x1="126" y1="86" x2="130" y2="83" stroke="#c06020" stroke-width="2.5"/>
      <line x1="126" y1="114" x2="130" y2="117" stroke="#c06020" stroke-width="2.5"/>
      <line x1="72" y1="100" x2="70" y2="100" stroke="#c06020" stroke-width="2.5"/>
      <text x="100" y="170" text-anchor="middle" font-size="10" fill="#803010" font-family="Arial">Phosphate (PO₄³⁻)</text>
    </svg>`),
];



// ── Bioinfo (Computational Biology) ──────────────────────────────────────────
const bioinfo: Icon[] = [
    makeIcon('bf-001', 'Sequence Alignment', 'Bioinfo', ['alignment', 'MSA', 'BLAST', 'sequence'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="25" width="180" height="22" rx="3" fill="#f0f4ff" stroke="#4060c0" stroke-width="1.5"/>
      <rect x="10" y="55" width="180" height="22" rx="3" fill="#f0fff4" stroke="#20a040" stroke-width="1.5"/>
      <rect x="10" y="85" width="180" height="22" rx="3" fill="#fff0f0" stroke="#c03030" stroke-width="1.5"/>
      <rect x="10" y="115" width="180" height="22" rx="3" fill="#fffbf0" stroke="#c08020" stroke-width="1.5"/>
      <rect x="12" y="27" width="18" height="18" rx="2" fill="#4060c0"/><text x="21" y="40" text-anchor="middle" font-size="10" fill="white" font-family="monospace">A</text>
      <rect x="32" y="27" width="18" height="18" rx="2" fill="#c03030"/><text x="41" y="40" text-anchor="middle" font-size="10" fill="white" font-family="monospace">T</text>
      <rect x="52" y="27" width="18" height="18" rx="2" fill="#20a040"/><text x="61" y="40" text-anchor="middle" font-size="10" fill="white" font-family="monospace">G</text>
      <rect x="72" y="27" width="18" height="18" rx="2" fill="#c08020"/><text x="81" y="40" text-anchor="middle" font-size="10" fill="white" font-family="monospace">C</text>
      <rect x="92" y="27" width="18" height="18" rx="2" fill="#4060c0"/><text x="101" y="40" text-anchor="middle" font-size="10" fill="white" font-family="monospace">A</text>
      <rect x="112" y="27" width="18" height="18" rx="2" fill="#20a040"/><text x="121" y="40" text-anchor="middle" font-size="10" fill="white" font-family="monospace">G</text>
      <rect x="12" y="57" width="18" height="18" rx="2" fill="#4060c0"/><text x="21" y="70" text-anchor="middle" font-size="10" fill="white" font-family="monospace">A</text>
      <rect x="32" y="57" width="18" height="18" rx="2" fill="#808080"/><text x="41" y="70" text-anchor="middle" font-size="10" fill="white" font-family="monospace">-</text>
      <rect x="52" y="57" width="18" height="18" rx="2" fill="#20a040"/><text x="61" y="70" text-anchor="middle" font-size="10" fill="white" font-family="monospace">G</text>
      <rect x="72" y="57" width="18" height="18" rx="2" fill="#c08020"/><text x="81" y="70" text-anchor="middle" font-size="10" fill="white" font-family="monospace">C</text>
      <rect x="92" y="57" width="18" height="18" rx="2" fill="#c03030"/><text x="101" y="70" text-anchor="middle" font-size="10" fill="white" font-family="monospace">T</text>
      <rect x="112" y="57" width="18" height="18" rx="2" fill="#20a040"/><text x="121" y="70" text-anchor="middle" font-size="10" fill="white" font-family="monospace">G</text>
      <text x="100" y="190" text-anchor="middle" font-size="9" fill="#404040" font-family="Arial">Sequence Alignment (MSA)</text>
    </svg>`),

    makeIcon('bf-002', 'Phylogenetic Tree', 'Bioinfo', ['phylogenetics', 'tree', 'evolution', 'cladogram'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="100" x2="75" y2="100" stroke="#2060a0" stroke-width="2.5"/>
      <line x1="75" y1="55" x2="75" y2="145" stroke="#2060a0" stroke-width="2.5"/>
      <line x1="75" y1="55" x2="130" y2="55" stroke="#2060a0" stroke-width="2.5"/>
      <line x1="130" y1="36" x2="130" y2="74" stroke="#2060a0" stroke-width="2.5"/>
      <line x1="130" y1="36" x2="175" y2="36" stroke="#2060a0" stroke-width="2.5"/>
      <line x1="130" y1="74" x2="175" y2="74" stroke="#2060a0" stroke-width="2.5"/>
      <line x1="75" y1="145" x2="130" y2="145" stroke="#2060a0" stroke-width="2.5"/>
      <line x1="130" y1="122" x2="130" y2="162" stroke="#2060a0" stroke-width="2.5"/>
      <line x1="130" y1="122" x2="175" y2="122" stroke="#2060a0" stroke-width="2.5"/>
      <line x1="130" y1="162" x2="175" y2="162" stroke="#2060a0" stroke-width="2.5"/>
      <circle cx="175" cy="36" r="6" fill="#e05050"/><text x="183" y="40" font-size="9" fill="#601010" font-family="Arial">Sp. A</text>
      <circle cx="175" cy="74" r="6" fill="#e07020"/><text x="183" y="78" font-size="9" fill="#603010" font-family="Arial">Sp. B</text>
      <circle cx="175" cy="122" r="6" fill="#20a060"/><text x="183" y="126" font-size="9" fill="#105030" font-family="Arial">Sp. C</text>
      <circle cx="175" cy="162" r="6" fill="#5050e0"/><text x="183" y="166" font-size="9" fill="#202080" font-family="Arial">Sp. D</text>
      <text x="100" y="193" text-anchor="middle" font-size="9" fill="#404040" font-family="Arial">Phylogenetic Tree</text>
    </svg>`),

    makeIcon('bf-003', 'Heatmap', 'Bioinfo', ['heatmap', 'expression', 'RNA-seq', 'clustering'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <text x="45" y="18" font-size="7" fill="#404040" font-family="Arial">S1   S2   S3   S4</text>
      <text x="12" y="38" font-size="7" fill="#404040" font-family="Arial">G1</text>
      <text x="12" y="58" font-size="7" fill="#404040" font-family="Arial">G2</text>
      <text x="12" y="78" font-size="7" fill="#404040" font-family="Arial">G3</text>
      <text x="12" y="98" font-size="7" fill="#404040" font-family="Arial">G4</text>
      <text x="12" y="118" font-size="7" fill="#404040" font-family="Arial">G5</text>
      <rect x="26" y="24" width="20" height="20" fill="#2040c0"/><rect x="50" y="24" width="20" height="20" fill="#4060e0"/>
      <rect x="74" y="24" width="20" height="20" fill="#e04040"/><rect x="98" y="24" width="20" height="20" fill="#f07070"/>
      <rect x="26" y="48" width="20" height="20" fill="#e06040"/><rect x="50" y="48" width="20" height="20" fill="#f09060"/>
      <rect x="74" y="48" width="20" height="20" fill="#2040c0"/><rect x="98" y="48" width="20" height="20" fill="#3050d0"/>
      <rect x="26" y="72" width="20" height="20" fill="#f0a0a0"/><rect x="50" y="72" width="20" height="20" fill="#e04040"/>
      <rect x="74" y="72" width="20" height="20" fill="#f8c0c0"/><rect x="98" y="72" width="20" height="20" fill="#2040c0"/>
      <rect x="26" y="96" width="20" height="20" fill="#6080e8"/><rect x="50" y="96" width="20" height="20" fill="#2040c0"/>
      <rect x="74" y="96" width="20" height="20" fill="#4060e0"/><rect x="98" y="96" width="20" height="20" fill="#e06040"/>
      <rect x="26" y="120" width="20" height="20" fill="#e04040"/><rect x="50" y="120" width="20" height="20" fill="#f07070"/>
      <rect x="74" y="120" width="20" height="20" fill="#2040c0"/><rect x="98" y="120" width="20" height="20" fill="#8090e0"/>
      <defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e04040"/><stop offset="50%" stop-color="#ffffff"/><stop offset="100%" stop-color="#2040c0"/></linearGradient></defs>
      <rect x="130" y="24" width="12" height="116" fill="url(#hg)" stroke="#cccccc" stroke-width="1"/>
      <text x="148" y="28" font-size="7" fill="#e04040" font-family="Arial">High</text>
      <text x="148" y="85" font-size="7" fill="#808080" font-family="Arial">Mid</text>
      <text x="148" y="142" font-size="7" fill="#2040c0" font-family="Arial">Low</text>
      <text x="80" y="175" text-anchor="middle" font-size="9" fill="#404040" font-family="Arial">Expression Heatmap</text>
    </svg>`),

    makeIcon('bf-004', 'Volcano Plot', 'Bioinfo', ['volcano', 'DEG', 'p-value', 'fold change'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="15" y1="170" x2="185" y2="170" stroke="#808080" stroke-width="1.5"/>
      <line x1="15" y1="170" x2="15" y2="15" stroke="#808080" stroke-width="1.5"/>
      <line x1="100" y1="170" x2="100" y2="15" stroke="#d0d0d0" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="15" y1="100" x2="185" y2="100" stroke="#d0d0d0" stroke-width="1" stroke-dasharray="4,3"/>
      <circle cx="40" cy="130" r="3" fill="#808080" opacity="0.5"/><circle cx="55" cy="120" r="3" fill="#808080" opacity="0.5"/>
      <circle cx="70" cy="140" r="3" fill="#808080" opacity="0.5"/><circle cx="85" cy="125" r="3" fill="#808080" opacity="0.5"/>
      <circle cx="115" cy="130" r="3" fill="#808080" opacity="0.5"/><circle cx="130" cy="115" r="3" fill="#808080" opacity="0.5"/>
      <circle cx="35" cy="65" r="4" fill="#4060e0"/><circle cx="22" cy="40" r="4.5" fill="#2040c0"/>
      <circle cx="42" cy="50" r="4" fill="#4060e0"/><circle cx="30" cy="72" r="3.5" fill="#6080e0"/>
      <circle cx="165" cy="50" r="4.5" fill="#e04040"/><circle cx="175" cy="35" r="5" fill="#c02020"/>
      <circle cx="155" cy="65" r="4" fill="#e04040"/><circle cx="170" cy="75" r="3.5" fill="#f06060"/>
      <text x="15" y="12" font-size="7" fill="#606060" font-family="Arial">-log₁₀(p)</text>
      <text x="160" y="183" font-size="7" fill="#606060" font-family="Arial">log₂FC</text>
      <text x="100" y="195" text-anchor="middle" font-size="9" fill="#404040" font-family="Arial">Volcano Plot</text>
    </svg>`),

    makeIcon('bf-005', 'UMAP Clustering', 'Bioinfo', ['UMAP', 'tSNE', 'single cell', 'scRNA-seq', 'clustering'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="75" rx="32" ry="22" fill="#4080e0" opacity="0.12" stroke="#4080e0" stroke-width="1.5"/>
      <ellipse cx="148" cy="78" rx="26" ry="20" fill="#e04080" opacity="0.12" stroke="#e04080" stroke-width="1.5"/>
      <ellipse cx="100" cy="148" rx="28" ry="20" fill="#20c060" opacity="0.12" stroke="#20c060" stroke-width="1.5"/>
      <ellipse cx="162" cy="145" rx="22" ry="16" fill="#e0a020" opacity="0.12" stroke="#e0a020" stroke-width="1.5"/>
      <circle cx="50" cy="70" r="3.5" fill="#2060c0"/><circle cx="62" cy="78" r="3.5" fill="#2060c0"/>
      <circle cx="55" cy="62" r="3.5" fill="#3070d0"/><circle cx="68" cy="74" r="3.5" fill="#2060c0"/>
      <circle cx="48" cy="82" r="3.5" fill="#3070d0"/>
      <circle cx="142" cy="72" r="3.5" fill="#c02060"/><circle cx="155" cy="80" r="3.5" fill="#c02060"/>
      <circle cx="148" cy="65" r="3.5" fill="#d03070"/><circle cx="135" cy="83" r="3.5" fill="#c02060"/>
      <circle cx="96" cy="143" r="3.5" fill="#10a040"/><circle cx="108" cy="150" r="3.5" fill="#10a040"/>
      <circle cx="100" cy="135" r="3.5" fill="#20b050"/><circle cx="94" cy="158" r="3.5" fill="#10a040"/>
      <circle cx="158" cy="138" r="3.5" fill="#c08010"/><circle cx="170" cy="147" r="3.5" fill="#c08010"/>
      <circle cx="162" cy="130" r="3.5" fill="#d09020"/><circle cx="156" cy="155" r="3.5" fill="#c08010"/>
      <text x="38" y="102" font-size="7" fill="#2060c0" font-family="Arial">C1</text>
      <text x="130" y="102" font-size="7" fill="#c02060" font-family="Arial">C2</text>
      <text x="82" y="178" font-size="7" fill="#10a040" font-family="Arial">C3</text>
      <text x="152" y="170" font-size="7" fill="#c08010" font-family="Arial">C4</text>
      <text x="100" y="196" text-anchor="middle" font-size="9" fill="#404040" font-family="Arial">UMAP Clustering</text>
    </svg>`),

    makeIcon('bf-006', 'NGS Pipeline', 'Bioinfo', ['pipeline', 'NGS', 'workflow', 'bioinformatics'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="10" width="80" height="22" rx="8" fill="#e0f2ff" stroke="#0ea5e9" stroke-width="2"/>
      <text x="100" y="25" text-anchor="middle" font-size="9" fill="#0369a1" font-family="Arial" font-weight="600">Raw Reads</text>
      <line x1="100" y1="32" x2="100" y2="44" stroke="#0ea5e9" stroke-width="2"/>
      <polygon points="100,44 95,39 105,39" fill="#0ea5e9"/>
      <rect x="60" y="44" width="80" height="22" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
      <text x="100" y="59" text-anchor="middle" font-size="9" fill="#15803d" font-family="Arial" font-weight="600">QC / Trim</text>
      <line x1="100" y1="66" x2="100" y2="78" stroke="#22c55e" stroke-width="2"/>
      <polygon points="100,78 95,73 105,73" fill="#22c55e"/>
      <rect x="60" y="78" width="80" height="22" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="2"/>
      <text x="100" y="93" text-anchor="middle" font-size="9" fill="#92400e" font-family="Arial" font-weight="600">Alignment</text>
      <line x1="100" y1="100" x2="100" y2="112" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="100,112 95,107 105,107" fill="#f59e0b"/>
      <rect x="60" y="112" width="80" height="22" rx="8" fill="#fdf4ff" stroke="#d946ef" stroke-width="2"/>
      <text x="100" y="127" text-anchor="middle" font-size="9" fill="#86198f" font-family="Arial" font-weight="600">Variant Call</text>
      <line x1="100" y1="134" x2="100" y2="146" stroke="#d946ef" stroke-width="2"/>
      <polygon points="100,146 95,141 105,141" fill="#d946ef"/>
      <rect x="60" y="146" width="80" height="22" rx="8" fill="#fff1f2" stroke="#ef4444" stroke-width="2"/>
      <text x="100" y="161" text-anchor="middle" font-size="9" fill="#b91c1c" font-family="Arial" font-weight="600">Annotation</text>
      <text x="100" y="192" text-anchor="middle" font-size="9" fill="#404040" font-family="Arial">NGS Analysis Pipeline</text>
    </svg>`),

    makeIcon('bf-007', 'Protein Interaction Network', 'Bioinfo', ['network', 'PPI', 'STRING', 'graph'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="100" y1="80" x2="55" y2="52" stroke="#9090c0" stroke-width="1.5"/>
      <line x1="100" y1="80" x2="148" y2="52" stroke="#9090c0" stroke-width="1.5"/>
      <line x1="100" y1="80" x2="100" y2="138" stroke="#9090c0" stroke-width="1.5"/>
      <line x1="100" y1="80" x2="52" y2="118" stroke="#9090c0" stroke-width="1.5"/>
      <line x1="100" y1="80" x2="150" y2="118" stroke="#9090c0" stroke-width="1.5"/>
      <line x1="55" y1="52" x2="28" y2="85" stroke="#9090c0" stroke-width="1.5"/>
      <line x1="55" y1="52" x2="20" y2="38" stroke="#9090c0" stroke-width="1.5"/>
      <line x1="148" y1="52" x2="175" y2="32" stroke="#9090c0" stroke-width="1.5"/>
      <line x1="148" y1="52" x2="178" y2="72" stroke="#9090c0" stroke-width="1.5"/>
      <line x1="100" y1="138" x2="80" y2="168" stroke="#9090c0" stroke-width="1.5"/>
      <line x1="100" y1="138" x2="125" y2="165" stroke="#9090c0" stroke-width="1.5"/>
      <circle cx="100" cy="80" r="14" fill="#4060e0" stroke="#2040c0" stroke-width="2"/>
      <text x="100" y="84" text-anchor="middle" font-size="8" fill="white" font-family="Arial" font-weight="700">Hub</text>
      <circle cx="55" cy="52" r="10" fill="#20a060" stroke="#108040" stroke-width="1.5"/>
      <circle cx="148" cy="52" r="10" fill="#e04060" stroke="#c02040" stroke-width="1.5"/>
      <circle cx="100" cy="138" r="10" fill="#e09020" stroke="#c07010" stroke-width="1.5"/>
      <circle cx="52" cy="118" r="8" fill="#8050c0" stroke="#6030a0" stroke-width="1.5"/>
      <circle cx="150" cy="118" r="8" fill="#20a0c0" stroke="#108090" stroke-width="1.5"/>
      <circle cx="28" cy="85" r="6" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/>
      <circle cx="20" cy="38" r="6" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/>
      <circle cx="175" cy="32" r="6" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/>
      <circle cx="178" cy="72" r="6" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/>
      <circle cx="80" cy="168" r="6" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/>
      <circle cx="125" cy="165" r="6" fill="#c0c0c0" stroke="#808080" stroke-width="1.5"/>
      <text x="100" y="193" text-anchor="middle" font-size="9" fill="#404040" font-family="Arial">Protein Interaction Network</text>
    </svg>`),

    makeIcon('bf-008', 'Gene Ontology Tree', 'Bioinfo', ['GO', 'gene ontology', 'enrichment', 'terms'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="32" rx="60" ry="16" fill="#e0f2ff" stroke="#0ea5e9" stroke-width="2"/>
      <text x="100" y="36" text-anchor="middle" font-size="9" fill="#0369a1" font-family="Arial" font-weight="700">Biological Process</text>
      <line x1="65" y1="46" x2="45" y2="76" stroke="#0ea5e9" stroke-width="1.5"/>
      <line x1="100" y1="48" x2="100" y2="76" stroke="#0ea5e9" stroke-width="1.5"/>
      <line x1="135" y1="46" x2="155" y2="76" stroke="#0ea5e9" stroke-width="1.5"/>
      <ellipse cx="45" cy="88" rx="36" ry="14" fill="#f0fdf4" stroke="#22c55e" stroke-width="2"/>
      <text x="45" y="92" text-anchor="middle" font-size="7.5" fill="#15803d" font-family="Arial">Cell Division</text>
      <ellipse cx="100" cy="88" rx="36" ry="14" fill="#fffbeb" stroke="#f59e0b" stroke-width="2"/>
      <text x="100" y="92" text-anchor="middle" font-size="7.5" fill="#92400e" font-family="Arial">Metabolism</text>
      <ellipse cx="155" cy="88" rx="36" ry="14" fill="#fdf4ff" stroke="#d946ef" stroke-width="2"/>
      <text x="155" y="92" text-anchor="middle" font-size="7.5" fill="#86198f" font-family="Arial">Signaling</text>
      <line x1="30" y1="102" x2="22" y2="128" stroke="#22c55e" stroke-width="1.5"/>
      <line x1="60" y1="102" x2="68" y2="128" stroke="#22c55e" stroke-width="1.5"/>
      <ellipse cx="22" cy="140" rx="20" ry="12" fill="#e8f8f0" stroke="#22c55e" stroke-width="1.5"/>
      <text x="22" y="144" text-anchor="middle" font-size="6.5" fill="#106030" font-family="Arial">Mitosis</text>
      <ellipse cx="68" cy="140" rx="22" ry="12" fill="#e8f8f0" stroke="#22c55e" stroke-width="1.5"/>
      <text x="68" y="144" text-anchor="middle" font-size="6.5" fill="#106030" font-family="Arial">Meiosis</text>
      <text x="100" y="188" text-anchor="middle" font-size="9" fill="#404040" font-family="Arial">Gene Ontology (GO)</text>
    </svg>`),

    makeIcon('bf-009', 'CRISPR Cas9', 'Bioinfo', ['CRISPR', 'Cas9', 'gRNA', 'genome editing'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="58" width="120" height="14" rx="3" fill="#d0e8ff" stroke="#3060c0" stroke-width="1.5"/>
      <rect x="10" y="78" width="120" height="14" rx="3" fill="#d0e8ff" stroke="#3060c0" stroke-width="1.5"/>
      <text x="70" y="69" text-anchor="middle" font-size="7" fill="#2040a0" font-family="monospace">5'-ATGCCGTATGCG-3'</text>
      <text x="70" y="89" text-anchor="middle" font-size="7" fill="#2040a0" font-family="monospace">3'-TACGGCATACGC-5'</text>
      <rect x="10" y="36" width="74" height="14" rx="3" fill="#ffe0d0" stroke="#c06030" stroke-width="2"/>
      <text x="47" y="47" text-anchor="middle" font-size="7" fill="#803010" font-family="monospace" font-weight="bold">gRNA: AUGCCGUAUG</text>
      <text x="60" y="32" text-anchor="middle" font-size="8" fill="#803010" font-family="Arial">PAM: NGG ↓</text>
      <line x1="84" y1="43" x2="90" y2="58" stroke="#c06030" stroke-width="1.5"/>
      <ellipse cx="158" cy="85" rx="30" ry="38" fill="#e8e0f8" stroke="#6040c0" stroke-width="2"/>
      <text x="158" y="82" text-anchor="middle" font-size="8" fill="#4020a0" font-family="Arial" font-weight="700">Cas9</text>
      <text x="158" y="95" text-anchor="middle" font-size="11" fill="#4020a0" font-family="Arial">✂</text>
      <line x1="130" y1="72" x2="135" y2="67" stroke="#6040c0" stroke-width="1.5"/>
      <text x="100" y="155" text-anchor="middle" font-size="9" fill="#404040" font-family="Arial">CRISPR/Cas9</text>
    </svg>`),

    makeIcon('bf-010', 'PCA Plot', 'Bioinfo', ['PCA', 'principal component', 'variance', 'multivariate'],
        `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="170" x2="185" y2="170" stroke="#606060" stroke-width="1.5"/>
      <line x1="20" y1="170" x2="20" y2="15" stroke="#606060" stroke-width="1.5"/>
      <ellipse cx="70" cy="110" rx="35" ry="20" fill="#4060e0" opacity="0.2" stroke="#4060e0" stroke-width="1.5" transform="rotate(-20,70,110)"/>
      <ellipse cx="142" cy="68" rx="30" ry="15" fill="#e04040" opacity="0.2" stroke="#e04040" stroke-width="1.5" transform="rotate(15,142,68)"/>
      <circle cx="60" cy="105" r="3.5" fill="#2040c0"/><circle cx="72" cy="98" r="3.5" fill="#2040c0"/>
      <circle cx="65" cy="118" r="3.5" fill="#3050d0"/><circle cx="80" cy="108" r="3.5" fill="#2040c0"/>
      <circle cx="55" cy="115" r="3.5" fill="#3050d0"/>
      <circle cx="135" cy="65" r="3.5" fill="#c02020"/><circle cx="148" cy="72" r="3.5" fill="#c02020"/>
      <circle cx="140" cy="58" r="3.5" fill="#d03030"/><circle cx="128" cy="75" r="3.5" fill="#c02020"/>
      <text x="20" y="12" font-size="7" fill="#606060" font-family="Arial">PC2 (18%)</text>
      <text x="148" y="183" font-size="7" fill="#606060" font-family="Arial">PC1 (42%)</text>
      <text x="40" y="138" font-size="7" fill="#2040c0" font-family="Arial">Group A</text>
      <text x="118" y="50" font-size="7" fill="#c02020" font-family="Arial">Group B</text>
      <text x="100" y="196" text-anchor="middle" font-size="9" fill="#404040" font-family="Arial">PCA Plot</text>
    </svg>`),
];

export const BUILT_IN_ICONS: Icon[] = [
    ...cellBiology,
    ...microbiology,
    ...labEquipment,
    ...arrows,
    ...concentricShapes,
    ...neuroscience,
    ...plantBiology,
    ...biochemistry,
    ...drosophila,
    ...mosquito,
    ...biologicals,
    ...bioinfo,
];

