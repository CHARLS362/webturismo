import { Info, Camera, Droplets, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const tips = [
    {
        icon: Droplets,
        title: { es: "Altura y Clima", en: "Altitude and Climate" },
        text: { 
            es: "Pucará se encuentra a 3,860 msnm. El viento altiplánico puede ser fuerte; lleva ropa abrigadora, cortavientos y mantente hidratado con mate de coca.", 
            en: "Pucará is located at 3,860 meters above sea level. Altiplano winds can be strong; wear warm clothes, windbreakers, and stay hydrated with coca tea." 
        }
    },
    {
        icon: Camera,
        title: { es: "Respeto Patrimonial", en: "Heritage Respect" },
        text: { 
            es: "Kalasaya es un centro ceremonial sagrado. Por favor, respeta los senderos señalizados y no toques las piedras rojas ni monolitos antiguos.", 
            en: "Kalasaya is a sacred ceremonial center. Please respect the marked paths and do not touch the red stones or ancient monoliths." 
        }
    },
    {
        icon: Palette,
        title: { es: "Alfarería Vivencial", en: "Experiential Pottery" },
        text: { 
            es: "Durante los talleres prácticos de moldeado y pintura de arcilla con los maestros artesanos, te sugerimos usar ropa cómoda que se pueda ensuciar.", 
            en: "During hands-on clay molding and painting workshops with master artisans, we suggest wearing comfortable clothes that can get dirty." 
        }
    }
];

const Recommendations = () => {
    const { i18n } = useTranslation();
    const isEn = i18n.language === 'en';
    const langKey = isEn ? 'en' : 'es';

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
                        <h2 style={{ margin: 0, fontSize: '2.2rem', color: 'var(--primary)', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                            {isEn ? 'Important Information' : 'Información Importante'}
                        </h2>
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
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                                        {tip.title[langKey]}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                                        {tip.text[langKey]}
                                    </p>
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
