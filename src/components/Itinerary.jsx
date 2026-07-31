import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, Award, Sailboat, Mountain, Camera,
    HeartHandshake, BedDouble, ArrowRight,
    Coffee, Bus, Users, MapPin, Calendar, Sun
} from 'lucide-react';
import { itineraryPackages } from '../data/itinerary';

const Itinerary = ({ selectedPackage, onPackageChange }) => {
    const [activeWeek, setActiveWeek] = useState(1);

    const currentPackageId = selectedPackage || 'standard';
    const currentPackage = itineraryPackages[currentPackageId];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [prevPackageId, setPrevPackageId] = useState(currentPackageId);

    if (currentPackageId !== prevPackageId) {
        setPrevPackageId(currentPackageId);
        setCurrentImageIndex(0);
    }

    useEffect(() => {
        if (!currentPackage.images) return;
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % currentPackage.images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [currentPackage]);

    return (
        <section className="section bg-blue-base" id="itinerario" style={{ padding: '6.5rem 0', position: 'relative' }}>
            <div className="container">
                
                {/* Section Header in Larana Style */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="script-subtitle">Tu Ruta Detallada...</span>
                    <h2 className="bold-title">Itinerario de Inmersión</h2>
                    <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--accent)', margin: '1rem auto' }} />
                </div>

                {/* Package Selectors (Pills) */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginBottom: '4rem'
                }}>
                    {Object.values(itineraryPackages).map((pkg) => {
                        const isActive = currentPackageId === pkg.id;
                        return (
                            <motion.button
                                key={pkg.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    if (onPackageChange) onPackageChange(pkg.id);
                                    setActiveWeek(1);
                                }}
                                style={{
                                    padding: '0.9rem 2rem',
                                    borderRadius: '50px',
                                    border: `2px solid ${isActive ? 'var(--accent)' : 'rgba(15, 44, 89, 0.15)'}`,
                                    backgroundColor: isActive ? 'var(--accent)' : 'rgba(15, 44, 89, 0.03)',
                                    color: isActive ? 'var(--primary)' : 'var(--primary)',
                                    cursor: 'pointer',
                                    fontWeight: '900',
                                    fontSize: '0.95rem',
                                    boxShadow: isActive ? '0 10px 20px rgba(204, 156, 86, 0.25)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {pkg.title}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Main Package Showcase Card */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentPackageId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="card itinerary-main-card"
                        style={{
                            overflow: 'hidden',
                            marginBottom: '5rem',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.3fr',
                            gap: 0,
                            padding: 0,
                            border: '1px solid rgba(15, 44, 89, 0.08)'
                        }}
                    >
                        {/* Left half: Sliding images */}
                        <div style={{ position: 'relative', minHeight: '350px' }}>
                            <motion.img
                                key={currentPackage.images ? currentPackage.images[currentImageIndex] : currentPackage.image}
                                src={currentPackage.images ? currentPackage.images[currentImageIndex] : currentPackage.image}
                                alt={currentPackage.title}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ 
                                position: 'absolute', 
                                inset: 0, 
                                background: 'linear-gradient(to right, rgba(15, 44, 89, 0.4), transparent)' 
                            }} />
                        </div>

                        {/* Right half: Package metadata & benefits */}
                        <div style={{ padding: '3rem' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                                {currentPackage.subtitle}
                            </span>
                            <h3 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                                Todo Organizado para tu Comodidad
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: 1.6, fontWeight: 600 }}>
                                {currentPackage.description}
                            </p>

                            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.05em', marginBottom: '1.25rem', borderBottom: '1px solid rgba(15, 44, 89, 0.1)', paddingBottom: '0.5rem' }}>
                                Inclusiones destacadas:
                            </h4>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div className="icon-badge icon-badge-terracotta" style={{ padding: '0.6rem', borderRadius: '12px' }}><BedDouble size={20} /></div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)' }}>Alojamiento</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{currentPackage.benefits.accommodation}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div className="icon-badge icon-badge-terracotta" style={{ padding: '0.6rem', borderRadius: '12px' }}><Coffee size={20} /></div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)' }}>Alimentación</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{currentPackage.benefits.food}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div className="icon-badge icon-badge-terracotta" style={{ padding: '0.6rem', borderRadius: '12px' }}><Bus size={20} /></div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)' }}>Logística</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{currentPackage.benefits.transport}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div className="icon-badge icon-badge-terracotta" style={{ padding: '0.6rem', borderRadius: '12px' }}><Users size={20} /></div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary)' }}>Anfitrión</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{currentPackage.benefits.guide}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Day-by-Day Timeline */}
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <AnimatePresence mode='wait'>
                        {currentPackage.weeks.map((week) => (
                            activeWeek === week.id && (
                                <motion.div
                                    key={week.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div style={{ position: 'relative', paddingLeft: '3rem' }}>
                                        
                                        {/* Main Vertical Timeline Line */}
                                        <div style={{
                                            position: 'absolute', left: '0.6rem', top: '10px', bottom: '10px',
                                            width: '4px', 
                                            background: 'linear-gradient(to bottom, var(--accent) 0%, var(--secondary) 100%)',
                                            borderRadius: '2px',
                                            opacity: 0.8
                                        }}></div>

                                        {/* Days list */}
                                        {week.days.map((day, index) => (
                                            <motion.div
                                                key={day.day}
                                                initial={{ opacity: 0, x: -30 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: '-50px' }}
                                                transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                                                style={{ marginBottom: '3rem', position: 'relative' }}
                                            >
                                                {/* Timeline Bullet (Pulse Gold with Sun Icon) */}
                                                <div 
                                                    className="pulse-gold-animation"
                                                    style={{
                                                        position: 'absolute', left: '-3.3rem', top: '0.2rem',
                                                        width: '32px', height: '32px', borderRadius: '50%',
                                                        backgroundColor: 'var(--primary)', border: '2px solid var(--accent)',
                                                        zIndex: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 0 10px rgba(197, 155, 39, 0.4)',
                                                        color: 'var(--accent)'
                                                    }}
                                                >
                                                    <Sun size={14} fill="var(--accent)" />
                                                </div>

                                                <motion.div
                                                    whileHover={{ y: -6, boxShadow: 'var(--shadow-premium)' }}
                                                    className={`card ${index % 2 === 0 ? 'card-terracotta' : 'card-primary'}`}
                                                    style={{
                                                        padding: '2.5rem', 
                                                        border: '1px solid rgba(15, 44, 89, 0.08)',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                        <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)', margin: 0 }}>
                                                            Día {day.day}: {day.title}
                                                        </h4>
                                                        <span style={{ 
                                                            fontSize: '0.8rem', 
                                                            color: 'var(--secondary)', 
                                                            fontWeight: 800, 
                                                            backgroundColor: 'rgba(200, 88, 51, 0.12)', 
                                                            padding: '0.35rem 1rem', 
                                                            borderRadius: '30px',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em'
                                                        }}>
                                                            Ruta Guiada
                                                        </span>
                                                    </div>
                                                    
                                                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1.02rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                                                        {day.desc}
                                                    </p>

                                                    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', borderTop: '1px solid rgba(15, 44, 89, 0.1)', paddingTop: '1.25rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 800 }}>
                                                            <MapPin size={16} style={{ color: 'var(--secondary)' }} /> Región Puno
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 800 }}>
                                                            <Calendar size={16} style={{ color: 'var(--accent)' }} /> Actividades Vivenciales
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .itinerary-main-card {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Itinerary;
