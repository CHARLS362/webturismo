import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Compass, Landmark, Mountain, Utensils, CheckCircle } from 'lucide-react';

// Local Pucará assets
import kalasayaImg from '../assets/image/map/kalasaya.png';
import penonImg from '../assets/image/map/penon.png';
import temploImg from '../assets/image/map/templo.png';
import plazaImg from '../assets/image/map/plaza.png';
import museoImg from '../assets/image/map/museo.png';

const walkingStops = [
    {
        id: 1,
        time: '08:30 AM',
        title: 'Arribo a la Plaza Bolívar y Templo Santa Isabel',
        subtitle: 'Punto de Inicio en Pucará (Lampa, Puno)',
        desc: 'Comienza tu mañana admirando la imponente fachada de piedra rojiza tallada del templo colonial de Santa Isabel, construido en el siglo XVIII sobre bases incas.',
        image: temploImg,
        icon: Landmark,
        highlight: 'Fachada Barroco-Andina y Plaza Tradicional'
    },
    {
        id: 2,
        time: '10:00 AM',
        title: 'Museo Lítico de Pucará',
        subtitle: 'Guardianes de la Piedra Sagrada',
        desc: 'Explora la colección original de monolitos zoomorfos, la famosa estela del Hatun Ñakaj (El Degollador) y representaciones talladas en piedra prehispánica.',
        image: museoImg,
        icon: Compass,
        highlight: 'Estela del Degollador y Monolitos de Rayo'
    },
    {
        id: 3,
        time: '11:45 AM',
        title: 'Taller Vivencial de Alfarería',
        subtitle: 'Moldeado del Torito en Arcilla',
        desc: 'Visita el taller de un maestro alfarero pucareño. Siente la textura del barro rojo y moldea, quema y pinta tu propio Torito tradicional para llevar a casa.',
        image: plazaImg,
        icon: Utensils,
        highlight: 'Taller práctico vivencial de arcilla'
    },
    {
        id: 4,
        time: '02:00 PM',
        title: 'Complejo Arqueológico Kalasaya',
        subtitle: 'Patio Hundido y Pirámide Ceremonial',
        desc: 'Camina por las plataformas escalonadas de piedra rojiza construidas en el 200 a.C. Siente la energía ancestral en el gran patio hundido ceremonias pre-incas.',
        image: kalasayaImg,
        icon: Landmark,
        highlight: 'Plataformas ceremoniales en terrazas'
    },
    {
        id: 5,
        time: '04:30 PM',
        title: 'Caminata Ligera al Peñón de Pucará',
        subtitle: 'Mirador del Altiplano al Atardecer',
        desc: 'Sube por el sendero rocoso hasta la cima del gran Peñón. Disfruta una vista de 360 grados sobre los campos agrícolas y el horizonte infinito de Puno.',
        image: penonImg,
        icon: Mountain,
        highlight: 'Vistas panorámicas a 4,050 msnm'
    }
];

const PucaraWalkingTour = () => {
    const [activeStop, setActiveStop] = useState(walkingStops[0]);

    return (
        <section id="pucara-recorrido" className="section bg-blue-base" style={{ position: 'relative', padding: '6.5rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="script-subtitle">Paso a Paso en Pucará...</span>
                    <h2 className="bold-title">Recorrido Interactivo "Walking Tour 1 Día"</h2>
                    <div style={{ height: '4px', background: 'var(--terracotta)', width: '80px', margin: '0 auto 1.5rem auto', borderRadius: '2px' }} />
                    <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Selecciona cada parada de la línea de tiempo para explorar las experiencias recomendadas desde el amanecer hasta el atardecer en Pucará, Lampa y Puno.
                    </p>
                </div>

                {/* Timeline Step Selector Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '3rem',
                    overflowX: 'auto',
                    paddingBottom: '1rem'
                }}>
                    {walkingStops.map((stop) => {
                        const Icon = stop.icon;
                        const isSelected = activeStop.id === stop.id;
                        return (
                            <button
                                key={stop.id}
                                onClick={() => setActiveStop(stop)}
                                style={{
                                    flex: '1 0 160px',
                                    padding: '1rem',
                                    borderRadius: '16px',
                                    background: isSelected ? 'var(--terracotta)' : 'white',
                                    color: isSelected ? 'white' : 'var(--primary)',
                                    border: isSelected ? '2px solid var(--terracotta)' : '1px solid rgba(11, 34, 64, 0.1)',
                                    boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(184, 92, 56, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: isSelected ? 'white' : 'var(--terracotta)'
                                }}>
                                    <Icon size={18} />
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {stop.time}
                                </span>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, textAlign: 'center', lineHeight: 1.2 }}>
                                    {stop.title.split(' ')[0]} {stop.title.split(' ')[1]}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Active Stop Detail Card Showcase */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStop.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
                            gap: '3rem',
                            background: 'white',
                            borderRadius: '32px',
                            padding: '2.5rem',
                            boxShadow: 'var(--shadow-premium)',
                            border: '1px solid rgba(184, 92, 56, 0.15)',
                            alignItems: 'center'
                        }}
                        className="walking-tour-grid"
                    >
                        {/* Left: Image Showcase */}
                        <div style={{ position: 'relative', height: '360px', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                            <img
                                src={activeStop.image}
                                alt={activeStop.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '1.25rem',
                                left: '1.25rem',
                                background: 'rgba(11, 34, 64, 0.85)',
                                backdropFilter: 'blur(8px)',
                                color: 'var(--accent)',
                                padding: '0.5rem 1.2rem',
                                borderRadius: '30px',
                                fontSize: '0.85rem',
                                fontWeight: 800,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <Clock size={16} /> Parada #{activeStop.id} · {activeStop.time}
                            </div>
                        </div>

                        {/* Right: Content details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <span style={{
                                color: 'var(--terracotta)',
                                fontSize: '0.85rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}>
                                {activeStop.subtitle}
                            </span>
                            <h3 style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 900, fontFamily: 'var(--font-heading)', lineHeight: 1.15 }}>
                                {activeStop.title}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, fontWeight: 400 }}>
                                {activeStop.desc}
                            </p>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                padding: '0.85rem 1.25rem',
                                borderRadius: '14px',
                                background: 'rgba(184, 92, 56, 0.08)',
                                border: '1px solid rgba(184, 92, 56, 0.2)'
                            }}>
                                <CheckCircle size={20} color="var(--terracotta)" />
                                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
                                    Destacado: <span style={{ fontWeight: 500 }}>{activeStop.highlight}</span>
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => document.getElementById('pucara-mapa')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    <MapPin size={18} /> Ver Ubicación en el Mapa
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .walking-tour-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
};

export default PucaraWalkingTour;
