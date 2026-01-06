
import { CheckCircle, ShieldCheck, Coffee, Tent, Ship } from 'lucide-react';
import { motion } from 'framer-motion';

const inclusions = [
    { icon: Tent, label: "Alojamiento Premium", text: "Lodges con vista al lago y homestays comunitarias de lujo rústico." },
    { icon: Coffee, label: "Gastronomía Completa", text: "Desayuno buffet diario, almuerzos campestres y cenas fusión asiático-andina." },
    { icon: Ship, label: "Transporte Exclusivo", text: "Lanchas veloces privadas, kayak de expedición y vehículos 4x4 confortables." },
    { icon: ShieldCheck, label: "Seguridad Integral", text: "Monitoreo de oxígeno 24/7, botiquín de altura y seguro de viaje básico incluido." },
    { icon: CheckCircle, label: "Todo Incluido", text: "Entradas a todas las reservas, propinas comunitarias y guías expertos bilingües." }
];

const Inclusions = () => {
    return (
        <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            {/* Background Pattern */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                opacity: 0.3
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <span style={{ color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sin Preocupaciones</span>
                    <h2 style={{ color: 'white', marginTop: '0.5rem', fontSize: '2.5rem' }}>Todo Incluido en tu Experiencia</h2>
                    <p style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>Nos ocupamos de cada detalle logístico para que tu única responsabilidad sea disfrutar y conectar.</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {inclusions.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                padding: '2.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                gap: '1.5rem',
                                backdropFilter: 'blur(10px)',
                                cursor: 'default'
                            }}
                            whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.1)' }}
                        >
                            <div style={{
                                padding: '1rem',
                                backgroundColor: 'rgba(244, 206, 20, 0.1)',
                                borderRadius: '50%',
                                color: 'var(--accent)'
                            }}>
                                <item.icon size={40} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.3rem', color: 'white', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{item.label}</h3>
                                <p style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Inclusions;
