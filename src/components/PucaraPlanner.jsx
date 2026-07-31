import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
    Calendar, 
    Compass, 
    Palette, 
    Send, 
    CheckCircle2, 
    ChevronRight, 
    Gift, 
    Sparkles, 
    Brain, 
    Cpu, 
    Clock, 
    AlertTriangle, 
    HelpCircle 
} from 'lucide-react';
import { suggestedRoutes, toritoColors, lockedToritoSkins } from '../data/pucaraData';
import { toast } from 'sonner';

const Torito3D = lazy(() => import('./Torito3D'));

const PucaraPlanner = ({ initialToritoColor, unlockedSkins = [] }) => {
    const { t, i18n } = useTranslation();

    // Mode Selector: 'classic' or 'ai'
    const [plannerMode, setPlannerMode] = useState('ai'); 

    // Classic Planner State
    const [selectedDuration, setSelectedDuration] = useState('full'); // 'half', 'full', 'weekend'
    const [selectedInterest, setSelectedInterest] = useState('artesania'); // 'cultura', 'artesania', 'aventura'
    const activeRoute = suggestedRoutes.find(route => {
        const isHalf = selectedDuration === 'half' && route.id === 'express';
        const isFull = selectedDuration === 'full' && route.id === 'artesanal';
        const isWeekend = selectedDuration === 'weekend' && route.id === 'aventura';
        
        return isHalf || isFull || isWeekend;
    }) || suggestedRoutes[1];

    // AI Itinerary Planner State
    const [aiDays, setAiDays] = useState('2'); // '1', '2', '3'
    const [aiFocus, setAiFocus] = useState('cultural'); // 'cultural', 'aventura', 'misticismo'
    const [aiAclimatacion, setAiAclimatacion] = useState('bajo'); // 'bajo', 'medio', 'alto'
    const [aiLoading, setAiLoading] = useState(false);
    const [aiLoadingStep, setAiLoadingStep] = useState(0);
    const [aiItinerary, setAiItinerary] = useState(null);

    // AI Quiz Torito State
    const [quizActive, setQuizActive] = useState(false);
    const [quizQuestionIdx, setQuizQuestionIdx] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [quizPredicting, setQuizPredicting] = useState(false);
    const [predictedColor, setPredictedColor] = useState(null);

    // State for Torito Customizer
    const [selectedToritoColor, setSelectedToritoColor] = useState(toritoColors[0]); // Default Original
    const [includeSouvenir, setIncludeSouvenir] = useState(true);
    const [is3D, setIs3D] = useState(true);

    useEffect(() => {
        if (initialToritoColor) {
            const found = [...toritoColors, ...lockedToritoSkins].find(tc => tc.color === initialToritoColor);
            if (found) {
                const timer = setTimeout(() => {
                    setSelectedToritoColor(found);
                }, 50);
                return () => clearTimeout(timer);
            }
        }
    }, [initialToritoColor]);

    // Quiz Questions Data
    const quizQuestions = [
        {
            q: "¿En tu hogar o vida personal, qué valor consideras más indispensable?",
            options: [
                { text: "El amor familiar, la unión y la protección mutua", color: "rojo" },
                { text: "La prosperidad, el éxito financiero y la abundancia", color: "amarillo" },
                { text: "La paz mental, la armonía y la reconciliación", color: "blanco" },
                { text: "La salud, la vitalidad y la conexión con la naturaleza", color: "verde" }
            ]
        },
        {
            q: "¿Cómo respondes ante los desafíos y problemas cotidianos?",
            options: [
                { text: "Con fuerza interna, valentía y pasión desbordada", color: "rojo" },
                { text: "Con sabiduría, optimismo y buscando nuevas oportunidades", color: "amarillo" },
                { text: "Con calma, paciencia y buscando el diálogo pacífico", color: "blanco" },
                { text: "Con resiliencia, autocuidado y buscando la sanación", color: "verde" }
            ]
        },
        {
            q: "¿Qué elemento del místico altiplano andino te inspira más?",
            options: [
                { text: "El fuego ceremonial y la tierra fértil (Pachamama)", color: "rojo" },
                { text: "El Sol radiante (Inti) y los campos dorados de quinua", color: "amarillo" },
                { text: "Los nevados sagrados (Apus) bajo el cielo infinito", color: "blanco" },
                { text: "Las aguas curativas del Lago y las hierbas medicinales", color: "verde" }
            ]
        }
    ];



    // Handle AI Itinerary Generation
    const generateAiItinerary = () => {
        setAiLoading(true);
        setAiLoadingStep(0);
        
        // Simulating AI loading steps
        const stepsInterval = setInterval(() => {
            setAiLoadingStep(prev => {
                if (prev >= 3) {
                    clearInterval(stepsInterval);
                    return prev;
                }
                return prev + 1;
            });
        }, 1200);

        setTimeout(() => {
            setAiLoading(false);
            
            // Build dynamic AI itinerary based on selections
            const isEn = i18n.language === 'en';
            let generated = {
                title: isEn 
                    ? `AI Optimized Itinerary: Pucará ${aiFocus.toUpperCase()} (${aiDays} Days)`
                    : `Itinerario Optimizado por IA: Pucará ${aiFocus.toUpperCase()} (${aiDays} Días)`,
                aclimatacionWarning: aiAclimatacion === 'bajo' 
                    ? (isEn 
                        ? "Altitude Alert: Low acclimatization detected (3,860m). We've replaced strenuous hiking (Peñón) on Day 1 with low-impact cultural tours." 
                        : "Alerta de Altitud: Aclimatación baja detectada. Hemos reemplazado el trekking del Peñón el Día 1 por recorridos culturales ligeros.")
                    : null,
                days: []
            };

            // Setup Day 1
            generated.days.push({
                day: 1,
                title: isEn ? "Arrival, Lytic Art & Acclimatization" : "Arribo, Arte Lítico y Aclimatación",
                activities: [
                    { time: "08:30 AM", title: isEn ? "Private Pick-up & Coca Infusion" : "Recojo privado y Mate de Coca", desc: isEn ? "Pick-up from Juliaca/Puno in hybrid vehicle. Arrival at Pucará; enjoy hot coca tea to prevent altitude sickness." : "Recojo en vehículo híbrido. Arribo a Pucará y consumo de mate de coca para prevenir el soroche." },
                    { time: "10:30 AM", title: isEn ? "Lytic Museum Guided Exploration" : "Exploración guiada del Museo Lítico", desc: isEn ? "Study of the pre-Inca monoliths and the famous Hatun Ñakaj (Decapitator) stela." : "Estudio de monolitos pre-incas y la famosa estela Hatun Ñakaj con especialista." },
                    { time: "01:00 PM", title: isEn ? "Andean Gastronomy Experience" : "Almuerzo de Fusión Andina", desc: isEn ? "Light lunch featuring trout, quinoa soup, and organic altiplano cheeses." : "Trucha andina fresca, sopa de quinua real y cata de quesos orgánicos locales." },
                    { time: "03:00 PM", title: aiAclimatacion === 'bajo' 
                        ? (isEn ? "Colonial Architecture & Town Walk" : "Templo de Santa Isabel y Plaza") 
                        : (isEn ? "Pucará Rock (Peñón) Light Hike" : "Trekking ligero al Peñón de Pucará"), 
                      desc: aiAclimatacion === 'bajo' 
                        ? (isEn ? "Low-impact walk around the carved red stone jesuite church." : "Caminata de bajo impacto por la iglesia jesuita tallada en piedra roja.") 
                        : (isEn ? "Hike to the scenic lookout for panoramic view of the altiplano." : "Caminata moderada hacia el mirador natural para capturar el atardecer.") }
                ]
            });

            // Setup Day 2
            if (aiDays >= 2) {
                generated.days.push({
                    day: 2,
                    title: isEn ? "Clay Heritage & Sacred Kalasaya" : "Herencia de Barro y Kalasaya Sagrado",
                    activities: [
                        { time: "09:00 AM", title: isEn ? "Pottery Masterclass with Local Artisan" : "Masterclass Vivencial de Arcilla", desc: isEn ? "Shape and paint your own lucky Torito in a traditional family workshop." : "Moldeado manual y decoración de tu propio Torito de Pucará en taller familiar." },
                        { time: "11:30 AM", title: isEn ? "Kalasaya Ritualistic Complex" : "Complejo Ceremonial Kalasaya", desc: isEn ? "Deep tour of the pyramids, terraces, and sunken courts with energy alignment." : "Tour arqueológico profundo por las pirámides y patios hundidos ceremoniales." },
                        { time: "02:00 PM", title: isEn ? "Pachamama Food Degustation" : "Pachamanca de Confraternidad", desc: isEn ? "Traditional lunch cooked underground with hot stones (for cultural/misticismo focus)." : "Almuerzo tradicional cocido bajo tierra con piedras calientes y hierbas locales." }
                    ]
                });
            }

            // Setup Day 3
            if (aiDays >= 3) {
                generated.days.push({
                    day: 3,
                    title: isEn ? "Mystic Canyons & Departure" : "Cañones Místicos y Despedida",
                    activities: [
                        { time: "08:30 AM", title: isEn ? "Apu Offering Ceremony" : "Ritual de Pago a la Tierra", desc: isEn ? "Authentic Andean connection ritual with coca leaves led by a local Yatiri (shaman)." : "Ritual de ofrenda a los Apus conducido por un Yatiri (chamán) local." },
                        { time: "11:00 AM", title: isEn ? "Rural Community Homestay Visit" : "Visita de Integración Comunitaria", desc: isEn ? "Learn about sheep shearing and weaving directly from families." : "Intercambio vivencial de tejidos y lana en la comunidad autogestionada." },
                        { time: "03:00 PM", title: isEn ? "Departure Transfer" : "Retorno y Transfer de Salida", desc: isEn ? "Return private transit back to Juliaca airport or Puno hotel." : "Traslado privado de retorno al aeropuerto de Juliaca o terminal de Puno." }
                    ]
                });
            }

            setAiItinerary(generated);
        }, 5000);
    };

    // Handle AI Quiz Answer Selection
    const handleQuizAnswer = (color) => {
        const updatedAnswers = [...quizAnswers, color];
        setQuizAnswers(updatedAnswers);

        if (quizQuestionIdx < quizQuestions.length - 1) {
            setQuizQuestionIdx(prev => prev + 1);
        } else {
            // End of Quiz - Predict color
            setQuizPredicting(true);
            setTimeout(() => {
                // Calculate mode (most frequent color)
                const counts = updatedAnswers.reduce((acc, c) => {
                    acc[c] = (acc[c] || 0) + 1;
                    return acc;
                }, {});

                let maxColor = updatedAnswers[0];
                let maxCount = 0;
                Object.entries(counts).forEach(([col, count]) => {
                    if (count > maxCount) {
                        maxCount = count;
                        maxColor = col;
                    }
                });

                // Find corresponding color object
                const found = toritoColors.find(tc => tc.color === maxColor) || toritoColors[1];
                setPredictedColor(found);
                setSelectedToritoColor(found); // Reactively update 3D model!
                setQuizPredicting(false);
            }, 2500);
        }
    };

    const resetQuiz = () => {
        setQuizAnswers([]);
        setQuizQuestionIdx(0);
        setPredictedColor(null);
        setQuizActive(true);
    };

    // Handle WhatsApp messaging
    const handleBookWhatsApp = () => {
        let baseMessage = "";
        const isEn = i18n.language === 'en';

        if (plannerMode === 'ai' && aiItinerary) {
            baseMessage = isEn
                ? `Hello! I would like to book my AI Generated Itinerary:\n\n` +
                  `📍 *AI Route:* ${aiItinerary.title}\n` +
                  `⏱️ *Duration:* ${aiDays} Days (${aiFocus.toUpperCase()})\n` +
                  (includeSouvenir ? `🎁 *Souvenir:* Hand-painted Torito in *${selectedToritoColor.name}*\n` : `🎁 *Souvenir:* Not included\n`) +
                  `\nCould you please send me rates and availability? Thank you!`
                : `¡Hola! Me gustaría cotizar mi Itinerario Inteligente de Pucará diseñado por la IA:\n\n` +
                  `📍 *Ruta IA:* ${aiItinerary.title}\n` +
                  `⏱️ *Duración:* ${aiDays} Días (${aiFocus.toUpperCase()})\n` +
                  (includeSouvenir ? `🎁 *Recuerdo:* Torito de Pucará en color *${selectedToritoColor.name}* (Significado: ${selectedToritoColor.symbolizes.join(', ')})\n` : `🎁 *Recuerdo:* No incluido\n`) +
                  `\n¿Podrían indicarme tarifas, disponibilidad y transporte privado? ¡Gracias!`;
        } else if (activeRoute) {
            baseMessage = `¡Hola! Me gustaría cotizar mi viaje personalizado a Pucará con los siguientes detalles:\n\n` +
                `📍 *Ruta:* ${activeRoute.name} (${activeRoute.duration})\n` +
                `🎯 *Interés Principal:* ${selectedInterest.toUpperCase()}\n` +
                (includeSouvenir ? `🎁 *Suvenir Personalizado:* Torito de Pucará en color *${selectedToritoColor.name}* (Significado: ${selectedToritoColor.symbolizes.join(', ')})\n` : `🎁 *Suvenir:* No incluido\n`) +
                `\n¿Podrían brindarme información sobre tarifas, movilidad privada y fechas disponibles? ¡Gracias!`;
        }

        const encodedMessage = encodeURIComponent(baseMessage);
        const whatsappUrl = `https://wa.me/51950302010?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section id="pucara-planificador" className="section bg-blue-base" style={{ position: 'relative', overflow: 'hidden', padding: '6.5rem 0' }}>
            
            {/* Background Gradients */}
            <div style={{
                position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px',
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(244, 206, 20, 0.05) 0%, rgba(15, 44, 89, 0) 70%)',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', bottom: '-15%', right: '-15%', width: '500px', height: '500px',
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(217, 95, 89, 0.08) 0%, rgba(15, 44, 89, 0) 70%)',
                pointerEvents: 'none'
            }} />

            <div className="container">
                {/* Header Section in Larana Style */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="script-subtitle">Planifica con Inteligencia Artificial...</span>
                    <h2 className="bold-title">{t('header.nav_planificador')}</h2>
                    <div style={{ height: '4px', background: 'var(--accent)', width: '80px', margin: '0 auto 1.5rem auto', borderRadius: '2px' }} />
                    <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Diseña tu itinerario perfecto mediante inteligencia artificial, descubre qué Torito de la suerte te corresponde con nuestro oráculo y personalízalo en 3D.
                    </p>
                </div>

                {/* Mode Selector Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
                    <button
                        onClick={() => setPlannerMode('ai')}
                        style={{
                            padding: '0.8rem 1.5rem',
                            borderRadius: '30px',
                            border: '1px solid ' + (plannerMode === 'ai' ? 'var(--terracotta)' : 'rgba(11, 34, 64, 0.15)'),
                            background: plannerMode === 'ai' ? 'linear-gradient(135deg, var(--terracotta) 0%, #A04928 100%)' : 'rgba(11, 34, 64, 0.03)',
                            color: plannerMode === 'ai' ? 'white' : 'var(--primary)',
                            fontWeight: '900',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s',
                            boxShadow: plannerMode === 'ai' ? '0 4px 12px rgba(184, 92, 56, 0.2)' : 'none'
                        }}
                    >
                        <Sparkles size={16} /> Planificador por IA
                    </button>
                    <button
                        onClick={() => setPlannerMode('classic')}
                        style={{
                            padding: '0.8rem 1.5rem',
                            borderRadius: '30px',
                            border: '1px solid ' + (plannerMode === 'classic' ? 'var(--terracotta)' : 'rgba(11, 34, 64, 0.15)'),
                            background: plannerMode === 'classic' ? 'linear-gradient(135deg, var(--terracotta) 0%, #A04928 100%)' : 'rgba(11, 34, 64, 0.03)',
                            color: plannerMode === 'classic' ? 'white' : 'var(--primary)',
                            fontWeight: '900',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s',
                            boxShadow: plannerMode === 'classic' ? '0 4px 12px rgba(184, 92, 56, 0.2)' : 'none'
                        }}
                    >
                        <Compass size={16} /> Rutas Clásicas
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                    gap: '3rem',
                    alignItems: 'start'
                }} className="planner-grid">
                    
                    {/* LEFT PANEL: Planificador de Ruta (Classic vs AI) */}
                    <div className="glass-panel-dark" style={{ borderRadius: '32px', padding: '2.5rem', border: '1px solid rgba(15, 44, 89, 0.08)' }}>
                        
                        <AnimatePresence mode="wait">
                            {plannerMode === 'classic' ? (
                                <motion.div
                                    key="classic-planner"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 style={{ fontSize: '1.4rem', color: 'var(--secondary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800 }}>
                                        <Compass /> 1. Configura tu Ruta
                                    </h3>

                                    {/* Duración Selector */}
                                    <div style={{ marginBottom: '2rem' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 700 }}>
                                            Duración del Viaje
                                        </label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: 'rgba(15, 44, 89, 0.04)', padding: '0.35rem', borderRadius: '16px' }}>
                                            {[
                                                { id: 'half', label: 'Medio Día' },
                                                { id: 'full', label: '1 Día' },
                                                { id: 'weekend', label: 'Fin de Sem.' }
                                            ].map(opt => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setSelectedDuration(opt.id)}
                                                    style={{
                                                        padding: '0.75rem 0.5rem',
                                                        borderRadius: '12px',
                                                        fontSize: '0.85rem',
                                                        fontWeight: 800,
                                                        textAlign: 'center',
                                                        color: selectedDuration === opt.id ? 'var(--primary)' : 'var(--primary)',
                                                        background: selectedDuration === opt.id ? 'var(--accent)' : 'transparent',
                                                        transition: 'all 0.3s',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Intereses Selector */}
                                    <div style={{ marginBottom: '2.5rem' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 700 }}>
                                            Enfoque Principal
                                        </label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: 'rgba(15, 44, 89, 0.04)', padding: '0.35rem', borderRadius: '16px' }}>
                                            {[
                                                { id: 'cultura', label: 'Cultura' },
                                                { id: 'artesania', label: 'Alfarería' },
                                                { id: 'aventura', label: 'Aventura' }
                                            ].map(opt => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setSelectedInterest(opt.id)}
                                                    style={{
                                                        padding: '0.75rem 0.5rem',
                                                        borderRadius: '12px',
                                                        fontSize: '0.85rem',
                                                        fontWeight: 800,
                                                        textAlign: 'center',
                                                        color: selectedInterest === opt.id ? 'var(--primary)' : 'var(--primary)',
                                                        background: selectedInterest === opt.id ? 'var(--accent)' : 'transparent',
                                                        transition: 'all 0.3s',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Resulting Route Timeline */}
                                    <AnimatePresence mode="wait">
                                        {activeRoute && (
                                            <motion.div
                                                key={activeRoute.id}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -15 }}
                                                transition={{ duration: 0.4 }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                                    <h4 style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 800 }}>
                                                        {activeRoute.name}
                                                    </h4>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', background: 'rgba(200, 88, 51, 0.08)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: 800, border: '1px solid rgba(200, 88, 51, 0.15)' }}>
                                                        {activeRoute.duration}
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.5' }}>
                                                    {activeRoute.description}
                                                </p>

                                                {/* Timeline steps */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '2px dashed rgba(15, 44, 89, 0.15)', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                                                    {activeRoute.steps.map((step, idx) => (
                                                        <div key={idx} style={{ position: 'relative' }}>
                                                            <div style={{
                                                                position: 'absolute',
                                                                left: '-1.95rem',
                                                                top: '0.2rem',
                                                                width: '10px',
                                                                height: '10px',
                                                                borderRadius: '50%',
                                                                background: 'var(--secondary)',
                                                                boxShadow: '0 0 8px var(--secondary)',
                                                                border: '2px solid white'
                                                            }} />
                                                            <div style={{ fontSize: '0.78rem', color: 'var(--secondary)', fontWeight: 800, marginBottom: '0.15rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                                {step.time}
                                                            </div>
                                                            <h5 style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.2rem' }}>
                                                                {step.title}
                                                            </h5>
                                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                                                                {step.desc}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="ai-planner"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 style={{ fontSize: '1.4rem', color: 'var(--accent)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                                        <Cpu size={22} className="text-accent" /> 1. Itinerario Inteligente por IA
                                    </h3>

                                    {/* AI Settings Form */}
                                    {!aiLoading && !aiItinerary && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>
                                                    ¿Cuántos días planeas quedarte?
                                                </label>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                                                    {['1', '2', '3'].map(d => (
                                                        <button
                                                            key={d}
                                                            onClick={() => setAiDays(d)}
                                                            style={{
                                                                padding: '0.65rem',
                                                                borderRadius: '10px',
                                                                fontSize: '0.85rem',
                                                                fontWeight: 'bold',
                                                                background: aiDays === d ? 'var(--accent)' : 'rgba(15, 44, 89, 0.05)',
                                                                color: aiDays === d ? 'var(--primary)' : 'var(--primary)',
                                                                border: '1px solid ' + (aiDays === d ? 'var(--accent)' : 'rgba(15, 44, 89, 0.1)'),
                                                            }}
                                                        >
                                                            {d} {d === '1' ? 'Día' : 'Días'}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>
                                                    Enfoque de Experiencia
                                                </label>
                                                <select
                                                    value={aiFocus}
                                                    onChange={e => setAiFocus(e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        background: 'white',
                                                        border: '1px solid rgba(15, 44, 89, 0.15)',
                                                        padding: '0.75rem',
                                                        borderRadius: '10px',
                                                        color: 'var(--primary)',
                                                        outline: 'none',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    <option value="cultural">Inmersión Alfarera y Colonial</option>
                                                    <option value="aventura">Trekking Extremo y Altura</option>
                                                    <option value="misticismo">Espiritualidad y Ofrenda Andina</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>
                                                    Nivel de Aclimatación Física
                                                </label>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                                                    {[
                                                        { id: 'bajo', label: 'Bajo (Día 1)' },
                                                        { id: 'medio', label: 'Aclimatado' },
                                                        { id: 'alto', label: 'Excelente' }
                                                    ].map(opt => (
                                                        <button
                                                            key={opt.id}
                                                            onClick={() => setAiAclimatacion(opt.id)}
                                                            style={{
                                                                padding: '0.65rem 0.25rem',
                                                                borderRadius: '10px',
                                                                fontSize: '0.78rem',
                                                                fontWeight: 'bold',
                                                                background: aiAclimatacion === opt.id ? 'var(--secondary)' : 'rgba(15, 44, 89, 0.05)',
                                                                color: aiAclimatacion === opt.id ? 'white' : 'var(--primary)',
                                                                border: '1px solid ' + (aiAclimatacion === opt.id ? 'var(--secondary)' : 'rgba(15, 44, 89, 0.1)'),
                                                            }}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <button
                                                onClick={generateAiItinerary}
                                                style={{
                                                    background: 'var(--accent)',
                                                    color: 'var(--primary)',
                                                    padding: '1rem',
                                                    borderRadius: '15px',
                                                    fontWeight: 900,
                                                    fontSize: '0.95rem',
                                                    textTransform: 'uppercase',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem',
                                                    boxShadow: '0 8px 20px rgba(244, 206, 20, 0.2)'
                                                }}
                                            >
                                                <Sparkles size={16} /> Generar Ruta con IA
                                            </button>
                                        </div>
                                    )}

                                    {/* AI Processing Screen */}
                                    {aiLoading && (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '1.5rem', textAlign: 'center' }}>
                                            <div style={{ position: 'relative' }}>
                                                <div style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    border: '4px dashed rgba(15, 44, 89, 0.1)',
                                                    borderTopColor: 'var(--accent)',
                                                    borderRadius: '50%',
                                                    animation: 'spin 2s linear infinite'
                                                }} />
                                                <Brain size={24} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--secondary)' }} className="pulse-slow" />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--secondary)', letterSpacing: '0.05em' }}>PROCESANDO RUTA CON IA...</span>
                                                <AnimatePresence mode="wait">
                                                    <motion.p
                                                        key={aiLoadingStep}
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -5 }}
                                                        style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}
                                                    >
                                                        {aiLoadingStep === 0 && "Consultando capacidad de carga en tiempo real (Sensores IoT)..."}
                                                        {aiLoadingStep === 1 && "Filtrando atractivos según aclimatación física y altitud..."}
                                                        {aiLoadingStep === 2 && "Diseñando ruta de carbono optimizada..."}
                                                        {aiLoadingStep === 3 && "Estructurando cronograma con guías locales..."}
                                                    </motion.p>
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    )}

                                    {/* Generated AI Itinerary Result */}
                                    {!aiLoading && aiItinerary && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h4 style={{ fontSize: '1.15rem', color: 'var(--primary)', fontWeight: 800 }}>
                                                    {aiItinerary.title}
                                                </h4>
                                                <button
                                                    onClick={() => setAiItinerary(null)}
                                                    style={{ fontSize: '0.75rem', color: 'var(--secondary)', borderBottom: '1px dashed var(--secondary)', cursor: 'pointer' }}
                                                >
                                                    Nuevo
                                                </button>
                                            </div>

                                            {aiItinerary.aclimatacionWarning && (
                                                <div style={{ display: 'flex', gap: '0.75rem', background: 'rgba(217, 95, 89, 0.12)', border: '1px solid rgba(217, 95, 89, 0.25)', padding: '0.75rem 1rem', borderRadius: '12px', color: 'var(--secondary)' }}>
                                                    <AlertTriangle size={24} style={{ flexShrink: 0 }} />
                                                    <span style={{ fontSize: '0.8rem', lineHeight: 1.4, fontWeight: 'bold' }}>{aiItinerary.aclimatacionWarning}</span>
                                                </div>
                                            )}

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                                {aiItinerary.days.map((day, dIdx) => (
                                                    <div key={dIdx}>
                                                        <span style={{ fontSize: '0.8rem', background: 'rgba(200, 88, 51, 0.08)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 'bold', color: 'var(--secondary)', textTransform: 'uppercase' }}>
                                                            Día {day.day} - {day.title}
                                                        </span>
                                                        
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem', borderLeft: '2px dashed rgba(15, 44, 89, 0.1)', paddingLeft: '1.25rem', marginLeft: '0.5rem' }}>
                                                            {day.activities.map((act, aIdx) => (
                                                                <div key={aIdx} style={{ position: 'relative' }}>
                                                                    <div style={{
                                                                        position: 'absolute',
                                                                        left: '-1.7rem',
                                                                        top: '0.25rem',
                                                                        width: '8px',
                                                                        height: '8px',
                                                                        borderRadius: '50%',
                                                                        background: 'var(--secondary)',
                                                                        boxShadow: '0 0 6px var(--secondary)',
                                                                        border: '2px solid white'
                                                                    }} />
                                                                    <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontFamily: 'monospace', fontWeight: 'bold' }}>{act.time}</span>
                                                                    <h5 style={{ fontSize: '0.95rem', margin: '0.1rem 0', color: 'var(--primary)', fontWeight: 'bold' }}>{act.title}</h5>
                                                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.45 }}>{act.desc}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                    
                    {/* RIGHT PANEL: Customizer 3D & Torito Quiz prediction */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel-dark"
                        style={{
                            background: 'white',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(15, 44, 89, 0.08)',
                            borderRadius: '32px',
                            padding: '2.5rem',
                            boxShadow: 'var(--shadow-premium)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.4rem', color: 'var(--secondary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800 }}>
                                <Palette className="text-secondary" style={{ color: 'var(--secondary)' }} /> 2. Personaliza tu Amuleto
                            </h3>
                            
                            {/* Toggle 3D view */}
                            <div style={{ display: 'flex', background: 'rgba(11, 34, 64, 0.05)', padding: '0.25rem', borderRadius: '10px' }}>
                                <button 
                                    onClick={() => setIs3D(false)} 
                                    style={{ 
                                        padding: '0.4rem 0.8rem', 
                                        borderRadius: '8px', 
                                        cursor: 'pointer', 
                                        background: !is3D ? 'var(--terracotta)' : 'transparent', 
                                        color: !is3D ? 'white' : 'var(--primary)', 
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    2D
                                </button>
                                <button 
                                    onClick={() => setIs3D(true)} 
                                    style={{ 
                                        padding: '0.4rem 0.8rem', 
                                        borderRadius: '8px', 
                                        cursor: 'pointer', 
                                        background: is3D ? 'var(--terracotta)' : 'transparent', 
                                        color: is3D ? 'white' : 'var(--primary)', 
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    3D
                                </button>
                            </div>
                        </div>

                        {/* Oráculo IA Quiz Banner */}
                        {!quizActive && !predictedColor && (
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(244, 206, 20, 0.08) 0%, rgba(217, 95, 89, 0.05) 100%)',
                                border: '1px solid rgba(244, 206, 20, 0.2)',
                                borderRadius: '16px',
                                padding: '1rem 1.25rem',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '1rem'
                            }}>
                                <div>
                                    <h5 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--secondary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <Brain size={14} /> Oráculo del Torito IA
                                    </h5>
                                    <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        Responde 3 preguntas y la IA predecirá tu color amuleto.
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setQuizActive(true);
                                        setQuizQuestionIdx(0);
                                        setQuizAnswers([]);
                                        setPredictedColor(null);
                                    }}
                                    style={{
                                        background: 'var(--accent)',
                                        color: 'var(--primary)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '30px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        boxShadow: '0 4px 10px rgba(244,206,20,0.2)'
                                    }}
                                >
                                    Iniciar
                                </button>
                            </div>
                        )}

                        {/* Quiz Active UI */}
                        {quizActive && !quizPredicting && (
                            <div style={{
                                background: 'rgba(15, 44, 89, 0.03)',
                                border: '1px solid rgba(15, 44, 89, 0.08)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                marginBottom: '1.5rem',
                                position: 'relative'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>Pregunta {quizQuestionIdx + 1} de 3</span>
                                    <button 
                                        onClick={() => setQuizActive(false)}
                                        style={{ fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}
                                    >
                                        Cancelar
                                    </button>
                                </div>

                                <h4 style={{ fontSize: '0.98rem', color: 'var(--primary)', lineHeight: 1.4, marginBottom: '1.25rem', fontWeight: 'bold' }}>
                                    {quizQuestions[quizQuestionIdx].q}
                                </h4>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {quizQuestions[quizQuestionIdx].options.map((opt, oIdx) => (
                                        <button
                                            key={oIdx}
                                            onClick={() => handleQuizAnswer(opt.color)}
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                padding: '0.85rem 1rem',
                                                borderRadius: '10px',
                                                border: '1px solid rgba(15, 44, 89, 0.1)',
                                                background: 'rgba(15, 44, 89, 0.03)',
                                                color: 'var(--primary)',
                                                fontSize: '0.82rem',
                                                lineHeight: 1.35,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={e => {
                                                e.target.style.borderColor = 'var(--accent)';
                                                e.target.style.background = 'rgba(244, 206, 20, 0.05)';
                                            }}
                                            onMouseLeave={e => {
                                                e.target.style.borderColor = 'rgba(15, 44, 89, 0.08)';
                                                e.target.style.background = 'rgba(15, 44, 89, 0.03)';
                                            }}
                                        >
                                            {opt.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quiz Predicting Loader */}
                        {quizPredicting && (
                            <div style={{
                                background: 'rgba(15, 44, 89, 0.03)',
                                border: '1px solid rgba(15, 44, 89, 0.08)',
                                borderRadius: '20px',
                                padding: '2rem',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                textAlign: 'center'
                            }}>
                                <div className="pulse-slow">
                                    <Sparkles size={32} style={{ color: 'var(--secondary)' }} />
                                </div>
                                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--secondary)' }}>Oráculo IA de Pucará consultando...</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Clasificando perfil energético con la tradición alfarera...</span>
                            </div>
                        )}

                        {/* Predicted Amuleto Alert */}
                        {predictedColor && !quizActive && (
                            <div style={{
                                border: '2px solid ' + predictedColor.hex,
                                background: 'rgba(15, 44, 89, 0.03)',
                                borderRadius: '20px',
                                padding: '1.25rem',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '1rem'
                            }}>
                                <div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase', display: 'block' }}>Resultado del Oráculo IA</span>
                                    <h5 style={{ margin: '0.1rem 0 0 0', fontSize: '0.98rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                                        Amuleto Recomendado: {predictedColor.name}
                                    </h5>
                                </div>
                                <button
                                    onClick={resetQuiz}
                                    style={{
                                        background: predictedColor.hex,
                                        color: predictedColor.color === 'amarillo' || predictedColor.color === 'original' ? 'var(--primary)' : 'white',
                                        padding: '0.45rem 0.9rem',
                                        borderRadius: '30px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Reintentar Quiz
                                </button>
                            </div>
                        )}

                        {/* 3D Model / SVG Render Box */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'rgba(15, 44, 89, 0.04)',
                            borderRadius: '24px',
                            padding: '2rem',
                            marginBottom: '2rem',
                            position: 'relative',
                            perspective: '1000px',
                            minHeight: '340px'
                        }}>
                            {/* Color indicator glow */}
                            <div style={{
                                position: 'absolute',
                                width: '150px',
                                height: '150px',
                                filter: 'blur(60px)',
                                backgroundColor: selectedToritoColor.hex,
                                opacity: 0.35,
                                zIndex: 0,
                                borderRadius: '50%',
                                transition: 'all 0.5s ease'
                            }} />

                            <div style={{ zIndex: 1, width: '100%' }}>
                                <AnimatePresence mode="wait">
                                    {is3D ? (
                                        <motion.div
                                            key="3d-torito"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.4 }}
                                            style={{ width: '100%', height: '100%' }}
                                        >
                                            <Suspense fallback={
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--primary)', gap: '1rem' }}>
                                                    <div style={{
                                                        width: '30px',
                                                        height: '30px',
                                                        border: '3px solid rgba(15, 44, 89, 0.2)',
                                                        borderTopColor: 'var(--accent)',
                                                        borderRadius: '50%',
                                                        animation: 'spin 1s linear infinite'
                                                    }} />
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Iniciando entorno 3D...</span>
                                                </div>
                                            }>
                                                <Torito3D colorHex={selectedToritoColor.hex} />
                                            </Suspense>
                                        </motion.div>
                                    ) : (
                                        <motion.svg 
                                            key={selectedToritoColor.color}
                                            width="220" 
                                            height="220" 
                                            viewBox="0 0 300 300" 
                                            initial={{ rotateY: -180, scale: 0.9, opacity: 0 }}
                                            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                                            exit={{ rotateY: 180, scale: 0.9, opacity: 0 }}
                                            transition={{ duration: 0.65, type: 'spring', stiffness: 80 }}
                                            style={{ display: 'block', margin: '0 auto', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))' }}
                                        >
                                            <path
                                                d="M80,160 C80,100 130,80 180,80 C230,80 250,110 250,160 C250,210 240,240 230,240 C220,240 215,210 210,210 C200,210 190,240 180,240 C170,240 160,210 150,210 C140,210 130,240 120,240 C110,240 100,210 95,210 C90,210 85,240 75,240 C65,240 80,180 80,160 Z"
                                                fill={selectedToritoColor.hex}
                                            />
                                            <path d="M95,210 L95,235 C95,240 90,240 85,240 L85,210 Z" fill="rgba(0,0,0,0.15)" />
                                            <path d="M140,210 L140,235 C140,240 135,240 130,240 L130,210 Z" fill="rgba(0,0,0,0.15)" />
                                            <path d="M190,210 L190,235 C190,240 185,240 180,240 L180,210 Z" fill="rgba(0,0,0,0.15)" />
                                            <path d="M230,210 L230,235 C230,240 225,240 220,240 L220,210 Z" fill="rgba(0,0,0,0.15)" />
                                            <path
                                                d="M180,80 C180,50 200,30 230,30 C250,30 260,50 260,80 C260,110 240,130 200,130 C180,130 180,95 180,80 Z"
                                                fill={selectedToritoColor.hex}
                                                stroke="rgba(255,255,255,0.08)"
                                                strokeWidth="1"
                                            />
                                            <path d="M225,30 C220,10 200,0 195,5 C190,10 205,25 215,30 Z" fill="var(--accent)" stroke="#B59A08" strokeWidth="2" />
                                            <path d="M245,30 C250,10 270,0 275,5 C280,10 265,25 255,30 Z" fill="var(--accent)" stroke="#B59A08" strokeWidth="2" />
                                            <path d="M205,10 Q212,12 215,7" stroke="white" strokeWidth="2" fill="none" />
                                            <path d="M210,18 Q218,17 218,12" stroke="white" strokeWidth="2" fill="none" />
                                            <path d="M265,10 Q258,12 255,7" stroke="white" strokeWidth="2" fill="none" />
                                            <path d="M260,18 Q252,17 252,12" stroke="white" strokeWidth="2" fill="none" />
                                            <ellipse cx="235" cy="105" rx="20" ry="12" fill="var(--accent)" stroke="#B59A08" strokeWidth="2" />
                                            <circle cx="225" cy="105" r="4" fill="black" />
                                            <circle cx="245" cy="105" r="4" fill="black" />
                                            <path d="M235,110 C225,125 245,125 235,110" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
                                            <circle cx="215" cy="65" r="16" fill="white" />
                                            <circle cx="215" cy="65" r="8" fill="#5D4037" />
                                            <circle cx="215" cy="65" r="4" fill="black" />
                                            <circle cx="217" cy="63" r="1.5" fill="white" />
                                            <circle cx="255" cy="65" r="16" fill="white" />
                                            <circle cx="255" cy="65" r="8" fill="#5D4037" />
                                            <circle cx="255" cy="65" r="4" fill="black" />
                                            <circle cx="257" cy="63" r="1.5" fill="white" />
                                            <path d="M190,55 C175,50 170,65 185,70 Z" fill="#D95F59" />
                                            <path d="M275,55 C290,50 295,65 280,70 Z" fill="#D95F59" />
                                            <path d="M110,105 C140,95 180,95 200,105 L200,125 C180,115 140,115 110,125 Z" fill="white" stroke="var(--accent)" strokeWidth="2" />
                                            <path d="M125,103 L125,118" stroke="var(--secondary)" strokeWidth="3" />
                                            <path d="M145,100 L145,115" stroke="var(--secondary)" strokeWidth="3" />
                                            <path d="M165,100 L165,115" stroke="var(--secondary)" strokeWidth="3" />
                                            <path d="M185,103 L185,118" stroke="var(--secondary)" strokeWidth="3" />
                                            <path d="M180,130 C170,165 210,165 200,130 Z" fill="var(--accent)" />
                                            <circle cx="190" cy="148" r="8" fill="white" />
                                            <circle cx="190" cy="148" r="4" fill="var(--secondary)" />
                                            <path d="M80,170 C60,180 50,160 45,185 C40,205 60,195 70,185" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
                                        </motion.svg>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Color Selection Palette */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 700 }}>
                                Elige el color del Torito
                            </label>
                            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                                {[...toritoColors, ...lockedToritoSkins].map(tc => {
                                    const isLocked = tc.locked && !unlockedSkins.includes(tc.color);
                                    const isSelected = selectedToritoColor.color === tc.color;

                                    return (
                                        <motion.button
                                            key={tc.color}
                                            onClick={() => {
                                                if (isLocked) {
                                                    toast.info(`🔒 "${tc.name}" está bloqueado. Escanea el código QR de este monumento o completa el Oráculo de los Apus para desbloquearlo.`);
                                                    return;
                                                }
                                                setSelectedToritoColor(tc);
                                                setPredictedColor(null); // Clear quiz prediction on manual choice
                                            }}
                                            title={tc.name}
                                            whileHover={{ scale: isLocked ? 1 : 1.2 }}
                                            whileTap={{ scale: isLocked ? 1 : 0.9 }}
                                            style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '50%',
                                                backgroundColor: tc.hex,
                                                border: isSelected ? '3px solid white' : '1px solid rgba(15, 44, 89, 0.2)',
                                                boxShadow: isSelected ? '0 0 15px ' + tc.hex : 'none',
                                                transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                                                transition: 'transform 0.2s ease, border-color 0.2s',
                                                position: 'relative',
                                                cursor: 'pointer',
                                                opacity: isLocked ? 0.45 : 1
                                            }}
                                        >
                                            {isSelected && (
                                                <span style={{
                                                    position: 'absolute',
                                                    top: '-3px',
                                                    right: '-3px',
                                                    width: '15px',
                                                    height: '15px',
                                                    borderRadius: '50%',
                                                    backgroundColor: 'var(--accent)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: '1px solid white'
                                                }}>
                                                    <CheckCircle2 size={10} color="var(--primary)" />
                                                </span>
                                            )}
                                            {isLocked && (
                                                <span style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.9rem',
                                                    color: 'white',
                                                    textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                                                }}>
                                                    🔒
                                                </span>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Color Spiritual Meaning Details */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedToritoColor.color}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    background: 'rgba(15, 44, 89, 0.04)',
                                    borderRadius: '20px',
                                    padding: '1.5rem',
                                    marginBottom: '2rem',
                                    border: '1px solid rgba(15, 44, 89, 0.08)'
                                }}
                            >
                                <h4 style={{ fontSize: '1.2rem', color: 'var(--secondary)', fontWeight: 800, marginBottom: '0.5rem' }}>
                                    {selectedToritoColor.name}
                                </h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
                                    {selectedToritoColor.meaning}
                                </p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                    {selectedToritoColor.symbolizes.map((sym, i) => (
                                        <span key={i} style={{
                                            fontSize: '0.7rem',
                                            backgroundColor: 'var(--accent)',
                                            color: 'var(--primary)',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '6px',
                                            fontWeight: 800
                                        }}>
                                            {sym}
                                        </span>
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', borderTop: '1px solid rgba(15, 44, 89, 0.08)', paddingTop: '0.75rem', lineHeight: '1.4' }}>
                                    <strong>Leyenda:</strong> {selectedToritoColor.story}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Gift option checkbox */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setIncludeSouvenir(!includeSouvenir)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '1.25rem',
                                background: includeSouvenir ? 'rgba(244, 206, 20, 0.08)' : 'transparent',
                                border: includeSouvenir ? '1.5px solid var(--accent)' : '1.5px solid rgba(15, 44, 89, 0.15)',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                marginBottom: '2rem'
                            }}
                        >
                            <Gift size={24} style={{ color: includeSouvenir ? 'var(--accent)' : 'rgba(15, 44, 89, 0.4)', flexShrink: 0 }} />
                            <div>
                                <h5 style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 800, margin: 0 }}>
                                    Incluir Torito de Pucará como Recuerdo
                                </h5>
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, marginTop: '0.1rem' }}>
                                    Se entregará una pieza pintada a mano de este color durante tu visita.
                                </p>
                            </div>
                            <div style={{
                                marginLeft: 'auto',
                                width: '20px',
                                height: '20px',
                                borderRadius: '6px',
                                border: '2px solid ' + (includeSouvenir ? 'var(--accent)' : 'rgba(15, 44, 89, 0.4)'),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: includeSouvenir ? 'var(--accent)' : 'transparent'
                            }}>
                                {includeSouvenir && <CheckCircle2 size={14} color="var(--primary)" />}
                            </div>
                        </motion.div>

                        {/* WhatsApp Action Button */}
                        <motion.button
                            whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(244, 206, 20, 0.25)' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleBookWhatsApp}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                backgroundColor: 'var(--accent)',
                                color: 'var(--primary)',
                                fontWeight: 900,
                                fontSize: '1rem',
                                padding: '1.1rem',
                                borderRadius: '20px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            <Send size={16} /> Cotizar Ruta por WhatsApp
                        </motion.button>
                    </motion.div>

                </div>
            </div>
            
            {/* Spin animation fallback */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default PucaraPlanner;
