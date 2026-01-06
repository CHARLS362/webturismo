import { Info, Heart, Camera, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const tips = [
    {
        icon: Droplets,
        title: "Altura y Salud",
        text: "Puno está a 3,827 msnm. Beber mucha agua y mate de coca. Evitar alcohol y comidas pesadas los primeros 2 días."
    },
    {
        icon: Camera,
        title: "Etiqueta Cultural",
        text: "Siempre pedir permiso antes de fotografiar a las personas. El respeto es la base de nuestra conexión trasciende el idioma."
    },
    {
        icon: Heart,
        title: "Ritmo y Bienestar",
        text: "Caminaremos 'despacito'. Nuestros guías monitorean su oxigenación diariamente. Disponemos de oxígeno en todo momento."
    }
];

const Recommendations = () => {
    return (
        <section className="section" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        padding: '3rem 2rem',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid rgba(0,0,0,0.03)'
                    }}
                >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '3rem', justifyContent: 'center' }}>
                        <Info size={32} className="text-accent" />
                        <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--primary)' }}>Información Importante</h2>
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
                                    backgroundColor: '#eef2ff',
                                    borderRadius: '50%',
                                    color: 'var(--primary)',
                                    flexShrink: 0,
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <tip.icon size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 700 }}>{tip.title}</h3>
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
