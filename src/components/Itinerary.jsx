
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, Award, Sailboat, Mountain, Camera,
    HeartHandshake, BedDouble, ArrowRight,
    Coffee, Bus, Users, MapPin, Calendar
} from 'lucide-react';
import { itineraryPackages } from '../data/itinerary';

const Itinerary = ({ selectedPackage, onPackageChange }) => {
    const [activeWeek, setActiveWeek] = useState(1);

    // Default to 'standard' if not provided
    const currentPackageId = selectedPackage || 'standard';
    const currentPackage = itineraryPackages[currentPackageId];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [currentPackageId]);

    useEffect(() => {
        if (!currentPackage.images) return;
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % currentPackage.images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [currentPackage]);

    return (
        <section className="section" id="itinerario" style={{ backgroundColor: '#F8FAFC', padding: '4rem 0' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <span className="text-accent" style={{ fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Tu Viaje Día a Día
                    </span>
                    <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: 'var(--primary)' }}>Itinerario Detallado</h2>
                    <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--accent)', margin: '1rem auto' }} />
                </motion.div>

                {/* Package Selector */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginBottom: '3rem'
                }}>
                    {Object.values(itineraryPackages).map((pkg) => (
                        <button
                            key={pkg.id}
                            onClick={() => {
                                if (onPackageChange) onPackageChange(pkg.id);
                                setActiveWeek(1);
                            }}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '50px',
                                border: `1px solid ${currentPackageId === pkg.id ? 'var(--primary)' : '#e2e8f0'} `,
                                backgroundColor: currentPackageId === pkg.id ? 'var(--primary)' : 'white',
                                color: currentPackageId === pkg.id ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'all 0.2s ease',
                                boxShadow: currentPackageId === pkg.id ? '0 4px 12px rgba(15, 44, 89, 0.2)' : 'none'
                            }}
                        >
                            {pkg.title}
                        </button>
                    ))}
                </div>

                {/* Selected Package Info Card */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentPackageId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)',
                            marginBottom: '4rem',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.5fr', // Image left, content right
                            gap: 0
                        }}
                    >
                        <div style={{ position: 'relative', minHeight: '300px' }}>
                            <motion.img
                                key={currentPackage.images ? currentPackage.images[currentImageIndex] : currentPackage.image}
                                src={currentPackage.images ? currentPackage.images[currentImageIndex] : currentPackage.image}
                                alt={currentPackage.title}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)' }}></div>
                        </div>

                        <div style={{ padding: '3rem' }}>
                            <h3 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1rem' }}>{currentPackage.subtitle}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>{currentPackage.description}</p>

                            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>Incluido en este paquete:</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ padding: '0.5rem', backgroundColor: '#FFFBE6', borderRadius: '8px' }}><BedDouble size={20} className="text-accent" /></div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>Alojamiento</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentPackage.benefits.accommodation}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ padding: '0.5rem', backgroundColor: '#FFFBE6', borderRadius: '8px' }}><Coffee size={20} className="text-accent" /></div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>Alimentación</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentPackage.benefits.food}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ padding: '0.5rem', backgroundColor: '#FFFBE6', borderRadius: '8px' }}><Bus size={20} className="text-accent" /></div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>Transporte</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentPackage.benefits.transport}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ padding: '0.5rem', backgroundColor: '#FFFBE6', borderRadius: '8px' }}><Users size={20} className="text-accent" /></div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>Guía</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentPackage.benefits.guide}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Week Selector Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {currentPackage.weeks.map((week) => (
                        <button
                            key={week.id}
                            onClick={() => setActiveWeek(week.id)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '12px',
                                border: 'none',
                                backgroundColor: activeWeek === week.id ? 'var(--primary)' : 'white',
                                color: activeWeek === week.id ? 'white' : 'var(--text-muted)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontWeight: '600',
                                boxShadow: activeWeek === week.id ? '0 10px 20px -5px rgba(15, 44, 89, 0.3)' : '0 2px 5px rgba(0,0,0,0.05)',
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            {week.id === 1 && <Sailboat size={18} />}
                            {week.id === 2 && <Mountain size={18} />}
                            {week.id === 3 && <HeartHandshake size={18} />}
                            {week.id === 4 && <Camera size={18} />}
                            {week.title.split(':')[0]}
                        </button>
                    ))}
                </div>

                {/* Vertical Loop for Days */}
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <AnimatePresence mode='wait'>
                        {currentPackage.weeks.map((week) => (
                            activeWeek === week.id && (
                                <motion.div
                                    key={week.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '2rem', textAlign: 'center' }}>
                                        {week.title}
                                    </h3>
                                    <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                                        {/* Main Vertical Line */}
                                        <div style={{
                                            position: 'absolute', left: '0', top: '0', bottom: '0',
                                            width: '2px', backgroundColor: '#E2E8F0'
                                        }}></div>

                                        {week.days.map((day, index) => (
                                            <motion.div
                                                key={day.day}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                style={{ marginBottom: '2rem', position: 'relative' }}
                                            >
                                                {/* Timeline Dot */}
                                                <div style={{
                                                    position: 'absolute', left: '-2.4rem', top: '0.2rem',
                                                    width: '16px', height: '16px', borderRadius: '50%',
                                                    backgroundColor: 'white', border: '3px solid var(--accent)',
                                                    zIndex: 2
                                                }}></div>

                                                <div style={{
                                                    backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px',
                                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                                    border: '1px solid #f1f5f9'
                                                }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                                        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)' }}>
                                                            Día {day.day}: {day.title}
                                                        </h4>
                                                        <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '600', backgroundColor: '#FFFBE6', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                                                            8 Horas
                                                        </span>
                                                    </div>
                                                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                                        {day.desc}
                                                    </p>
                                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                                                        {/* Placeholders for day-specific icons/tags if available in future */}
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                            <MapPin size={14} /> Puno Region
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                            <Calendar size={14} /> Actividad Guiada
                                                        </div>
                                                    </div>
                                                </div>
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
@media(max - width: 900px) {
    div[style *= "grid-template-columns: 1fr 1.5fr"] {
        grid - template - columns: 1fr!important;
    }
}
`}</style>
        </section>
    );
};

export default Itinerary;

