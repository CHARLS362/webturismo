import { useState, useEffect, useMemo } from 'react';
import { Menu, X, Sun, Globe, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Fuse from 'fuse.js';
import { pucaraAttractions } from '../data/pucaraData';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredDropdown, setHoveredDropdown] = useState(null);
    const [activeSection, setActiveSection] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { t, i18n } = useTranslation();

    // Fuse.js Fuzzy Search Setup
    const fuse = useMemo(() => new Fuse(pucaraAttractions, {
        keys: ['title', 'subtitle', 'description', 'highlight'],
        threshold: 0.35
    }), []);

    const searchResults = useMemo(() => {
        return searchQuery.trim().length > 1
            ? fuse.search(searchQuery).map(r => r.item)
            : [];
    }, [searchQuery, fuse]);

    // Active Section Observer
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        const sections = [
            'pucara-destinos',
            'pucara-galeria',
            'pucara-recorrido',
            'pucara-mapa',
            'pucara-festividades',
            'pucara-tour360',
            'pucara-planificador',
            'pucara-oraculo',
            'pucara-roadmap',
            'pucara-dashboard',
            'pucara-qr-generator'
        ];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    const handleSmoothNavigate = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            setIsMenuOpen(false);
            setIsSearchOpen(false);
            const targetId = href.substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const menuStructure = [
        {
            label: t('header.nav_descubre', { defaultValue: 'Descubre' }),
            type: 'dropdown',
            items: [
                { name: 'Lugares Turísticos', href: '#pucara-destinos' },
                { name: 'Mapa de Tesoros', href: '#pucara-galeria' },
                { name: 'Walking Tour', href: '#pucara-recorrido' },
                { name: 'Mapa Cultural 3D', href: '#pucara-mapa' },
                { name: 'Paquetes Turísticos', href: '#pucara-paquetes' },
                { name: 'Festividades', href: '#pucara-festividades' },
                { name: 'Hoja de Ruta 2030', href: '#pucara-roadmap' }
            ]
        },
        {
            label: t('header.nav_experimenta', { defaultValue: 'Experimenta' }),
            type: 'dropdown',
            items: [
                { name: 'Videos & Tour 360°', href: '#pucara-tour360' },
                { name: 'Oráculo de los Apus (IA)', href: '#pucara-oraculo' },
                { name: 'Generador QR', href: '#pucara-qr-generator' }
            ]
        },
        {
            label: t('header.nav_planificador_ia', { defaultValue: 'Planificador IA' }),
            type: 'link',
            href: '#pucara-planificador'
        },
        {
            label: t('header.nav_dashboard_dti', { defaultValue: 'Smart DTI' }),
            type: 'link',
            href: '#pucara-dashboard'
        }
    ];

    return (
        <motion.header
            className="fixed w-full z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 100,
                background: isScrolled ? 'rgba(250, 246, 240, 0.96)' : 'rgba(250, 246, 240, 0.88)',
                backdropFilter: 'blur(16px)',
                padding: isScrolled ? '0.7rem 0' : '1.1rem 0',
                transition: 'all 0.4s ease',
                boxShadow: isScrolled ? '0 4px 25px rgba(11, 34, 64, 0.08)' : 'none',
                borderBottom: '1px solid rgba(184, 92, 56, 0.12)'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="#" onClick={(e) => handleSmoothNavigate(e, '#')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', zIndex: 101 }}>
                    <div style={{
                        background: 'rgba(197, 155, 39, 0.15)',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Sun size={24} style={{ color: 'var(--accent)', filter: 'drop-shadow(0 0 8px rgba(197, 155, 39, 0.5))' }} />
                    </div>
                    <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.35rem',
                        fontWeight: 900,
                        letterSpacing: '0.08em',
                        color: 'var(--primary)'
                    }}>
                        PUCARÁ <span style={{ color: 'var(--terracotta)' }}>365</span>
                    </span>
                </a>

                {/* Desktop Navigation Menu */}
                <nav className="desktop-nav" style={{ display: 'none', gap: '2rem', alignItems: 'center' }}>
                    {menuStructure.map((item, idx) => {
                        if (item.type === 'dropdown') {
                            const isDropdownActive = item.items.some(sub => sub.href.substring(1) === activeSection);
                            return (
                                <div
                                    key={idx}
                                    style={{ position: 'relative' }}
                                    onMouseEnter={() => setHoveredDropdown(idx)}
                                    onMouseLeave={() => setHoveredDropdown(null)}
                                >
                                    <button
                                        style={{
                                            color: isDropdownActive || hoveredDropdown === idx ? 'var(--terracotta)' : 'var(--primary)',
                                            fontWeight: 800,
                                            fontSize: '0.85rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.08em',
                                            padding: '0.5rem 0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.35rem',
                                            transition: 'color 0.2s',
                                            fontFamily: 'var(--font-body)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {item.label}
                                        <span style={{ fontSize: '0.55rem', transition: 'transform 0.25s', transform: hoveredDropdown === idx ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                                    </button>

                                    <AnimatePresence>
                                        {hoveredDropdown === idx && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    backgroundColor: '#FFFFFF',
                                                    border: '1px solid rgba(184, 92, 56, 0.15)',
                                                    borderRadius: '16px',
                                                    padding: '0.6rem',
                                                    minWidth: '220px',
                                                    boxShadow: 'var(--shadow-lg)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '0.2rem',
                                                    marginTop: '0.5rem'
                                                }}
                                            >
                                                {item.items.map((sub, sIdx) => {
                                                    const isActive = sub.href.substring(1) === activeSection;
                                                    return (
                                                        <a
                                                            key={sIdx}
                                                            href={sub.href}
                                                            onClick={(e) => handleSmoothNavigate(e, sub.href)}
                                                            style={{
                                                                padding: '0.6rem 1rem',
                                                                color: isActive ? 'var(--terracotta)' : 'var(--primary)',
                                                                backgroundColor: isActive ? 'rgba(184, 92, 56, 0.08)' : 'transparent',
                                                                fontSize: '0.85rem',
                                                                fontWeight: 'bold',
                                                                borderRadius: '8px',
                                                                transition: 'all 0.2s',
                                                                textDecoration: 'none'
                                                            }}
                                                        >
                                                            {sub.name}
                                                        </a>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        } else {
                            const isActive = item.href.substring(1) === activeSection;
                            return (
                                <a
                                    key={idx}
                                    href={item.href}
                                    onClick={(e) => handleSmoothNavigate(e, item.href)}
                                    style={{
                                        position: 'relative',
                                        color: isActive ? 'var(--terracotta)' : 'var(--primary)',
                                        fontWeight: 800,
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        padding: '0.5rem 0',
                                        textDecoration: 'none'
                                    }}
                                    className="nav-link"
                                >
                                    {item.label}
                                    <span style={{
                                        position: 'absolute', bottom: 0, left: 0,
                                        width: isActive ? '100%' : '0%', height: '3px',
                                        backgroundColor: 'var(--terracotta)', transition: 'width 0.3s ease'
                                    }} />
                                </a>
                            );
                        }
                    })}

                    {/* Fuzzy Search Toggle Button */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.45rem 0.9rem',
                                fontSize: '0.82rem',
                                backgroundColor: 'rgba(11, 34, 64, 0.04)',
                                color: 'var(--primary)',
                                fontWeight: 700,
                                border: '1px solid rgba(11, 34, 64, 0.12)',
                                borderRadius: '20px',
                                cursor: 'pointer'
                            }}
                        >
                            <Search size={14} style={{ color: 'var(--terracotta)' }} />
                            <span>Buscar...</span>
                        </button>

                        {/* Search Dropdown Modal */}
                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    style={{
                                        position: 'absolute',
                                        top: '120%',
                                        right: 0,
                                        width: '320px',
                                        background: 'white',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(184, 92, 56, 0.2)',
                                        boxShadow: 'var(--shadow-lg)',
                                        padding: '0.8rem',
                                        zIndex: 110
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Ej: Kalasaya, Torito, Museo..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                        style={{
                                            width: '100%',
                                            padding: '0.6rem 1rem',
                                            borderRadius: '10px',
                                            border: '1px solid rgba(11, 34, 64, 0.15)',
                                            outline: 'none',
                                            fontSize: '0.9rem',
                                            fontFamily: 'var(--font-body)',
                                            marginBottom: searchResults.length > 0 ? '0.6rem' : 0
                                        }}
                                    />

                                    {searchResults.length > 0 && (
                                        <div style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                            {searchResults.map(item => (
                                                <a
                                                    key={item.id}
                                                    href="#pucara-destinos"
                                                    onClick={(e) => handleSmoothNavigate(e, '#pucara-destinos')}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.6rem',
                                                        padding: '0.5rem',
                                                        borderRadius: '8px',
                                                        textDecoration: 'none',
                                                        color: 'var(--primary)',
                                                        transition: 'background 0.2s'
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(184, 92, 56, 0.08)'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    <img src={item.image} alt={item.title} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                                                    <div>
                                                        <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block' }}>{item.title}</span>
                                                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.highlight}</span>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Language Switcher */}
                    <button
                        onClick={toggleLanguage}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.45rem 0.9rem',
                            fontSize: '0.82rem',
                            backgroundColor: 'rgba(11, 34, 64, 0.04)',
                            color: 'var(--primary)',
                            fontWeight: 700,
                            border: '1px solid rgba(11, 34, 64, 0.12)',
                            borderRadius: '20px',
                            cursor: 'pointer'
                        }}
                    >
                        <Globe size={15} style={{ color: 'var(--bronze-gold)' }} />
                        <span style={{ textTransform: 'uppercase' }}>{i18n.language === 'es' ? '🌎 ES' : '🌎 EN'}</span>
                    </button>
                </nav>

                {/* Mobile Menu & Language Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 101 }}>
                    <button
                        onClick={toggleLanguage}
                        className="mobile-lang-btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.35rem 0.7rem',
                            fontSize: '0.75rem',
                            backgroundColor: 'rgba(11, 34, 64, 0.04)',
                            color: 'var(--primary)',
                            fontWeight: 700,
                            border: '1px solid rgba(11, 34, 64, 0.1)',
                            borderRadius: '20px',
                            cursor: 'pointer'
                        }}
                    >
                        <Globe size={13} style={{ color: 'var(--bronze-gold)' }} />
                        <span style={{ textTransform: 'uppercase' }}>{i18n.language}</span>
                    </button>
                    
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
                            backgroundColor: 'rgba(250, 246, 240, 0.98)',
                            display: 'flex', flexDirection: 'column',
                            justifyContent: 'center', alignItems: 'center', gap: '1.8rem',
                            paddingTop: '2rem', zIndex: 90
                        }}
                    >
                        {menuStructure.map((item, idx) => {
                            if (item.type === 'dropdown') {
                                return (
                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.78rem', color: 'var(--terracotta)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{item.label}</span>
                                        {item.items.map((sub, sIdx) => (
                                            <a
                                                key={sIdx}
                                                href={sub.href}
                                                onClick={(e) => handleSmoothNavigate(e, sub.href)}
                                                style={{
                                                    color: 'var(--primary)',
                                                    fontSize: '1.15rem',
                                                    fontFamily: 'var(--font-heading)',
                                                    fontWeight: 700,
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                {sub.name}
                                            </a>
                                        ))}
                                    </div>
                                );
                            } else {
                                return (
                                    <a
                                        key={idx}
                                        href={item.href}
                                        onClick={(e) => handleSmoothNavigate(e, item.href)}
                                        style={{
                                            color: 'var(--primary)',
                                            fontSize: '1.25rem',
                                            fontFamily: 'var(--font-heading)',
                                            fontWeight: 900,
                                            textDecoration: 'none',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em'
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                );
                            }
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
            
            <style>{`
                @media (min-width: 768px) {
                    .desktop-nav { display: flex !important; }
                    .mobile-toggle, .mobile-lang-btn { display: none !important; }
                }
            `}</style>
        </motion.header>
    );
};

export default Header;
