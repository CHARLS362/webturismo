import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import 'yet-another-react-lightbox/styles.css';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';
import { ArrowRight, Maximize2, ChevronLeft, ChevronRight, Sparkles, Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Local Pucará assets (Puno / Lampa)
import kalasayaImg from '../assets/image/map/kalasaya.png';
import penonImg from '../assets/image/map/penon.png';
import temploImg from '../assets/image/map/templo.png';
import plazaImg from '../assets/image/map/plaza.png';
import museoImg from '../assets/image/map/museo.png';

const heroSlides = [
    {
        id: 1,
        title: {
            es: "Tierra del Barro Sagrado y Toritos Milenarios",
            en: "Land of the Sacred Clay and Millenary Toritos"
        },
        subtitle: {
            es: "Cultura Pucará · Lampa, Puno",
            en: "Pucará Culture · Lampa, Puno"
        },
        src: temploImg,
        alt: "Templo colonial de Santa Isabel en Pucará, Lampa, Puno"
    },
    {
        id: 2,
        title: {
            es: "Complejo Arqueológico Kalasaya",
            en: "Kalasaya Archaeological Complex"
        },
        subtitle: {
            es: "Templo Sagrado del Altiplano",
            en: "Sacred Temple of the Altiplano"
        },
        src: kalasayaImg,
        alt: "Pirámide y terrazas ceremoniales de Kalasaya"
    },
    {
        id: 3,
        title: {
            es: "Museo Lítico y Esculturas Ancestrales",
            en: "Lytic Museum and Ancestral Sculptures"
        },
        subtitle: {
            es: "Guardianes de Piedra de Pucará",
            en: "Stone Guardians of Pucará"
        },
        src: museoImg,
        alt: "Esculturas y monolitos prehispánicos de Pucará"
    },
    {
        id: 4,
        title: {
            es: "El Gran Peñón Mirador de Pucará",
            en: "The Great Pucará Lookout"
        },
        subtitle: {
            es: "A 3,860 metros en el Altiplano",
            en: "At 3,860 meters in the Altiplano"
        },
        src: penonImg,
        alt: "El Peñón rocoso mirador de Pucará, Puno"
    },
    {
        id: 5,
        title: {
            es: "Plaza Bolívar y Tradición Alfarera",
            en: "Bolivar Plaza and Pottery Tradition"
        },
        subtitle: {
            es: "Corazón Artesanal de Lampa y Puno",
            en: "Artisanal Heart of Lampa and Puno"
        },
        src: plazaImg,
        alt: "Plaza de Armas de Pucará y talleres tradicionales"
    },
    {
        id: 6,
        title: {
            es: "Iconografía y Mística de Pucará",
            en: "Iconography and Mysticism of Pucará"
        },
        subtitle: {
            es: "Arte Ancestral del Altiplano",
            en: "Ancestral Art of the Altiplano"
        },
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhyFp1WYrz1AiauNeFV7aXZNgHCTl6ksc7zw2ALiyM_g&s=10",
        alt: "Arte e iconografía tradicional de Pucará"
    }
];

const Hero = () => {
    const { i18n } = useTranslation();
    const isEn = i18n.language === 'en';
    const langKey = isEn ? 'en' : 'es';

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 8 });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        
        const initTimer = setTimeout(() => {
            onSelect();
        }, 0);

        emblaApi.on('select', onSelect);
        const timer = setInterval(() => {
            if (emblaApi.canScrollNext()) emblaApi.scrollNext();
        }, 6000);
        return () => {
            clearTimeout(initTimer);
            clearInterval(timer);
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    const sequence = isEn ? [
        'Land of the Sacred Clay and Toritos in Lampa, Puno.',
        2500,
        'Discover the Archaeological Complex of Kalasaya.',
        2500,
        'Immerse yourself in the Ancestral Pottery of Pucará.',
        2500,
        'An immersive tourist experience in the Altiplano.',
        2500
    ] : [
        'Tierra del Barro Sagrado y los Toritos en Lampa, Puno.',
        2500,
        'Descubre el Complejo Arqueológico de Kalasaya.',
        2500,
        'Sumérgete en la Alfarería Ancestral de Pucará.',
        2500,
        'Una experiencia turística inmersiva en el Altiplano.',
        2500
    ];

    return (
        <section style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', color: 'white' }}>
            
            {/* Embla Slider Fullscreen Background */}
            <div ref={emblaRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    {heroSlides.map((slide, idx) => (
                        <div
                            key={slide.id}
                            style={{
                                flex: '0 0 100%',
                                minWidth: 0,
                                position: 'relative',
                                height: '100%',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Ken Burns background zoom animation */}
                            <motion.div
                                animate={{ scale: selectedIndex === idx ? [1, 1.08] : 1 }}
                                transition={{ duration: 7, ease: "linear" }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(${slide.src})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />

                            {/* Warm Gradient Overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(180deg, rgba(11, 34, 64, 0.45) 0%, rgba(11, 34, 64, 0.75) 50%, rgba(11, 34, 64, 0.92) 100%)'
                            }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Overlay */}
            <div className="container" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                width: '100%',
                textAlign: 'center'
            }}>
                {/* Badge Tag */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.45rem 1.25rem',
                        borderRadius: '50px',
                        background: 'rgba(197, 155, 39, 0.18)',
                        border: '1px solid rgba(197, 155, 39, 0.5)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--accent)',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '1.5rem'
                    }}
                >
                    <Sparkles size={16} color="var(--accent)" />
                    {heroSlides[selectedIndex].subtitle[langKey]}
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    key={`title-${selectedIndex}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(3rem, 7vw, 6rem)',
                        fontWeight: 900,
                        lineHeight: 1.05,
                        color: 'white',
                        marginBottom: '1rem',
                        textShadow: '0 8px 30px rgba(0,0,0,0.6)'
                    }}
                >
                    PUCARÁ <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)' }}>365</span>
                </motion.h1>

                {/* Typewriter subtitle */}
                <div style={{ height: '3.2rem', marginBottom: '2rem' }}>
                    <TypeAnimation
                        key={langKey}
                        sequence={sequence}
                        wrapper="p"
                        speed={50}
                        repeat={Infinity}
                        style={{
                            fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                            color: '#F3ECE3',
                            fontWeight: 400,
                            maxWidth: '800px',
                            margin: '0 auto',
                            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                        }}
                    />
                </div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}
                >
                    <button
                        className="btn btn-primary"
                        style={{ fontSize: '1rem', padding: '1rem 2.2rem' }}
                        onClick={() => document.getElementById('pucara-destinos')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <Compass size={20} /> {isEn ? 'Explore Attractions' : 'Explorar Atractivos'}
                    </button>
                    <button
                        className="btn btn-accent"
                        style={{ fontSize: '1rem', padding: '1rem 2.2rem' }}
                        onClick={() => document.getElementById('pucara-planificador')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        {isEn ? 'Plan My Trip' : 'Planificar Mi Viaje'} <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={() => setLightboxOpen(true)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '1rem 1.5rem',
                            borderRadius: '50px',
                            background: 'rgba(255, 255, 255, 0.12)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: 'white',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'var(--transition-smooth)'
                        }}
                        title={isEn ? 'View photo in fullscreen' : 'Ver foto a pantalla completa'}
                    >
                        <Maximize2 size={18} /> {isEn ? 'Preview Image' : 'Previsualizar Imagen'}
                    </button>
                </motion.div>

                {/* Stats Counter Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        display: 'inline-flex',
                        gap: '2.5rem',
                        padding: '0.85rem 2rem',
                        borderRadius: '20px',
                        background: 'rgba(11, 34, 64, 0.65)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(197, 155, 39, 0.3)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                >
                    <div>
                        <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent)', display: 'block' }}>
                            +<CountUp end={2000} duration={2.5} />
                        </span>
                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>
                            {isEn ? 'Years of History' : 'Años Historia'}
                        </span>
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.15)' }} />
                    <div>
                        <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent)', display: 'block' }}>
                            <CountUp end={3860} duration={2} separator="," />m
                        </span>
                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>
                            {isEn ? 'Altiplano Altitude' : 'Altitud Altiplano'}
                        </span>
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.15)' }} />
                    <div>
                        <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent)', display: 'block' }}>
                            <CountUp end={5} duration={1.5} />
                        </span>
                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>
                            {isEn ? 'Sacred Places' : 'Puntos Sagrados'}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Controls: Navigation Arrows & Thumbnails */}
            <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: 0,
                right: 0,
                zIndex: 20,
                padding: '0 var(--spacing-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Arrow Controls */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={scrollPrev}
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: 'rgba(11, 34, 64, 0.65)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <button
                        onClick={scrollNext}
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: 'rgba(11, 34, 64, 0.65)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>

                {/* Thumbnails Bar */}
                <div style={{ display: 'flex', gap: '0.6rem', background: 'rgba(11, 34, 64, 0.6)', padding: '0.4rem 0.6rem', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                    {heroSlides.map((slide, idx) => (
                        <div
                            key={slide.id}
                            onClick={() => scrollTo(idx)}
                            style={{
                                width: '48px',
                                height: '32px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: selectedIndex === idx ? '2px solid var(--accent)' : '2px solid transparent',
                                opacity: selectedIndex === idx ? 1 : 0.6,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <img src={slide.src} alt={slide.title[langKey]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* YARL Lightbox modal */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={selectedIndex}
                slides={heroSlides.map(slide => ({ src: slide.src, alt: slide.title[langKey] }))}
                plugins={[Zoom, Fullscreen]}
            />

        </section>
    );
};

export default Hero;
