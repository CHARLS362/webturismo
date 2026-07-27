import { CheckCircle, ShieldCheck, Coffee, Tent, Car, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const inclusions = [
    { icon: Tent, label: "Alojamiento Confortable", text: "Posadas acogedoras y cabañas de montaña con encanto local." },
    { icon: Coffee, label: "Gastronomía Andina", text: "Desayunos altiplánicos y almuerzos tradicionales con trucha andina y quinua orgánica." },
    { icon: Car, label: "Transporte Privado", text: "Traslados seguros de ida y vuelta desde el aeropuerto de Juliaca o la ciudad de Puno." },
    { icon: Palette, label: "Materiales de Alfarería", text: "Arcilla, pinturas tradicionales, pinceles y uso de hornos de leña en los talleres." },
    { icon: CheckCircle, label: "Todo Incluido", text: "Entradas a Kalasaya y al Museo Lítico, y guiado oficial por historiadores locales." }
];

const Inclusions = () => {
    return (
        <section className="section bg-blue-contrast" id="inclusiones" style={{ position: 'relative', overflow: 'hidden', padding: '6.5rem 0' }}>
            {/* Background Pattern */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(15, 44, 89, 0.03) 1px, transparent 1px)',
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
                    <span className="script-subtitle">Sin Preocupaciones...</span>
                    <h2 className="bold-title">Todo Incluido en tu Experiencia</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>Nos ocupamos de cada detalle logístico para que tu única responsabilidad sea disfrutar y conectar.</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {inclusions.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`card ${i % 3 === 0 ? 'card-terracotta' : i % 3 === 1 ? 'card-primary' : 'card-green'}`}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                gap: '1.5rem',
                                cursor: 'default',
                                padding: '2.5rem'
                            }}
                            whileHover={{ y: -10, boxShadow: 'var(--shadow-premium)' }}
                        >
                            <div style={{
                                padding: '1rem',
                                backgroundColor: 'rgba(184, 92, 56, 0.08)',
                                borderRadius: '50%',
                                color: 'var(--terracotta)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 10px rgba(184, 92, 56, 0.08)'
                            }}>
                                <item.icon size={36} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>{item.label}</h3>
                                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Inclusions;
