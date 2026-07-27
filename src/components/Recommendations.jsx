import { Info, Heart, Camera, Droplets, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const tips = [
    {
        icon: Droplets,
        title: "Altura y Clima",
        text: "Pucará se encuentra a 3,860 msnm. El viento altiplánico puede ser fuerte; lleva ropa abrigadora, cortavientos y mantente hidratado con mate de coca."
    },
    {
        icon: Camera,
        title: "Respeto Patrimonial",
        text: "Kalasaya es un centro ceremonial sagrado. Por favor, respeta los senderos señalizados y no toques las piedras rojas ni monolitos antiguos."
    },
    {
        icon: Palette,
        title: "Alfarería Vivencial",
        text: "Durante los talleres prácticos de moldeado y pintura de arcilla con los maestros artesanos, te sugerimos usar ropa cómoda que se pueda ensuciar."
    }
];

const Recommendations = () => {
    return (
        <section className="section" style={{ backgroundColor: 'var(--bg-dark)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{
                        backgroundColor: '#FCFAF6',
                        borderRadius: '36px 12px 36px 12px',
                        padding: '4rem 3rem',
                        boxShadow: 'var(--shadow-premium)',
                        border: '4px double var(--accent)',
                        outline: '1px solid var(--terracotta)',
                        outlineOffset: '-6px'
                    }}
                >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem', justifyContent: 'center' }}>
                        <Info size={32} className="text-secondary" style={{ color: 'var(--terracotta)' }} />
                        <h2 style={{ margin: 0, fontSize: '2.2rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>Información Importante</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {tips.map((tip, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15 }}
                                viewport={{ once: true }}
                                style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
                            >
                                <div style={{
                                    padding: '1rem',
                                    backgroundColor: 'rgba(184, 92, 56, 0.08)',
                                    borderRadius: '50%',
                                    color: 'var(--terracotta)',
                                    flexShrink: 0,
                                    boxShadow: '0 4px 10px rgba(184, 92, 56, 0.08)'
                                }}>
                                    <tip.icon size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>{tip.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>{tip.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Recommendations;
