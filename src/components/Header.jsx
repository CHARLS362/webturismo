import { useState, useEffect } from 'react';
import { Menu, X, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#' },
        { name: 'Itinerario', href: '#itinerario' },
        { name: 'Exclusividad', href: '#exclusividad' },
        { name: 'Contacto', href: '#contacto' }
    ];

    return (
        <motion.header
            className="fixed w-full z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                background: 'rgba(15, 44, 89, 1)', // Solid Blue (Deep Andean Blue)
                backdropFilter: isScrolled ? 'blur(16px)' : 'none',
                padding: isScrolled ? '0.75rem 0' : '1.5rem 0',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', zIndex: 51 }}>
                    <div style={{
                        background: isScrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(5px)'
                    }}>
                        <Sun size={28} className="text-accent" style={{ color: 'var(--accent)', filter: 'drop-shadow(0 0 8px rgba(244, 206, 20, 0.5))' }} />
                    </div>
                    <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        color: 'white',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}>
                        MAGIA ANDINA
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="desktop-nav" style={{ display: 'none', gap: '2rem', alignItems: 'center' }}>
                    {navLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            style={{
                                position: 'relative',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                padding: '0.5rem 0',
                                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                            }}
                            className="nav-link"
                        >
                            {item.name}
                            <span className="link-underline" style={{
                                position: 'absolute', bottom: 0, left: 0, width: '0%', height: '3px',
                                backgroundColor: 'var(--accent)', transition: 'width 0.3s ease',
                                boxShadow: '0 0 10px var(--accent)'
                            }} />
                        </a>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn"
                        style={{
                            padding: '0.75rem 2rem',
                            fontSize: '0.9rem',
                            backgroundColor: 'var(--accent)',
                            color: 'var(--primary)',
                            fontWeight: 800,
                            letterSpacing: '0.05em',
                            border: 'none',
                            borderRadius: '50px',
                            boxShadow: '0 4px 15px rgba(244, 206, 20, 0.4)'
                        }}
                    >
                        RESERVAR
                    </motion.button>

                    <style>{`
                        @media (min-width: 768px) {
                            .desktop-nav { display: flex !important; }
                            .mobile-toggle { display: none !important; }
                        }
                        .nav-link:hover .link-underline { width: 100% !important; }
                        .nav-link:hover { color: var(--accent) !important; }
                    `}</style>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{ color: 'white', zIndex: 51, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                >
                    {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%',
                            backgroundColor: 'var(--primary)',
                            display: 'flex', flexDirection: 'column',
                            justifyContent: 'center', alignItems: 'center', gap: '2rem',
                            paddingTop: '4rem', zIndex: 40
                        }}
                    >
                        {navLinks.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                style={{
                                    color: 'white',
                                    fontSize: '1.5rem',
                                    fontFamily: 'var(--font-heading)',
                                    fontWeight: 600
                                }}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;
