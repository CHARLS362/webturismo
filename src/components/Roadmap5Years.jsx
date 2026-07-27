import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Flag, Rocket, CheckCircle2, ChevronRight } from 'lucide-react';

const roadmapData = [
    {
        year: "Año 1",
        title: "Digitalización & Guías Locales",
        subtitle: "Lanzamiento y Red Local",
        icon: <Rocket size={22} />,
        details: [
            "Puesta en marcha oficial de la plataforma **PUCARÁ 365**.",
            "Primer censo y catálogo digital de 20 talleres alfareros tradicionales.",
            "Curso de acreditación digital para jóvenes guías bilingües de Pucará.",
            "Promociones de pasajes cortos subsidiados en alianza con colectivos locales."
        ]
    },
    {
        year: "Año 2",
        title: "Tecnología 3D & AR",
        subtitle: "Experiencia de Vanguardia",
        icon: <Target size={22} />,
        details: [
            "Visualizador interactivo 3D WebGL para personalizar y encargar Toritos pintados a mano.",
            "Reconstrucción 3D y realidad aumentada (AR) de la pirámide de Kalasaya para smartphones.",
            "Códigos QR educativos en cada parada de la ruta con vídeos vivenciales de artesanos.",
            "Lanzamiento de la línea de recuerdos certificados con chip NFC de autenticidad alfarera."
        ]
    },
    {
        year: "Año 3",
        title: "Audio-Guías Geolocalizadas",
        subtitle: "Conectividad sin Límites",
        icon: <Flag size={22} />,
        details: [
            "Lanzamiento de la App Oficial PUCARÁ 365 con audio-guías geolocalizadas sin conexión.",
            "Alianza estratégica con hoteles y agencias receptivas de Puno, Cusco y Arequipa.",
            "Puntos de acceso Wi-Fi comunitarios gratuitos en el Complejo Kalasaya y la Plaza de Armas.",
            "Primeros homestays certificados en Pucará con servicios sanitarios y de calefacción premium."
        ]
    },
    {
        year: "Año 4",
        title: "Bienal Internacional de Arcilla",
        subtitle: "Pucará en el Ojo del Mundo",
        icon: <CheckCircle2 size={22} />,
        details: [
            "Establecimiento de la Primera Bienal de Cerámica Altiplánica en Pucará.",
            "Intercambios artísticos internacionales con escuelas de arte de Europa y Asia.",
            "Creación del Corredor del Barro: talleres abiertos donde turistas esculpen junto a maestros.",
            "Cobertura de prensa internacional y tours gastronómicos del cancacho y el queso pucareño."
        ]
    },
    {
        year: "Año 5",
        title: "Destino Turístico Inteligente",
        subtitle: "Sostenibilidad y Futuro",
        icon: <CheckCircle2 size={22} />,
        details: [
            "Certificación internacional de Pucará como Destino Turístico Sostenible y Smart Destination.",
            "Autosuficiencia energética: paneles solares en todos los alojamientos comunitarios.",
            "Sala de Realidad Virtual (VR) en el Museo Lítico recreando las estelas sagradas en su estado original.",
            "Cooperativa alfarera autogestionada para la exportación directa de cerámica con sello Pucará 365."
        ]
    }
];

const Roadmap5Years = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section id="pucara-roadmap" className="section bg-blue-contrast" style={{ position: 'relative', overflow: 'hidden', padding: '6.5rem 0' }}>
            {/* Background grids */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(204, 156, 86, 0.04) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.4,
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <span className="script-subtitle">Hoja de Ruta Estratégica...</span>
                    <h2 className="bold-title">Proyección de Desarrollo a 5 Años</h2>
                    <div style={{ height: '4px', background: 'var(--accent)', width: '80px', margin: '1rem auto 1.5rem auto', borderRadius: '2px' }} />
                    <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Visualiza nuestro plan de modernización tecnológica e infraestructura cultural para consolidar a Pucará como un destino inteligente y autosostenible.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.4fr',
                    gap: '4rem',
                    alignItems: 'start'
                }} className="roadmap-grid">

                    {/* Left Column: Timeline Navigation Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {roadmapData.map((step, idx) => {
                            const isActive = activeStep === idx;
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 8 }}
                                    onClick={() => setActiveStep(idx)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.5rem',
                                        padding: '1.25rem 1.5rem',
                                        background: isActive ? 'linear-gradient(135deg, var(--terracotta) 0%, #A04928 100%)' : 'rgba(11, 34, 64, 0.03)',
                                        border: '1px solid ' + (isActive ? 'var(--terracotta)' : 'rgba(11, 34, 64, 0.08)'),
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                        boxShadow: isActive ? '0 8px 20px rgba(184, 92, 56, 0.25)' : 'none'
                                    }}
                                >
                                    <div style={{
                                        width: '46px',
                                        height: '46px',
                                        borderRadius: '12px',
                                        backgroundColor: isActive ? 'var(--bronze-gold)' : 'rgba(11, 34, 64, 0.05)',
                                        color: isActive ? 'var(--primary)' : 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s'
                                    }}>
                                        {step.icon}
                                    </div>
                                    <div style={{ flexGrow: 1 }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: isActive ? 'var(--bronze-gold)' : 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            {step.year}
                                        </div>
                                        <h3 style={{ fontSize: '1.18rem', color: isActive ? 'white' : 'var(--primary)', margin: 0, fontWeight: 700 }}>
                                            {step.title}
                                        </h3>
                                    </div>
                                    <ChevronRight size={18} style={{ color: isActive ? 'var(--bronze-gold)' : 'rgba(11, 34, 64, 0.35)', transition: 'all 0.3s' }} />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right Column: Active Step Details (Glassmorphism Light via glass-panel-dark override) */}
                    <div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.4 }}
                                className="card card-terracotta"
                                style={{
                                    padding: '3rem'
                                }}
                            >
                                <span style={{
                                    fontSize: '0.82rem',
                                    backgroundColor: 'var(--accent)',
                                    color: 'var(--primary)',
                                    padding: '0.45rem 1.2rem',
                                    borderRadius: '30px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    display: 'inline-block',
                                    marginBottom: '1.5rem',
                                    letterSpacing: '0.05em',
                                    boxShadow: '0 4px 12px rgba(204, 156, 86, 0.2)'
                                }}>
                                    {roadmapData[activeStep].year} - {roadmapData[activeStep].subtitle}
                                </span>
                                
                                <h3 style={{ fontSize: '1.85rem', color: 'var(--primary)', marginBottom: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                                    {roadmapData[activeStep].title}
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                    {roadmapData[activeStep].details.map((detail, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                            <div style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                backgroundColor: 'var(--secondary)',
                                                marginTop: '0.65rem',
                                                flexShrink: 0
                                            }} />
                                            <p style={{
                                                margin: 0,
                                                fontSize: '1.05rem',
                                                color: 'var(--text-muted)',
                                                lineHeight: 1.6,
                                                fontWeight: 600
                                            }}>
                                                {detail.split('**').map((part, index) => 
                                                    index % 2 === 1 ? <strong key={index} style={{ color: 'var(--secondary)', fontWeight: 800 }}>{part}</strong> : part
                                                )}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .roadmap-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2.5rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Roadmap5Years;
