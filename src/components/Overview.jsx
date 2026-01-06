import { useState, useEffect } from 'react';
import { Mountain, Utensils, Waves, Users, CheckCircle, ArrowRight, Star, Heart, Camera, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const interestsList = [
    { id: 'culture', label: 'Cultura Ancestral', icon: <Users size={18} /> },
    { id: 'nature', label: 'Naturaleza & Fauna', icon: <Waves size={18} /> },
    { id: 'adventure', label: 'Aventura & Adrenalina', icon: <Mountain size={18} /> },
    { id: 'gastronomy', label: 'Gastronomía Gourmet', icon: <Utensils size={18} /> },
    { id: 'spirituality', label: 'Espiritualidad', icon: <Star size={18} /> },
    { id: 'luxury', label: 'Confort & Lujo', icon: <Heart size={18} /> }
];

const activitiesList = [
    { id: 'trekking', label: 'Trekking de Altura', icon: <Map size={18} /> },
    { id: 'kayak', label: 'Kayak en Titicaca', icon: <Waves size={18} /> },
    { id: 'photo', label: 'Fotografía', icon: <Camera size={18} /> },
    { id: 'cooking', label: 'Clases de Cocina', icon: <Utensils size={18} /> },
    { id: 'mystic', label: 'Rituales Andinos', icon: <Star size={18} /> }
];

const getRecommendation = (interests, activities) => {
    // Logic to determine the best 30-day package based on selection
    if (interests.includes('adventure') || activities.includes('trekking')) {
        return {
            id: 'adventure',
            title: "Expedición Andina Total (30 Días)",
            desc: "Un mes desafiando tus límites. Incluye trekking al nevado Allincapac, kayak extremo en el lado este del lago y camping de lujo bajo las estrellas.",
            image: "https://images.unsplash.com/photo-1528543045752-dfa806c9a9d7?q=80&w=2574&auto=format&fit=crop"
        };
    }
    if (interests.includes('luxury') || interests.includes('gastronomy')) {
        return {
            id: 'luxury',
            title: "Andes Gourmet & Relax (30 Días)",
            desc: "La combinación perfecta de descanso y placer. 30 días recorriendo las estancias más exclusivas, con chefs privados y spa andino diario.",
            image: "https://images.unsplash.com/photo-1557007559-006371cb2b11?q=80&w=2000&auto=format&fit=crop"
        };
    }
    if (interests.includes('spirituality') || activities.includes('mystic')) {
        return {
            id: 'mystic',
            title: "Ruta Mística Ancestral (30 Días)",
            desc: "Reconecta con el origen. Un viaje espiritual profundo visitando todos los templos sagrados, con ceremonias de pago a la tierra y meditación diaria.",
            image: "https://images.unsplash.com/photo-1535942475143-52467d5ae34f?q=80&w=2600&auto=format&fit=crop"
        };
    }
    if (interests.includes('nature') || activities.includes('photo')) {
        return {
            id: 'nature',
            title: "Santuario Natural Titicaca (30 Días)",
            desc: "Para los amantes de la biodiversidad. Expediciones fotográficas diarias a islas remotas, avistamiento de aves endémicas y atardeceres únicos.",
            image: "src/assets/image/portada.png"
        };
    }
    // Default
    return {
        id: 'standard',
        title: "Gran Tour Magia Andina (30 Días)",
        desc: "La experiencia definitiva. Lo mejor de todos los mundos: cultura, naturaleza y gastronomía equilibrados perfectamente en un itinerario inolvidable.",
        images: [
            "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/a7/1d/86.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixjOgUyPY8xG-6BH-jGpaDgMFv9231fE1TA&s",
            "https://chijnayafoundation.org/wp-content/uploads/2022/05/Diadel-torito3-scaled.jpg"
        ]
    };
};

const Overview = ({ onSelectPackage }) => {
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);

    const toggleSelection = (list, setList, item) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const recommendation = getRecommendation(selectedInterests, selectedActivities);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [recommendation.id]);

    useEffect(() => {
        if (!recommendation.images) return;
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % recommendation.images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [recommendation]);

    return (
        <section className="section bg-white" id="exclusividad">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <span className="text-accent" style={{ fontStyle: 'italic', fontWeight: '500' }}>Diseña tu Viaje</span>
                    <h2 style={{ color: 'var(--primary)', marginTop: '0.5rem' }}>Personaliza tu Experiencia de 30 Días</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)' }}>
                        Selecciona tus intereses y actividades favoritas para que nuestra IA turística te recomiende el paquete mensual ideal.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'start'
                }} className="profile-grid">

                    {/* Left Column: Selection Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Interests */}
                        <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: '16px' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Heart size={20} className="text-accent" /> Tus Intereses
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {interestsList.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => toggleSelection(selectedInterests, setSelectedInterests, item.id)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '50px',
                                            border: `1px solid ${selectedInterests.includes(item.id) ? 'var(--primary)' : '#e2e8f0'}`,
                                            backgroundColor: selectedInterests.includes(item.id) ? 'var(--primary)' : 'white',
                                            color: selectedInterests.includes(item.id) ? 'white' : 'var(--text-muted)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {item.icon} {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Activities */}
                        <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: '16px' }}>
                            <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mountain size={20} className="text-accent" /> Actividades Preferidas
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {activitiesList.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => toggleSelection(selectedActivities, setSelectedActivities, item.id)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '50px',
                                            border: `1px solid ${selectedActivities.includes(item.id) ? 'var(--primary)' : '#e2e8f0'}`,
                                            backgroundColor: selectedActivities.includes(item.id) ? 'var(--primary)' : 'white',
                                            color: selectedActivities.includes(item.id) ? 'white' : 'var(--text-muted)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {item.icon} {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Recommendation Result */}
                    <div style={{ position: 'sticky', top: '100px' }}>
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={recommendation.title}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
                                    border: '1px solid rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ height: '250px', position: 'relative' }}>
                                    <motion.img
                                        key={recommendation.images ? recommendation.images[currentImageIndex] : recommendation.image}
                                        src={recommendation.images ? recommendation.images[currentImageIndex] : recommendation.image}
                                        alt={recommendation.title}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                        <span style={{ backgroundColor: 'var(--accent)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                            Recomendado para ti
                                        </span>
                                    </div>
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <h3 style={{ color: 'var(--primary)', fontSize: '1.6rem', marginBottom: '1rem', lineHeight: 1.2 }}>
                                        {recommendation.title}
                                    </h3>
                                    <p style={{ color: 'var(--text)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                        {recommendation.desc}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <button
                                            className="btn btn-primary"
                                            style={{ flex: 1, justifyContent: 'center' }}
                                            onClick={() => {
                                                if (onSelectPackage) onSelectPackage(recommendation.id);
                                                document.getElementById('itinerario')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                        >
                                            Ver Itinerario 30 Días
                                        </button>
                                        <button style={{
                                            padding: '0.75rem',
                                            border: '1px solid var(--primary)',
                                            borderRadius: '50%',
                                            color: 'var(--primary)',
                                            backgroundColor: 'transparent',
                                            cursor: 'pointer'
                                        }}>
                                            <Heart size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <style>{`
                        @media (max-width: 900px) {
                            .profile-grid {
                                grid-template-columns: 1fr !important;
                                gap: 2rem !important;
                            }
                        }
                    `}</style>
                </div>
            </div>
        </section>
    );
};

export default Overview;
