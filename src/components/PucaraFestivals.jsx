import { motion } from 'framer-motion';
import { Calendar, Award, Star } from 'lucide-react';
import { pucaraFestivals } from '../data/pucaraData';

const PucaraFestivals = () => {
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.6,
                ease: 'easeOut'
            }
        })
    };

    return (
        <section id="pucara-festividades" className="section bg-blue-contrast" style={{ position: 'relative', padding: '6.5rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="script-subtitle">Calendario Cultural...</span>
                    <h2 className="bold-title">Festividades Tradicionales de Pucará</h2>
                    <div style={{ height: '4px', background: 'var(--accent)', width: '80px', margin: '0 auto 1.5rem auto', borderRadius: '2px' }} />
                    <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Pucará es tierra de celebraciones místicas y católicas sincréticas. Organiza tu viaje en torno a nuestras festividades más emblemáticas.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2.5rem'
                }} className="festivals-grid">
                    {pucaraFestivals.map((fest, idx) => (
                        <motion.div
                            key={fest.id}
                            custom={idx}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            whileHover={{ y: -8 }}
                            className={`card ${idx % 3 === 0 ? 'card-terracotta' : idx % 3 === 1 ? 'card-primary' : 'card-green'}`}
                            style={{
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                padding: 0
                            }}
                        >
                            {/* Card Image */}
                            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                                <img 
                                    src={fest.image} 
                                    alt={fest.name} 
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        filter: 'brightness(0.9)'
                                    }}
                                />
                                {/* Date Ribbon */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    left: '1rem',
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '30px',
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                    border: '1px solid rgba(255,255,255,0.15)'
                                }}>
                                    <Calendar size={12} style={{ color: 'var(--accent)' }} />
                                    <span>{fest.date}</span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    color: 'var(--primary)',
                                    fontWeight: 800,
                                    marginBottom: '1rem',
                                    fontFamily: 'var(--font-heading)'
                                }}>
                                    {fest.name}
                                </h3>
                                <p style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.95rem',
                                    lineHeight: 1.5,
                                    marginBottom: '1.5rem',
                                    flexGrow: 1,
                                    fontWeight: 600
                                }}>
                                    {fest.description}
                                </p>

                                <div style={{ height: '1px', backgroundColor: 'rgba(15, 44, 89, 0.1)', marginBottom: '1rem' }} />

                                {/* Highlight bullet */}
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                    <Star size={16} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '0.1rem' }} />
                                    <span style={{ fontSize: '0.8rem', fontWeight: 850, color: 'var(--primary)' }}>
                                        Principal atractivo: <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{fest.highlight}</span>
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .festivals-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default PucaraFestivals;
