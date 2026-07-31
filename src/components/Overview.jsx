import { useState, useEffect } from 'react';
import { Mountain, Utensils, Users, Heart, Palette, Compass, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import kalasayaImg from '../assets/image/map/kalasaya.png';
import penonImg from '../assets/image/map/penon.png';
import temploImg from '../assets/image/map/templo.png';
import plazaImg from '../assets/image/map/plaza.png';
import museoImg from '../assets/image/map/museo.png';

const interestsList = [
    { id: 'artesania', label: { es: 'Alfarería & Cerámica', en: 'Pottery & Ceramics' }, icon: <Palette size={20} /> },
    { id: 'arqueologia', label: { es: 'Arqueología Pre-Inca', en: 'Pre-Inca Archaeology' }, icon: <Landmark size={20} /> },
    { id: 'trekking', label: { es: 'Trekking & Naturaleza', en: 'Trekking & Nature' }, icon: <Mountain size={20} /> },
    { id: 'gastronomia', label: { es: 'Gastronomía Local', en: 'Local Gastronomy' }, icon: <Utensils size={20} /> },
    { id: 'misticismo', label: { es: 'Misticismo & Ofrendas', en: 'Mysticism & Offerings' }, icon: <Compass size={20} /> },
    { id: 'historia', label: { es: 'Historia Colonial', en: 'Colonial History' }, icon: <Users size={20} /> }
];

const activitiesList = [
    { id: 'moldear', label: { es: 'Moldeado de Arcilla', en: 'Clay Molding' }, icon: <Palette size={20} /> },
    { id: 'escalar', label: { es: 'Escalar el Peñón', en: 'Climbing the Lookout' }, icon: <Mountain size={20} /> },
    { id: 'monolitos', label: { es: 'Explorar Kalasaya', en: 'Explore Kalasaya' }, icon: <Landmark size={20} /> },
    { id: 'queso', label: { es: 'Cata de Quesos', en: 'Cheese Tasting' }, icon: <Utensils size={20} /> },
];

const getRecommendation = (interests, activities, isEn) => {
    if (interests.includes('trekking') || activities.includes('escalar') || activities.includes('pago')) {
        return {
            id: 'adventure',
            title: isEn ? "Adventure & Mysticism in Pucará" : "Aventura y Misticismo en Pucará",
            desc: isEn 
              ? "Designed for free spirits. Trekking to the great Pucará Lookout (Lampa, Puno), Pachamama payment ceremonies with coca, and altitude campings."
              : "Diseñado para espíritus libres. Trekking al gran Peñón de Pucará (Lampa, Puno), ceremonias de pago a la Pachamama con coca y campamentos de altura.",
            images: [penonImg, kalasayaImg]
        };
    }
    if (interests.includes('artesania') || activities.includes('moldear') || interests.includes('historia') || activities.includes('queso')) {
        return {
            id: 'luxury',
            title: isEn ? "Baroque-Pottery Immersion" : "Inmersión Barroco-Alfarera",
            desc: isEn 
              ? "A high-end experience combining traditional Andean art in Pucará with pottery workshops, colonial history, and highland gastronomy of Puno."
              : "Una experiencia de alta gama que combina arte tradicional andino en Pucará con talleres de cerámica, historia colonial y gastronomía altiplánica de Puno.",
            images: [plazaImg, temploImg]
        };
    }
    return {
        id: 'standard',
        title: isEn ? "Essential Pucará" : "Pucará Esencial",
        desc: isEn 
              ? "The definitive tour. Discover the sacred temple of Kalasaya, the Lytic Museum, and the history of the Torito de Pucará in Lampa, Puno."
              : "El recorrido definitivo. Conoce el templo sagrado de Kalasaya, el Museo Lítico y la historia del Torito de Pucará en Lampa, Puno.",
        images: [temploImg, museoImg]
    };
};

const Overview = ({ onSelectPackage }) => {
    const { i18n } = useTranslation();
    const isEn = i18n.language === 'en';
    const langKey = isEn ? 'en' : 'es';

    const [selectedInterests, setSelectedInterests] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);

    const toggleSelection = (list, setList, item) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const recommendation = getRecommendation(selectedInterests, selectedActivities, isEn);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [prevRecId, setPrevRecId] = useState(recommendation.id);

    if (recommendation.id !== prevRecId) {
        setPrevRecId(recommendation.id);
        setCurrentImageIndex(0);
    }

    useEffect(() => {
        if (!recommendation.images) return;
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % recommendation.images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [recommendation]);

    return (
        <section className="section bg-blue-base" id="exclusividad" style={{ position: 'relative', overflow: 'hidden' }}>
            
            <div className="container">
                {/* Header in Larana Style */}
                <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                    <span className="script-subtitle">{isEn ? 'Design Your Experience in...' : 'Diseña tu Experiencia en...'}</span>
                    <h2 className="bold-title">{isEn ? 'Customize Your Pucará 365 Route' : 'Personaliza tu Ruta Pucará 365'}</h2>
                    <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--accent)', margin: '0 auto 1.5rem auto', borderRadius: '2px' }} />
                    <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        {isEn 
                          ? 'Select your interests and preferred activities to instantly generate the ideal itinerary for you.'
                          : 'Selecciona tus intereses y actividades preferidas para generar de manera instantánea el itinerario ideal para ti.'}
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'start'
                }} className="profile-grid">

                    {/* Left Column: Interactive Cards (White glass panels with Navy text) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        
                        {/* Interests Selection Box */}
                        <div className="card card-terracotta" style={{ padding: '2.5rem' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                                <Heart size={22} className="text-secondary" style={{ color: 'var(--secondary)' }} /> {isEn ? '1. What are you interested in exploring?' : '1. ¿Qué te interesa explorar?'}
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                                {interestsList.map((item) => {
                                    const isSelected = selectedInterests.includes(item.id);
                                    return (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => toggleSelection(selectedInterests, setSelectedInterests, item.id)}
                                            whileHover={{ y: -4, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{
                                                padding: '1.25rem 1rem',
                                                borderRadius: '20px',
                                                border: `2px solid ${isSelected ? 'var(--primary)' : 'rgba(15, 44, 89, 0.1)'}`,
                                                backgroundColor: isSelected ? 'var(--primary)' : 'rgba(15, 44, 89, 0.03)',
                                                color: isSelected ? 'white' : 'var(--primary)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.75rem',
                                                fontSize: '0.9rem',
                                                fontWeight: 800,
                                                boxShadow: isSelected ? '0 10px 20px rgba(15, 44, 89, 0.15)' : 'none',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <div style={{
                                                color: isSelected ? 'var(--accent)' : 'var(--secondary)',
                                                transition: 'color 0.2s'
                                            }}>
                                                {item.icon}
                                            </div>
                                            <span style={{ textAlign: 'center' }}>{item.label[langKey]}</span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Activities Selection Box */}
                        <div className="card card-primary" style={{ padding: '2.5rem' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                                <Compass size={22} className="text-secondary" style={{ color: 'var(--terracotta)' }} /> {isEn ? '2. What activities do you prefer?' : '2. ¿Qué actividades prefieres?'}
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                                {activitiesList.map((item) => {
                                    const isSelected = selectedActivities.includes(item.id);
                                    return (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => toggleSelection(selectedActivities, setSelectedActivities, item.id)}
                                            whileHover={{ y: -4, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            style={{
                                                padding: '1.25rem 1rem',
                                                borderRadius: '20px',
                                                border: `2px solid ${isSelected ? 'var(--primary)' : 'rgba(15, 44, 89, 0.1)'}`,
                                                backgroundColor: isSelected ? 'var(--primary)' : 'rgba(15, 44, 89, 0.03)',
                                                color: isSelected ? 'white' : 'var(--primary)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.75rem',
                                                fontSize: '0.9rem',
                                                fontWeight: 800,
                                                boxShadow: isSelected ? '0 10px 20px rgba(15, 44, 89, 0.15)' : 'none',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <div style={{
                                                color: isSelected ? 'var(--accent)' : 'var(--terracotta)',
                                                transition: 'color 0.2s'
                                            }}>
                                                {item.icon}
                                            </div>
                                            <span style={{ textAlign: 'center' }}>{item.label[langKey]}</span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Recommendation Glass Panel */}
                    <div style={{ position: 'sticky', top: '100px' }}>
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={recommendation.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className="glass-panel"
                                style={{
                                    borderRadius: '32px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(15, 44, 89, 0.08)'
                                }}
                            >
                                <div style={{ height: '280px', position: 'relative', overflow: 'hidden' }}>
                                    <motion.img
                                        key={recommendation.images ? recommendation.images[currentImageIndex] : recommendation.image}
                                        src={recommendation.images ? recommendation.images[currentImageIndex] : recommendation.image}
                                        alt={recommendation.title}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6 }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(15, 44, 89, 0.95) 0%, rgba(15, 44, 89, 0.3) 60%, transparent 100%)',
                                        zIndex: 1
                                    }} />
                                    
                                    <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', zIndex: 2 }}>
                                        <span style={{
                                            backgroundColor: 'var(--accent)',
                                            color: 'var(--primary)',
                                            padding: '0.45rem 1.2/rem',
                                            borderRadius: '30px',
                                            fontSize: '0.8rem',
                                            fontWeight: 900,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            boxShadow: '0 4px 12px rgba(204, 156, 86, 0.3)'
                                        }}>
                                            {isEn ? 'Recommended for you' : 'Recomendado para ti'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div style={{ padding: '2.5rem 3rem' }}>
                                    <h3 style={{ color: 'var(--primary)', fontSize: '1.75rem', marginBottom: '1rem', lineHeight: 1.2, fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                                        {recommendation.title}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1.05rem', fontWeight: 600 }}>
                                        {recommendation.desc}
                                    </p>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <motion.button
                                            whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(15, 44, 89, 0.25)' }}
                                            whileTap={{ scale: 0.97 }}
                                            className="btn"
                                            style={{ 
                                                flex: 1, 
                                                justifyContent: 'center', 
                                                padding: '1.1rem', 
                                                borderRadius: '16px',
                                                backgroundColor: 'var(--primary)',
                                                color: 'white',
                                                fontWeight: 900,
                                                fontSize: '0.95rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            }}
                                            onClick={() => {
                                                if (onSelectPackage) onSelectPackage(recommendation.id);
                                                document.getElementById('itinerario')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                        >
                                            {isEn ? 'View Full Itinerary' : 'Ver Itinerario Completo'}
                                        </motion.button>
                                        <motion.button 
                                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(15, 44, 89, 0.06)' }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                padding: '1.1rem',
                                                border: '2px solid var(--primary)',
                                                borderRadius: '16px',
                                                color: 'var(--primary)',
                                                backgroundColor: 'transparent',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onClick={() => {
                                                if (onSelectPackage) onSelectPackage(recommendation.id);
                                                document.getElementById('pucara-planificador')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            title={isEn ? 'Configure amulet' : 'Configurar amuleto'}
                                        >
                                            <Palette size={20} />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <style>{`
                        @media (max-width: 900px) {
                            .profile-grid {
                                grid-template-columns: 1fr !important;
                                gap: 2.5rem !important;
                            }
                        }
                    `}</style>
                </div>
            </div>
        </section>
    );
};

export default Overview;
