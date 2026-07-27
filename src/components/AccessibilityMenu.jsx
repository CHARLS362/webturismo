import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, Eye, RefreshCw, Volume2, Type } from 'lucide-react';

const AccessibilityMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [fontSizeLevel, setFontSizeLevel] = useState(0); // -1, 0, 1, 2
    const [isHighContrast, setIsHighContrast] = useState(false);
    const [isGrayscale, setIsGrayscale] = useState(false);
    const [isHighlightLinks, setIsHighlightLinks] = useState(false);

    // Apply adjustments on change
    useEffect(() => {
        // Adjust Font Size via HTML Root Element
        const baseSize = 16;
        const newSize = baseSize + (fontSizeLevel * 2);
        document.documentElement.style.fontSize = `${newSize}px`;
    }, [fontSizeLevel]);

    useEffect(() => {
        if (isHighContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }, [isHighContrast]);

    useEffect(() => {
        if (isGrayscale) {
            document.body.classList.add('grayscale-mode');
        } else {
            document.body.classList.remove('grayscale-mode');
        }
    }, [isGrayscale]);

    useEffect(() => {
        if (isHighlightLinks) {
            document.body.classList.add('highlight-links');
        } else {
            document.body.classList.remove('highlight-links');
        }
    }, [isHighlightLinks]);

    const handleReset = () => {
        setFontSizeLevel(0);
        setIsHighContrast(false);
        setIsGrayscale(false);
        setIsHighlightLinks(false);
    };

    // Text to Speech for general description
    const handleTextToSpeech = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            
            // Get page main elements text
            const textToRead = "Portal Turístico Pucará 365. Tierra del Toro Sagrado y de Alfareros Milenarios. " +
                "Explora nuestras rutas, atractivos como Kalasaya, el Museo Lítico, y personaliza tu propio Torito de la suerte.";
            
            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = 'es-PE'; // Peruvian Spanish
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Tu navegador no soporta lectura de voz.");
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 9999 }}>
            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    backgroundColor: isOpen ? 'var(--secondary)' : 'var(--primary)',
                    color: 'white',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(15, 44, 89, 0.3)',
                    border: '2px solid white',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                }}
                aria-label="Menú de Accesibilidad"
            >
                <Sliders size={24} />
            </motion.button>

            {/* Accessibility Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 20 }}
                        style={{
                            position: 'absolute',
                            bottom: '70px',
                            left: '0',
                            width: '280px',
                            backgroundColor: 'white',
                            border: '1px solid rgba(15, 44, 89, 0.1)',
                            borderRadius: '24px',
                            padding: '1.5rem',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.25rem',
                            color: '#1F2937'
                        }}
                    >
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                            <Sliders size={18} className="text-secondary" /> Accesibilidad Web
                        </h4>

                        {/* Adjust Font Size */}
                        <div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                                Tamaño de Letra
                            </span>
                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                {[
                                    { level: -1, label: 'A-' },
                                    { level: 0, label: 'Normal' },
                                    { level: 1, label: 'A+' },
                                    { level: 2, label: 'A++' }
                                ].map(btn => (
                                    <button
                                        key={btn.level}
                                        onClick={() => setFontSizeLevel(btn.level)}
                                        style={{
                                            flex: 1,
                                            padding: '0.4rem 0.25rem',
                                            fontSize: '0.8rem',
                                            fontWeight: 700,
                                            borderRadius: '8px',
                                            border: '1px solid #E2E8F0',
                                            backgroundColor: fontSizeLevel === btn.level ? 'var(--primary)' : 'white',
                                            color: fontSizeLevel === btn.level ? 'white' : '#4B5563',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {btn.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Visual Adjustments */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button
                                onClick={() => setIsHighContrast(!isHighContrast)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    width: '100%',
                                    padding: '0.6rem 1rem',
                                    borderRadius: '12px',
                                    border: '1px solid #E2E8F0',
                                    backgroundColor: isHighContrast ? 'rgba(15, 44, 89, 0.08)' : 'white',
                                    color: '#4B5563',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    textAlign: 'left',
                                    cursor: 'pointer'
                                }}
                            >
                                <Eye size={18} style={{ color: isHighContrast ? 'var(--primary)' : '#9CA3AF' }} />
                                <span>{isHighContrast ? 'Desactivar Contraste' : 'Alto Contraste'}</span>
                            </button>

                            <button
                                onClick={() => setIsGrayscale(!isGrayscale)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    width: '100%',
                                    padding: '0.6rem 1rem',
                                    borderRadius: '12px',
                                    border: '1px solid #E2E8F0',
                                    backgroundColor: isGrayscale ? 'rgba(15, 44, 89, 0.08)' : 'white',
                                    color: '#4B5563',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    textAlign: 'left',
                                    cursor: 'pointer'
                                }}
                            >
                                <Type size={18} style={{ color: isGrayscale ? 'var(--primary)' : '#9CA3AF' }} />
                                <span>{isGrayscale ? 'Desactivar Monocromo' : 'Escala de Grises'}</span>
                            </button>

                            <button
                                onClick={() => setIsHighlightLinks(!isHighlightLinks)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    width: '100%',
                                    padding: '0.6rem 1rem',
                                    borderRadius: '12px',
                                    border: '1px solid #E2E8F0',
                                    backgroundColor: isHighlightLinks ? 'rgba(15, 44, 89, 0.08)' : 'white',
                                    color: '#4B5563',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    textAlign: 'left',
                                    cursor: 'pointer'
                                }}
                            >
                                <Sliders size={18} style={{ color: isHighlightLinks ? 'var(--primary)' : '#9CA3AF' }} />
                                <span>{isHighlightLinks ? 'Desactivar Resaltado' : 'Resaltar Enlaces'}</span>
                            </button>
                        </div>

                        {/* Text to Speech Read out */}
                        <button
                            onClick={handleTextToSpeech}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px',
                                border: 'none',
                                backgroundColor: 'var(--secondary)',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                boxShadow: '0 4px 10px rgba(217, 95, 89, 0.2)'
                            }}
                        >
                            <Volume2 size={16} /> Escuchar Audio de Guía
                        </button>

                        {/* Reset Buttons */}
                        <button
                            onClick={handleReset}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                width: '100%',
                                padding: '0.4rem',
                                border: 'none',
                                backgroundColor: 'transparent',
                                color: '#9CA3AF',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            <RefreshCw size={12} /> Restablecer Ajustes
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AccessibilityMenu;
