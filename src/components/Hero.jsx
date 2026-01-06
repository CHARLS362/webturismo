import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            overflow: 'hidden'
        }}>
            {/* Parallax Background */}
            <motion.div style={{
                position: 'absolute', inset: 0,
                y,
                backgroundImage: 'linear-gradient(to bottom, rgba(15, 44, 89, 0.3), rgba(15, 44, 89, 0.7)), url("https://media.traveler.es/photos/63a6f462777730b397020ac4/1:1/w_960,c_limit/GettyImages-523528056.jpg")', // Authentic Puno/Titicaca
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: -1
            }} />

            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <motion.div
                    style={{ opacity }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: '0.8em' }}
                        animate={{ opacity: 1, letterSpacing: '0.2em' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            display: 'block',
                            color: 'var(--accent)',
                            textTransform: 'uppercase',
                            fontSize: '1.1rem',
                            marginBottom: '1.5rem',
                            fontWeight: 700,
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                        }}
                    >
                        Paquete Exclusivo 30 Días
                    </motion.span>

                    <h1 style={{
                        color: 'white', // Explicitly set to override global h1
                        fontSize: 'min(5rem, 12vw)',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1,
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                    }}>
                        Magia Andina del Titicaca
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        maxWidth: '700px',
                        margin: '0 auto 2.5rem',
                        lineHeight: 1.6,
                        color: '#F3F4F6',
                        fontWeight: 300,
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        Un viaje de inmersión cultural, naturaleza virgen y lujo auténtico para reconectar con el origen.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary"
                            style={{ backgroundColor: 'var(--accent)', color: 'var(--primary)', border: 'none' }}
                            onClick={() => document.getElementById('itinerario').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Ver Itinerario Completo
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            className="btn"
                            style={{ border: '2px solid white', color: 'white' }}
                            onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Consultar Disponibilidad <ArrowRight size={18} />
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute', bottom: '2rem', left: '0', right: '0', textAlign: 'center',
                    color: 'white', opacity: 0.8
                }}
            >
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Descubre más</span>
            </motion.div>
        </section>
    );
};

export default Hero;
