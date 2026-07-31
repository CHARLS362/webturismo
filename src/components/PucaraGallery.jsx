import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Sparkles, Maximize2, Gift, Lock, Key, Award } from 'lucide-react';

// Local Pucará assets
import kalasayaImg from '../assets/image/map/kalasaya.png';
import penonImg from '../assets/image/map/penon.png';
import temploImg from '../assets/image/map/templo.png';
import plazaImg from '../assets/image/map/plaza.png';
import museoImg from '../assets/image/map/museo.png';

const treasureWaypoints = [
    {
        id: 1,
        step: "Tesoro I",
        title: "Templo Colonial Santa Isabel",
        coords: { x: '18%', y: '65%' },
        src: temploImg,
        secret: "Piedra Roja Barroco-Andina tallada por manos jesuitas sobre muros incaicos.",
        tag: "Patrimonio Barroco"
    },
    {
        id: 2,
        step: "Tesoro II",
        title: "Plaza Bolívar & Talleres Alfareros",
        coords: { x: '35%', y: '35%' },
        src: plazaImg,
        secret: "Cuna artesanal donde se moldea el célebre Torito de Pucará en barro rojo sagrado.",
        tag: "Herencia Viva"
    },
    {
        id: 3,
        step: "Tesoro III",
        title: "Museo Lítico de Pukara",
        coords: { x: '52%', y: '60%' },
        src: museoImg,
        secret: "La famosa estela del Hatun Ñakaj (El Degollador) y monolitos grabados prehispánicos.",
        tag: "Arqueología 200 a.C."
    },
    {
        id: 4,
        step: "Tesoro IV",
        title: "Complejo Arqueológico Kalasaya",
        coords: { x: '72%', y: '30%' },
        src: kalasayaImg,
        secret: "Pirámide escalonada ceremonial y patio hundido sagrado del agua y la fertilidad.",
        tag: "Centro Ceremonial"
    },
    {
        id: 5,
        step: "Tesoro V",
        title: "El Peñón Mirador del Altiplano",
        coords: { x: '88%', y: '50%' },
        src: penonImg,
        secret: "Formación rocosa natural a 4,050 msnm con vistas panorámicas de 360° sobre Puno.",
        tag: "Mirador Ancestral"
    }
];

const PucaraGallery = () => {
    const [selectedPoint, setSelectedPoint] = useState(treasureWaypoints[0]);
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    return (
        <section id="pucara-galeria" className="section bg-blue-contrast" style={{ position: 'relative', padding: '6.5rem 0', overflow: 'hidden' }}>
            {/* Background Map Grid Decor */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(197, 155, 39, 0.08) 1px, transparent 0)',
                backgroundSize: '36px 36px',
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <span className="script-subtitle">Ruta del Tesoro Cultural...</span>
                    <h2 className="bold-title">Galería Inmersiva "El Mapa del Tesoro Pucará"</h2>
                    <div style={{ height: '4px', background: 'var(--bronze-gold)', width: '80px', margin: '0 auto 1.5rem auto', borderRadius: '2px' }} />
                    <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Navega por la ruta del tesoro siguiendo la línea del mapa ancestral. Haz clic en cada hito para desvelar las reliquias arqueológicas y culturales de Pucará, Lampa y Puno.
                    </p>
                </div>

                {/* Interactive Treasure Map Canvas Container */}
                <div style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, #163660 0%, #0B2240 100%)',
                    borderRadius: '32px',
                    padding: '2.5rem 1.5rem',
                    boxShadow: 'var(--shadow-premium)',
                    border: '2px solid rgba(197, 155, 39, 0.35)',
                    marginBottom: '3rem'
                }}>
                    {/* Compass Badge Decor */}
                    <div style={{
                        position: 'absolute',
                        top: '1.5rem',
                        left: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        color: 'var(--accent)',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        background: 'rgba(11, 34, 64, 0.7)',
                        padding: '0.4rem 1rem',
                        borderRadius: '30px',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(197, 155, 39, 0.3)'
                    }}>
                        <Compass size={18} className="spin-slow" /> Mapa de Expedición Altiplánica
                    </div>

                    {/* Treasure Map Trail SVG dotted curve line */}
                    <div style={{ position: 'relative', minHeight: '280px', width: '100%', display: 'flex', alignItems: 'center' }}>
                        <svg
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                            viewBox="0 0 1000 280"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M 180 180 Q 350 90, 520 160 T 880 140"
                                fill="none"
                                stroke="var(--accent)"
                                strokeWidth="4"
                                strokeDasharray="10, 12"
                                opacity="0.6"
                            />
                        </svg>

                        {/* Map Waypoints / Treasure Points */}
                        {treasureWaypoints.map((wpt) => {
                            const isActive = selectedPoint.id === wpt.id;
                            return (
                                <motion.div
                                    key={wpt.id}
                                    style={{
                                        position: 'absolute',
                                        left: wpt.coords.x,
                                        top: wpt.coords.y,
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: isActive ? 20 : 10,
                                        cursor: 'pointer'
                                    }}
                                    whileHover={{ scale: 1.15 }}
                                    onClick={() => setSelectedPoint(wpt)}
                                >
                                    {/* Pulse ring for active point */}
                                    {isActive && (
                                        <motion.div
                                            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            style={{
                                                position: 'absolute',
                                                inset: '-10px',
                                                borderRadius: '50%',
                                                background: 'var(--accent)',
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    )}

                                    <div style={{
                                        width: isActive ? '58px' : '44px',
                                        height: isActive ? '58px' : '44px',
                                        borderRadius: '50%',
                                        background: isActive ? 'var(--accent)' : 'var(--terracotta)',
                                        color: isActive ? 'var(--primary)' : 'white',
                                        border: '3px solid white',
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 900,
                                        fontSize: isActive ? '1.1rem' : '0.9rem',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}>
                                        {wpt.id}
                                    </div>

                                    <span style={{
                                        position: 'absolute',
                                        top: '110%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.78rem',
                                        fontWeight: 800,
                                        color: isActive ? 'var(--accent)' : 'white',
                                        background: 'rgba(11, 34, 64, 0.85)',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '12px',
                                        backdropFilter: 'blur(6px)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        {wpt.title.split(' ')[0]} {wpt.title.split(' ')[1]}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Selected Treasure Showcase Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedPoint.id}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -25 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
                            gap: '2.5rem',
                            background: 'white',
                            borderRadius: '32px',
                            padding: '2.5rem',
                            boxShadow: 'var(--shadow-lg)',
                            border: '1px solid rgba(184, 92, 56, 0.15)',
                            alignItems: 'center'
                        }}
                        className="treasure-card-grid"
                    >
                        {/* Treasure Image Preview with Lightbox Trigger */}
                        <div
                            onClick={() => setLightboxIndex(selectedPoint.id - 1)}
                            style={{
                                position: 'relative',
                                height: '340px',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: 'var(--shadow-md)'
                            }}
                        >
                            <img
                                src={selectedPoint.src}
                                alt={selectedPoint.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(11, 34, 64, 0.7) 0%, transparent 60%)',
                                display: 'flex',
                                alignItems: 'flex-end',
                                padding: '1.5rem'
                            }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '30px',
                                    background: 'rgba(197, 155, 39, 0.9)',
                                    color: 'var(--primary)',
                                    fontWeight: 800,
                                    fontSize: '0.85rem'
                                }}>
                                    <Maximize2 size={16} /> Abrir Foto Fullscreen
                                </div>
                            </div>
                        </div>

                        {/* Secret Info Detail */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <span style={{
                                    background: 'rgba(184, 92, 56, 0.12)',
                                    color: 'var(--terracotta)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: 800
                                }}>
                                    {selectedPoint.step}
                                </span>
                                <span style={{
                                    background: 'rgba(197, 155, 39, 0.15)',
                                    color: 'var(--bronze-gold)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: 800
                                }}>
                                    {selectedPoint.tag}
                                </span>
                            </div>

                            <h3 style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 900, fontFamily: 'var(--font-heading)', lineHeight: 1.15 }}>
                                {selectedPoint.title}
                            </h3>

                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                                {selectedPoint.secret}
                            </p>

                            <div style={{
                                padding: '1rem 1.25rem',
                                borderRadius: '16px',
                                background: 'rgba(250, 246, 240, 0.9)',
                                border: '1px solid rgba(184, 92, 56, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.85rem'
                            }}>
                                <Gift size={24} color="var(--terracotta)" style={{ flexShrink: 0 }} />
                                <div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>
                                        Secreto del Tesoro Cultural
                                    </span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        Haz clic en la imagen para inspeccionar los detalles arqueológicos en alta definición.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* YARL Lightbox Viewer */}
            <Lightbox
                open={lightboxIndex >= 0}
                index={lightboxIndex}
                close={() => setLightboxIndex(-1)}
                slides={treasureWaypoints.map(w => ({ src: w.src, title: w.title, description: w.secret }))}
                plugins={[Zoom, Fullscreen, Slideshow, Captions]}
            />

            <style>{`
                @media (max-width: 850px) {
                    .treasure-card-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
};

export default PucaraGallery;
