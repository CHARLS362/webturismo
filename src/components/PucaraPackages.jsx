import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Sparkles, Send, ShieldCheck, ArrowRight, X, Flame } from 'lucide-react';
import { toast } from 'sonner';
import { mainTourPackages } from '../data/pucaraData';

const PucaraPackages = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);

    const handleBookWhatsApp = (pkg) => {
        const text = encodeURIComponent(`¡Hola! Estoy interesado en reservar el *${pkg.name}* (${pkg.price} ${pkg.unit}) para Pucará, Puno. ¿Me brindan disponibilidad?`);
        window.open(`https://wa.me/51916598012?text=${text}`, '_blank');
        toast.success(`Redirigiendo a WhatsApp para reservar ${pkg.name}... 🐂✨`);
    };

    return (
        <section id="pucara-paquetes" className="section bg-blue-contrast" style={{ position: 'relative', padding: '6.5rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                    <span className="script-subtitle">Planes de Viaje Diseñados...</span>
                    <h2 className="bold-title">Paquetes Turísticos Oficiales de Pucará</h2>
                    <div style={{ height: '4px', background: 'var(--accent)', width: '80px', margin: '0 auto 1.5rem auto', borderRadius: '2px' }} />
                    <p style={{ maxWidth: '720px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Elige la experiencia que mejor se adapte a tu viaje por Puno. Incluyen transporte guiado, entradas arqueológicas, talleres vivenciales y rituales ancestrales.
                    </p>
                </div>

                {/* Packages Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem',
                    alignItems: 'stretch'
                }}>
                    {mainTourPackages.map((pkg, idx) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 35 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: idx * 0.12 }}
                            whileHover={{ y: -10 }}
                            style={{
                                background: 'white',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                border: pkg.id === 'paquete-mistico' ? '2px solid var(--accent)' : '1px solid rgba(11, 34, 64, 0.1)',
                                boxShadow: pkg.id === 'paquete-mistico' ? 'var(--shadow-premium)' : 'var(--shadow-lg)',
                                position: 'relative'
                            }}
                        >
                            {/* Package Header Image */}
                            <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                                <img
                                    src={pkg.image}
                                    alt={pkg.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(11, 34, 64, 0.7) 0%, transparent 60%)'
                                }} />

                                {/* Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: '1.25rem',
                                    left: '1.25rem',
                                    background: pkg.id === 'paquete-mistico' ? 'var(--accent)' : 'var(--terracotta)',
                                    color: pkg.id === 'paquete-mistico' ? 'var(--primary)' : 'white',
                                    padding: '0.4rem 1.1rem',
                                    borderRadius: '30px',
                                    fontSize: '0.8rem',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    boxShadow: 'var(--shadow-sm)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem'
                                }}>
                                    {pkg.id === 'paquete-mistico' && <Flame size={14} />}
                                    {pkg.badge}
                                </div>
                            </div>

                            {/* Package Card Body */}
                            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                                        {pkg.price}
                                    </span>
                                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                        {pkg.unit}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.35rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', lineHeight: 1.25 }}>
                                    {pkg.name}
                                </h3>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--terracotta)', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                                    <Clock size={16} /> {pkg.duration}
                                </div>

                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                    {pkg.description}
                                </p>

                                <div style={{ height: '1px', background: 'rgba(11, 34, 64, 0.08)', marginBottom: '1.25rem' }} />

                                {/* Includes checklist preview */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem', flexGrow: 1 }}>
                                    {pkg.includes.slice(0, 4).map((inc, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                                            <CheckCircle2 size={16} style={{ color: 'var(--ichu-green)', flexShrink: 0, marginTop: '2px' }} />
                                            <span>{inc}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <button
                                        onClick={() => setSelectedPackage(pkg)}
                                        style={{
                                            width: '100%',
                                            padding: '0.85rem',
                                            borderRadius: '12px',
                                            border: '1px solid var(--terracotta)',
                                            background: 'transparent',
                                            color: 'var(--terracotta)',
                                            fontWeight: 800,
                                            fontSize: '0.88rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        Ver Itinerario Completo
                                    </button>

                                    <button
                                        onClick={() => handleBookWhatsApp(pkg)}
                                        className="btn btn-primary"
                                        style={{
                                            width: '100%',
                                            justifyContent: 'center',
                                            padding: '0.9rem',
                                            fontSize: '0.9rem',
                                            borderRadius: '12px'
                                        }}
                                    >
                                        <Send size={16} /> Reservar Paquete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Detail Drawer */}
            <AnimatePresence>
                {selectedPackage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPackage(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(11, 34, 64, 0.75)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1.5rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: 'white',
                                borderRadius: '28px',
                                maxWidth: '650px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                padding: '2.5rem',
                                position: 'relative',
                                boxShadow: 'var(--shadow-premium)'
                            }}
                        >
                            <button
                                onClick={() => setSelectedPackage(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    background: 'rgba(11, 34, 64, 0.06)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={20} />
                            </button>

                            <span style={{ color: 'var(--terracotta)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                {selectedPackage.badge} · {selectedPackage.duration}
                            </span>
                            
                            <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 900, fontFamily: 'var(--font-heading)', margin: '0.5rem 0 1rem' }}>
                                {selectedPackage.name}
                            </h3>

                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                {selectedPackage.description}
                            </p>

                            <h4 style={{ fontSize: '1.05rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '0.85rem' }}>
                                📋 Desglose del Itinerario Guiado:
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                                {selectedPackage.itinerary.map((step, idx) => (
                                    <div key={idx} style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: 'rgba(250, 246, 240, 0.9)', borderLeft: '4px solid var(--terracotta)', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>
                                        {step}
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(11, 34, 64, 0.1)', paddingTop: '1.5rem' }}>
                                <div>
                                    <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary)' }}>{selectedPackage.price}</span>
                                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: '0.4rem' }}>{selectedPackage.unit}</span>
                                </div>
                                <button
                                    onClick={() => handleBookWhatsApp(selectedPackage)}
                                    className="btn btn-accent"
                                    style={{ padding: '0.9rem 2rem' }}
                                >
                                    Reservar via WhatsApp <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PucaraPackages;
