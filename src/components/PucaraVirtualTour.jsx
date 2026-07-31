import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import { 
    Compass, 
    ExternalLink, 
    Play, 
    Pause, 
    Volume2, 
    VolumeX, 
    Film,
    Smartphone,
    Sparkles,
    Video
} from 'lucide-react';

// Local Pucará image thumbnails
import kalasayaImg from '../assets/image/map/kalasaya.png';
import penonImg from '../assets/image/map/penon.png';
import temploImg from '../assets/image/map/templo.png';
import plazaImg from '../assets/image/map/plaza.png';
import museoImg from '../assets/image/map/museo.png';

const PucaraVirtualTour = () => {
    const tour360Url = "https://visitavirtual.cultura.pe/recorridos/MLP/museo-litico-pukara/index.html";
    const [activeTab, setActiveTab] = useState('doc'); // 'doc', 'reels', 'virtual'

    // 3 Documentales Horizontales (16:9) de public/videos
    const docList = [
        {
            id: 'pucara-tour',
            title: '1. Documental Turístico Pucará 365',
            src: '/videos/pucara-tour.mp4',
            duration: '0:55 min',
            desc: 'Recorrido cinematográfico completo por los atractivos principales, templos y la mística de Pucará.',
            thumbnail: temploImg
        },
        {
            id: 'pucara-artesanos',
            title: '2. Taller de Alfarería Tradicional y Toritos',
            src: '/videos/pucara-artesanos.mp4',
            duration: '1:12 min',
            desc: 'La herencia alfarera en acción: manos de maestros moldeando el barro rojo sagrado para crear Toritos.',
            thumbnail: plazaImg
        },
        {
            id: 'pucara-alrededores',
            title: '3. Paisajes Aéreos y Peñón de Pucará',
            src: '/videos/pucara-alrededores.mp4',
            duration: '0:14 min',
            desc: 'Vistas aéreas y panorámicas del gran Peñón de Pucará y los campos fértiles de Lampa y Puno.',
            thumbnail: penonImg
        }
    ];

    // 4 Reels / Shorts Verticales (9:16) de public/videos
    const reelList = [
        {
            id: 'reel-1',
            title: '4. Vivencia y Tradición en Pucará',
            src: '/videos/WhatsApp Video 2026-07-22 at 3.31.35 PM.mp4',
            tag: '#TurismoPucara',
            thumbnail: kalasayaImg
        },
        {
            id: 'reel-2',
            title: '5. Arte Alfarero del Torito',
            src: '/videos/WhatsApp Video 2026-07-22 at 3.31.36 PM.mp4',
            tag: '#AlfareriaAncestral',
            thumbnail: plazaImg
        },
        {
            id: 'reel-3',
            title: '6. Mística en el Templo Kalasaya',
            src: '/videos/WhatsApp Video 2026-07-22 at 3.31.37 PM.mp4',
            tag: '#Kalasaya200aC',
            thumbnail: museoImg
        },
        {
            id: 'reel-4',
            title: '7. Ruta Cultural Pucará - Lampa',
            src: '/videos/WhatsApp Video 2026-07-22 at 3.31.37 PM (1).mp4',
            tag: '#PunoMagico',
            thumbnail: temploImg
        }
    ];

    const [selectedDoc, setSelectedDoc] = useState(docList[0]);
    const docVideoRef = useRef(null);

    const handleSelectDoc = (video) => {
        setSelectedDoc(video);
        if (docVideoRef.current) {
            docVideoRef.current.src = video.src;
            docVideoRef.current.play();
        }
    };

    return (
        <section id="pucara-tour360" className="section bg-blue-base" style={{ position: 'relative', padding: '6.5rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    {/* Counter Badge */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.45rem 1.25rem',
                        borderRadius: '30px',
                        background: 'rgba(184, 92, 56, 0.12)',
                        border: '1px solid rgba(184, 92, 56, 0.3)',
                        color: 'var(--terracotta)',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        marginBottom: '1rem'
                    }}>
                        <Video size={16} /> 7 Videos Locales Incluidos (3 Documentales HD + 4 Reels Verticals)
                    </div>

                    <h2 className="bold-title">Videoteca & Tour Virtual 360° de Pucará</h2>
                    <div style={{ height: '4px', background: 'var(--terracotta)', width: '80px', margin: '0 auto 1.5rem auto', borderRadius: '2px' }} />
                    <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Explora la colección completa de los 7 videos grabados en Pucará (3 documentales panorámicos y 4 reels verticales) junto con el recorrido 360° interactivo.
                    </p>
                </div>

                {/* Tab selector buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setActiveTab('doc')}
                        className="btn"
                        style={{
                            backgroundColor: activeTab === 'doc' ? 'var(--terracotta)' : 'white',
                            color: activeTab === 'doc' ? 'white' : 'var(--primary)',
                            border: '1px solid rgba(184, 92, 56, 0.2)',
                            padding: '0.85rem 1.8rem',
                            fontSize: '0.92rem'
                        }}
                    >
                        <Film size={18} /> 3 Documentales (16:9)
                    </button>
                    <button
                        onClick={() => setActiveTab('reels')}
                        className="btn"
                        style={{
                            backgroundColor: activeTab === 'reels' ? 'var(--terracotta)' : 'white',
                            color: activeTab === 'reels' ? 'white' : 'var(--primary)',
                            border: '1px solid rgba(184, 92, 56, 0.2)',
                            padding: '0.85rem 1.8rem',
                            fontSize: '0.92rem'
                        }}
                    >
                        <Smartphone size={18} /> 4 Reels Verticals (9:16)
                    </button>
                    <button
                        onClick={() => setActiveTab('virtual')}
                        className="btn"
                        style={{
                            backgroundColor: activeTab === 'virtual' ? 'var(--terracotta)' : 'white',
                            color: activeTab === 'virtual' ? 'white' : 'var(--primary)',
                            border: '1px solid rgba(184, 92, 56, 0.2)',
                            padding: '0.85rem 1.8rem',
                            fontSize: '0.92rem'
                        }}
                    >
                        <Compass size={18} /> Tour Virtual 360°
                    </button>
                </div>

                {/* Tab Content Rendering */}
                <AnimatePresence mode="wait">
                    {activeTab === 'doc' && (
                        <motion.div
                            key="doc-tab"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
                                gap: '2rem',
                                background: 'white',
                                borderRadius: '24px',
                                padding: '1.5rem',
                                boxShadow: 'var(--shadow-lg)',
                                border: '1px solid rgba(184, 92, 56, 0.15)'
                            }}
                            className="doc-tab-grid"
                        >
                            {/* Horizontal HTML5 Video Player */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{
                                    position: 'relative',
                                    paddingTop: '56.25%',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    backgroundColor: '#0B2240',
                                    boxShadow: 'var(--shadow-md)'
                                }}>
                                    <video
                                        ref={docVideoRef}
                                        src={selectedDoc.src}
                                        controls
                                        playsInline
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>

                                <div>
                                    <span style={{ background: 'rgba(184, 92, 56, 0.12)', color: 'var(--terracotta)', padding: '0.25rem 0.7rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                                        {selectedDoc.duration}
                                    </span>
                                    <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', fontWeight: 800, margin: '0.4rem 0', fontFamily: 'var(--font-heading)' }}>
                                        {selectedDoc.title}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                        {selectedDoc.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Playlist selector */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <h4 style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Documentales Disponibles (3)
                                </h4>
                                {docList.map(video => (
                                    <div
                                        key={video.id}
                                        onClick={() => handleSelectDoc(video)}
                                        style={{
                                            display: 'flex',
                                            gap: '0.85rem',
                                            padding: '0.75rem',
                                            borderRadius: '12px',
                                            background: selectedDoc.id === video.id ? 'rgba(184, 92, 56, 0.08)' : 'transparent',
                                            border: selectedDoc.id === video.id ? '1px solid var(--terracotta)' : '1px solid rgba(11, 34, 64, 0.08)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <img src={video.thumbnail} alt={video.title} style={{ width: '84px', height: '60px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.25, marginBottom: '0.2rem' }}>
                                                {video.title}
                                            </span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--terracotta)', fontWeight: 700 }}>
                                                {video.duration}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'reels' && (
                        <motion.div
                            key="reels-tab"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                                gap: '1.5rem'
                            }}
                        >
                            {reelList.map((reel) => (
                                <div
                                    key={reel.id}
                                    style={{
                                        background: '#0B2240',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        boxShadow: 'var(--shadow-md)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '1px solid rgba(197, 155, 39, 0.3)'
                                    }}
                                >
                                    <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
                                        <video
                                            src={reel.src}
                                            controls
                                            playsInline
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ padding: '1rem', color: 'white', background: 'rgba(11, 34, 64, 0.95)' }}>
                                        <span style={{ color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 800 }}>
                                            {reel.tag}
                                        </span>
                                        <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: 700, marginTop: '0.2rem' }}>
                                            {reel.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === 'virtual' && (
                        <motion.div
                            key="virtual-tab"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                background: 'white',
                                borderRadius: '24px',
                                padding: '2.5rem',
                                boxShadow: 'var(--shadow-lg)',
                                border: '1px solid rgba(184, 92, 56, 0.15)',
                                display: 'grid',
                                gridTemplateColumns: '1.2fr 1fr',
                                gap: '3rem',
                                alignItems: 'center'
                            }}
                            className="virtual-tour-grid"
                        >
                            {/* Left Side: Immersive Preview */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <span style={{
                                        background: 'rgba(184, 92, 56, 0.12)',
                                        color: 'var(--terracotta)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        Experiencia Inmersiva
                                    </span>
                                    <h3 style={{ fontSize: '1.85rem', color: 'var(--primary)', fontWeight: 800, margin: '0.5rem 0 0.8rem 0', fontFamily: 'var(--font-heading)' }}>
                                        Museo Lítico de Pucará — Recorrido 360°
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
                                        Explora las salas sagradas del museo oficial del Ministerio de Cultura de manera interactiva. Por razones de seguridad del portal oficial, la experiencia completa en pantalla completa está optimizada para ser explorada directamente o escaneada en tu móvil.
                                    </p>
                                </div>

                                <div style={{
                                    position: 'relative',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    height: '280px',
                                    boxShadow: 'var(--shadow-md)',
                                    border: '1px solid rgba(15, 44, 89, 0.1)'
                                }}>
                                    <img
                                        src={museoImg}
                                        alt="Museo Lítico de Pucará"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        padding: '2rem',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: '50%',
                                            backgroundColor: 'var(--terracotta)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '1rem',
                                            boxShadow: '0 0 20px rgba(184, 92, 56, 0.4)'
                                        }} className="pulse-slow">
                                            <Compass size={32} className="float-animation" />
                                        </div>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                                            RECORRIDO INTERACTIVO 360°
                                        </span>
                                        <a
                                            href={tour360Url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-accent"
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                                        >
                                            Abrir Recorrido 360° <ExternalLink size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: QR Scanner Box */}
                            <div style={{
                                background: 'var(--bg-body)',
                                border: '1px solid rgba(15, 44, 89, 0.08)',
                                borderRadius: '24px',
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1.5rem',
                                textAlign: 'center'
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                                    <Smartphone size={28} style={{ color: 'var(--terracotta)' }} />
                                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)', margin: '0.25rem 0 0 0' }}>
                                        Escanea en tu Celular
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                                        Usa la cámara de tu móvil para escanear el QR y navegar de forma inmersiva con el giroscopio.
                                    </p>
                                </div>

                                {/* QR Canvas wrapped in scanning brackets */}
                                <div style={{ position: 'relative', padding: '1rem', background: 'white', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                                    {/* Scanning frame brackets (SVG corners) */}
                                    <div style={{ position: 'absolute', top: '2px', left: '2px', width: '12px', height: '12px', borderTop: '3px solid var(--terracotta)', borderLeft: '3px solid var(--terracotta)' }} />
                                    <div style={{ position: 'absolute', top: '2px', right: '2px', width: '12px', height: '12px', borderTop: '3px solid var(--terracotta)', borderRight: '3px solid var(--terracotta)' }} />
                                    <div style={{ position: 'absolute', bottom: '2px', left: '2px', width: '12px', height: '12px', borderBottom: '3px solid var(--terracotta)', borderLeft: '3px solid var(--terracotta)' }} />
                                    <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '12px', height: '12px', borderBottom: '3px solid var(--terracotta)', borderRight: '3px solid var(--terracotta)' }} />
                                    
                                    <QRCodeCanvas
                                        value={tour360Url}
                                        size={160}
                                        level="H"
                                        includeMargin={false}
                                        style={{ display: 'block' }}
                                    />
                                </div>

                                <span style={{ fontSize: '0.78rem', color: 'var(--terracotta)', fontWeight: 'bold', letterSpacing: '0.05em' }} className="pulse-slow">
                                    🔴 ESCANEAR AHORA
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .doc-tab-grid { grid-template-columns: 1fr !important; }
                    .virtual-tour-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
                }
            `}</style>

        </section>
    );
};

export default PucaraVirtualTour;
