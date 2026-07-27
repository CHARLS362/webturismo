import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
    Compass, 
    Clock, 
    Play, 
    Square, 
    Volume2, 
    VolumeX,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Mountain
} from 'lucide-react';
import L from 'leaflet';
import { aiVoice } from '../utils/aiVoice';

// Image imports
import kalasayaImg from '../assets/image/map/kalasaya.png';
import penonImg from '../assets/image/map/penon.png';
import temploImg from '../assets/image/map/templo.png';
import plazaImg from '../assets/image/map/plaza.png';
import museoImg from '../assets/image/map/museo.png';

const PucaraMap = () => {
    const { t, i18n } = useTranslation();
    const [activePointIdx, setActivePointIdx] = useState(0);
    const [isTourPlaying, setIsTourPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const mapContainerRef = useRef(null);
    const leafletMapInstanceRef = useRef(null);
    const markersRef = useRef([]);
    const tourTimerRef = useRef(null);

    // ─── Route Points ────────────────────────────────────────────────────────
    // Coordinates redistributed to be visually separated at zoom 14
    const routePoints = [
        {
            id: 1,
            name: "1. Complejo Arqueológico Kalasaya",
            lat: -15.0420,
            lng: -70.3730,
            image: kalasayaImg,
            desc: {
                es: "El gran centro ceremonial de la cultura Pucará. Cuenta con pirámides escalonadas de terrazas de piedra roja, templos semicirculares y patios hundidos donde se realizaban ofrendas sagradas a la lluvia y el agua hace más de dos mil años.",
                en: "The grand ceremonial center of the Pucará culture. It features stepped pyramids built with red stone terraces, semi-circular temples, and sunken courts where sacred rain and water rituals were performed over two thousand years ago."
            },
            tags: ["Arqueología", "Patrimonio", "Pirámides"],
            duration: "2 horas",
            height: "3,875m"
        },
        {
            id: 2,
            name: "2. El Peñón de Pucará (Mirador)",
            lat: -15.0375,
            lng: -70.3668,
            image: penonImg,
            desc: {
                es: "Un gigantesco acantilado de piedra roja que resguarda el pueblo. Este mirador natural sagrado ofrece senderismo con vistas panorámicas espectaculares del altiplano, las vías del tren y la cordillera andina.",
                en: "A gigantic red stone cliff that guards the town. This sacred natural lookout offers scenic hiking with spectacular panoramic views of the high plains, the railway, and the Andean mountain range."
            },
            tags: ["Mirador", "Trekking", "Naturaleza"],
            duration: "1.5 horas",
            height: "3,980m"
        },
        {
            id: 3,
            name: "3. Templo de Santa Isabel",
            lat: -15.0510,
            lng: -70.3660,
            image: temploImg,
            desc: {
                es: "Una joya arquitectónica del siglo dieciocho construida por los jesuitas. Tallada enteramente en piedra roja caliza de las canteras locales, destaca por su imponente fachada barroca y su sincretismo religioso colonial andino.",
                en: "An architectural gem from the eighteenth century built by the Jesuits. Carved entirely in red limestone from local quarries, it stands out for its imposing Baroque facade and Andean-Colonial religious syncretism."
            },
            tags: ["Colonial", "Arquitectura", "Iglesia"],
            duration: "45 min",
            height: "3,858m"
        },
        {
            id: 4,
            name: "4. Plaza de Armas de Pucará",
            lat: -15.0498,
            lng: -70.3705,
            image: plazaImg,
            desc: {
                es: "La plaza central del pueblo, donde se exponen las esculturas monumentales de los Toritos de Pucará y es rodeada de coloridos edificios locales. Es el punto de partida de las principales festividades altiplánicas.",
                en: "The town's central square, displaying monumental sculptures of the Toritos de Pucará and surrounded by colorful local buildings. It is the starting point for the main altiplano festivals."
            },
            tags: ["Plaza", "Cultura", "Paseo"],
            duration: "30 min",
            height: "3,857m"
        },
        {
            id: 5,
            name: "5. Museo Lítico de Pucará",
            lat: -15.0455,
            lng: -70.3635,
            image: museoImg,
            desc: {
                es: "Hogar de los míticos monolitos tallados en piedra. Aquí se exhibe la estela del Hatun Ñakaj (el gran degollador) y grabados simbólicos de relámpagos, peces y felinos sagrados que revelan la cosmovisión y el arte lítico andino.",
                en: "Home to the mythical stone-carved monoliths. It houses the stela of Hatun Ñakaj (the great decapitator) and symbolic carvings of lightning, sacred fish, and felines that reveal the Andean lithic art and worldview."
            },
            tags: ["Monolitos", "Escultura", "Cultura"],
            duration: "1.5 horas",
            height: "3,860m"
        }
    ];

    const activePoint = routePoints[activePointIdx];

    // ─── Speak Active Point ───────────────────────────────────────────────────
    const speakActivePoint = () => {
        if (isMuted) return;
        const text = activePoint.desc[i18n.language] || activePoint.desc['es'];
        aiVoice.speak(text, i18n.language);
    };

    // ─── Initialize Leaflet Map ───────────────────────────────────────────────
    useEffect(() => {
        if (!mapContainerRef.current) return;

        const map = L.map(mapContainerRef.current, {
            center: [-15.0455, -70.3693],
            zoom: 14,
            zoomControl: true,
            scrollWheelZoom: false
        });

        leafletMapInstanceRef.current = map;

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 20
        }).addTo(map);

        markersRef.current = [];

        routePoints.forEach((pt, idx) => {
            const isSelected = idx === activePointIdx;

            const customIcon = L.divIcon({
                className: 'custom-leaflet-marker',
                html: `<div class="map-node-inner-${pt.id} float-animation" style="
                    width: 48px;
                    height: 48px;
                    filter: drop-shadow(0 4px 12px rgba(184, 92, 56, ${isSelected ? '0.7' : '0.35'}));
                    transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    transform: scale(${isSelected ? 1.3 : 1});
                    z-index: ${isSelected ? 999 : 1};
                ">
                    <svg viewBox="0 0 100 100" style="width:100%; height:100%; transition: all 0.3s;" class="marker-svg-${pt.id}">
                        <path d="M50,95 C30,70 15,50 15,35 A35,35 0 0,1 85,35 C85,50 70,70 50,95 Z" fill="${isSelected ? 'var(--terracotta)' : 'var(--primary)'}" />
                        <path d="M50,90 C34,68 20,49 20,35 A30,30 0 0,1 80,35 C80,49 66,68 50,90 Z" fill="white" />
                        <path d="M40,55 C40,43 50,37 60,37 C70,37 75,43 75,55 C75,65 70,70 65,70 C60,70 57,65 55,65 C50,65 47,70 42,70 C37,70 40,60 40,55 Z" fill="${isSelected ? 'var(--terracotta)' : 'var(--primary)'}" />
                        <circle cx="62" cy="48" r="4" fill="var(--bronze-gold)" />
                    </svg>
                    <div style="
                        position: absolute;
                        top: -5px;
                        right: -5px;
                        background-color: var(--bronze-gold);
                        color: var(--primary);
                        border-radius: 50%;
                        width: 20px;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.72rem;
                        font-weight: 900;
                        border: 2px solid white;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
                        font-family: var(--font-heading);
                    ">${pt.id}</div>
                    ${isSelected ? `<div style="
                        position: absolute;
                        bottom: -8px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 36px;
                        height: 6px;
                        border-radius: 50%;
                        background: radial-gradient(ellipse, rgba(184,92,56,0.5) 0%, transparent 80%);
                        filter: blur(2px);
                    "></div>` : ''}
                </div>`,
                iconSize: [48, 48],
                iconAnchor: [24, 48]
            });

            const marker = L.marker([pt.lat, pt.lng], { icon: customIcon })
                .addTo(map)
                .bindPopup(`<div style="font-family: var(--font-body); padding: 0.25rem 0.1rem;">
                    <b style="color: var(--primary); font-size: 0.88rem;">${pt.name.split('. ')[1]}</b><br/>
                    <span style="font-size: 0.73rem; opacity:0.75; color: var(--text-muted);">⛰ ${pt.height}</span>
                </div>`);

            marker.on('click', () => handleSelectPoint(idx));
            markersRef.current.push(marker);
        });

        // Route polyline
        const coords = routePoints.map(pt => [pt.lat, pt.lng]);
        L.polyline(coords, {
            color: 'var(--terracotta)',
            weight: 3,
            dashArray: '8, 14',
            opacity: 0.65
        }).addTo(map);

        // Open active popup initially
        if (markersRef.current[activePointIdx]) {
            markersRef.current[activePointIdx].openPopup();
        }

        return () => {
            if (leafletMapInstanceRef.current) {
                leafletMapInstanceRef.current.remove();
                leafletMapInstanceRef.current = null;
            }
            markersRef.current = [];
        };
    }, []);

    // ─── Map fly-to on active index change ───────────────────────────────────
    useEffect(() => {
        const map = leafletMapInstanceRef.current;
        if (!map) return;

        const pt = routePoints[activePointIdx];

        map.flyTo([pt.lat, pt.lng], 16, { animate: true, duration: 1.4 });

        if (markersRef.current[activePointIdx]) {
            markersRef.current[activePointIdx].openPopup();
        }

        routePoints.forEach((rp) => {
            const el = document.querySelector(`.map-node-inner-${rp.id}`);
            const path1 = document.querySelector(`.marker-svg-${rp.id} path:nth-of-type(1)`);
            const path3 = document.querySelector(`.marker-svg-${rp.id} path:nth-of-type(3)`);
            if (el && path1 && path3) {
                const active = rp.id === pt.id;
                path1.setAttribute('fill', active ? 'var(--terracotta)' : 'var(--primary)');
                path3.setAttribute('fill', active ? 'var(--terracotta)' : 'var(--primary)');
                el.style.transform = `scale(${active ? 1.3 : 1})`;
                el.style.zIndex = active ? '999' : '1';
                el.style.filter = `drop-shadow(0 4px 12px rgba(184,92,56,${active ? 0.7 : 0.35}))`;
            }
        });

        setImageLoaded(false);
    }, [activePointIdx]);

    // ─── Auto-Tour Loop ───────────────────────────────────────────────────────
    useEffect(() => {
        if (isTourPlaying) {
            speakActivePoint();
            tourTimerRef.current = setTimeout(() => {
                setActivePointIdx(prev => {
                    const next = prev + 1;
                    if (next < routePoints.length) return next;
                    setIsTourPlaying(false);
                    aiVoice.speak(
                        i18n.language === 'en'
                            ? "You have completed the virtual GIS tour of Pucará. We look forward to seeing you in person!"
                            : "Has completado el recorrido geográfico virtual por Pucará. ¡Te esperamos en persona!",
                        i18n.language
                    );
                    return 0;
                });
            }, 14000);
        } else {
            aiVoice.stop();
            if (tourTimerRef.current) clearTimeout(tourTimerRef.current);
        }
        return () => { if (tourTimerRef.current) clearTimeout(tourTimerRef.current); };
    }, [isTourPlaying, activePointIdx, i18n.language]);

    // ─── Handlers ─────────────────────────────────────────────────────────────
    const handleSelectPoint = (idx) => {
        setIsTourPlaying(false);
        setActivePointIdx(idx);
        aiVoice.stop();
        setTimeout(() => {
            if (!isMuted) {
                const text = routePoints[idx].desc[i18n.language] || routePoints[idx].desc['es'];
                aiVoice.speak(text, i18n.language);
            }
        }, 120);
    };

    const handlePrev = () => {
        const prev = (activePointIdx - 1 + routePoints.length) % routePoints.length;
        handleSelectPoint(prev);
    };

    const handleNext = () => {
        const next = (activePointIdx + 1) % routePoints.length;
        handleSelectPoint(next);
    };

    const toggleTour = () => setIsTourPlaying(p => !p);
    const toggleMute = () => {
        const nm = !isMuted;
        setIsMuted(nm);
        if (nm) {
            aiVoice.stop();
        } else {
            const text = activePoint.desc[i18n.language] || activePoint.desc['es'];
            aiVoice.speak(text, i18n.language);
        }
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <section id="pucara-mapa" className="section bg-blue-base" style={{ position: 'relative', overflow: 'hidden', padding: '6.5rem 0' }}>

            {/* Background ambient glows */}
            <div style={{
                position: 'absolute', top: '10%', left: '3%', width: '500px', height: '500px',
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(204,156,86,0.05) 0%, transparent 70%)',
                pointerEvents: 'none', filter: 'blur(80px)'
            }} />
            <div style={{
                position: 'absolute', bottom: '10%', right: '3%', width: '550px', height: '550px',
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,88,51,0.06) 0%, transparent 70%)',
                pointerEvents: 'none', filter: 'blur(90px)'
            }} />

            <div className="container">

                {/* ── Section Header ── */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="script-subtitle">Tu Recorrido de Ensueño en...</span>
                    <h2 className="bold-title">Mapa Geográfico de Pucará</h2>
                    <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--accent)', margin: '0 auto 1.5rem auto', borderRadius: '2px' }} />
                    <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                        Explora la ruta turística real sobre mapas de código abierto. Inicia la audioguía IA para vivir una experiencia inmersiva de cada hito geográfico.
                    </p>
                </div>

                {/* ── Tour Controller Bar ── */}
                <div className="glass-panel" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1.1rem 2rem', borderRadius: '20px', marginBottom: '2.5rem',
                    border: '1px solid rgba(255,255,255,0.3)', flexWrap: 'wrap', gap: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            backgroundColor: isTourPlaying ? 'var(--terracotta)' : 'rgba(15,44,89,0.18)',
                            boxShadow: isTourPlaying ? '0 0 14px var(--terracotta)' : 'none',
                            display: 'inline-block', transition: 'all 0.4s'
                        }} />
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary)' }}>
                            {isTourPlaying
                                ? (i18n.language === 'en' ? "GIS Audio Guide active — Auto-playing..." : "Audioguía GIS activa — Reproducción automática...")
                                : (i18n.language === 'en' ? "Select a marker or use the controls below." : "Selecciona un marcador o usa los controles del panel.")}
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                        <button onClick={toggleTour} style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: isTourPlaying ? 'var(--terracotta)' : 'var(--accent)',
                            color: 'white', padding: '0.7rem 1.4rem',
                            borderRadius: '30px', fontWeight: 900, fontSize: '0.83rem',
                            transition: 'all 0.3s', cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.12)'
                        }}>
                            {isTourPlaying
                                ? <><Square size={13} fill="currentColor" /> {i18n.language === 'en' ? "Pause" : "Pausar"}</>
                                : <><Play size={13} fill="currentColor" /> {i18n.language === 'en' ? "Start Audio Guide" : "Iniciar Audioguía"}</>}
                        </button>
                        <button onClick={toggleMute} style={{
                            border: '2px solid rgba(15,44,89,0.15)', color: 'var(--primary)',
                            width: '42px', height: '42px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.2s',
                            backgroundColor: isMuted ? 'rgba(184,92,56,0.08)' : 'transparent'
                        }} title={isMuted ? "Unmute" : "Mute"}>
                            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                        </button>
                    </div>
                </div>

                {/* ── Main Grid: Map + Detail Panel ── */}
                <div className="map-grid-layout" style={{
                    display: 'grid', gridTemplateColumns: '1.2fr 1fr',
                    gap: '3rem', alignItems: 'start'
                }}>

                    {/* ── LEFT: Map Container ── */}
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{
                            position: 'relative', width: '100%', height: '520px',
                            background: 'rgba(15,44,89,0.06)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '28px', overflow: 'hidden',
                            boxShadow: 'var(--shadow-premium)', zIndex: 10
                        }}>
                            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

                            {/* Map overlay badge */}
                            <div style={{
                                position: 'absolute', top: '14px', left: '14px',
                                backgroundColor: 'rgba(11,34,64,0.82)',
                                backdropFilter: 'blur(10px)',
                                color: 'white', padding: '0.4rem 0.85rem',
                                borderRadius: '20px', fontSize: '0.73rem',
                                fontWeight: 800, letterSpacing: '0.05em',
                                textTransform: 'uppercase', zIndex: 999,
                                border: '1px solid rgba(255,255,255,0.12)',
                                display: 'flex', alignItems: 'center', gap: '0.4rem'
                            }}>
                                <MapPin size={11} color="var(--bronze-gold)" />
                                Pucará, Puno — {routePoints.length} Hitos
                            </div>
                        </div>

                        {/* ── Thumbnail Strip ── */}
                        <div style={{
                            display: 'flex', gap: '0.6rem', justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            {routePoints.map((pt, idx) => {
                                const isActive = idx === activePointIdx;
                                return (
                                    <button
                                        key={pt.id}
                                        onClick={() => handleSelectPoint(idx)}
                                        title={pt.name.split('. ')[1]}
                                        style={{
                                            position: 'relative',
                                            width: '52px', height: '52px',
                                            borderRadius: '14px',
                                            overflow: 'hidden',
                                            border: isActive
                                                ? '2.5px solid var(--terracotta)'
                                                : '2px solid rgba(15,44,89,0.12)',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                                            transform: isActive ? 'scale(1.12)' : 'scale(1)',
                                            boxShadow: isActive
                                                ? '0 0 0 3px rgba(184,92,56,0.22), 0 6px 18px rgba(184,92,56,0.28)'
                                                : '0 2px 8px rgba(11,34,64,0.08)',
                                            padding: 0, background: 'none'
                                        }}
                                    >
                                        <img
                                            src={pt.image}
                                            alt={pt.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                        />
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            background: isActive
                                                ? 'rgba(184,92,56,0.15)'
                                                : 'rgba(11,34,64,0.25)',
                                            transition: 'all 0.3s'
                                        }} />
                                        <div style={{
                                            position: 'absolute', bottom: '3px', right: '4px',
                                            backgroundColor: isActive ? 'var(--terracotta)' : 'rgba(11,34,64,0.75)',
                                            color: 'white', borderRadius: '6px',
                                            width: '16px', height: '16px',
                                            fontSize: '0.62rem', fontWeight: 900,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: 'var(--font-heading)'
                                        }}>{pt.id}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── RIGHT: Detail Panel ── */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePoint.id}
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.98 }}
                            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                            className="glass-panel"
                            style={{
                                borderRadius: '28px',
                                border: '1px solid rgba(255,255,255,0.3)',
                                overflow: 'hidden',
                                color: 'var(--primary)',
                                position: 'sticky',
                                top: '100px'
                            }}
                        >
                            {/* ── Immersive Image Preview ── */}
                            <div style={{
                                position: 'relative', height: '230px', overflow: 'hidden',
                                backgroundColor: 'rgba(11,34,64,0.1)'
                            }}>
                                <motion.img
                                    key={activePoint.image}
                                    src={activePoint.image}
                                    alt={activePoint.name}
                                    onLoad={() => setImageLoaded(true)}
                                    initial={{ scale: 1.08, opacity: 0 }}
                                    animate={{ scale: 1, opacity: imageLoaded ? 1 : 0 }}
                                    transition={{ duration: 0.55, ease: 'easeOut' }}
                                    style={{
                                        width: '100%', height: '100%',
                                        objectFit: 'cover', display: 'block'
                                    }}
                                />

                                {/* Gradient overlay bottom */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to top, rgba(11,34,64,0.82) 0%, rgba(11,34,64,0.35) 45%, transparent 100%)'
                                }} />

                                {/* Name overlay on image */}
                                <div style={{
                                    position: 'absolute', bottom: '0', left: '0', right: '0',
                                    padding: '1.25rem 1.5rem 1rem'
                                }}>
                                    <div style={{
                                        fontSize: '0.68rem', fontWeight: 800,
                                        color: 'var(--bronze-gold)', textTransform: 'uppercase',
                                        letterSpacing: '0.1em', marginBottom: '0.3rem',
                                        fontFamily: 'var(--font-heading)'
                                    }}>
                                        Hito Geográfico {activePoint.id} · Pucará, Puno
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.35rem', fontWeight: 900,
                                        color: 'white', margin: 0, lineHeight: '1.2',
                                        fontFamily: 'var(--font-heading)',
                                        textShadow: '0 2px 12px rgba(0,0,0,0.4)'
                                    }}>
                                        {activePoint.name.split('. ')[1]}
                                    </h3>
                                </div>

                                {/* Navigation Prev/Next on image corners */}
                                <button
                                    onClick={handlePrev}
                                    style={{
                                        position: 'absolute', top: '50%', left: '10px',
                                        transform: 'translateY(-50%)',
                                        width: '34px', height: '34px', borderRadius: '50%',
                                        backgroundColor: 'rgba(11,34,64,0.7)',
                                        backdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        color: 'white', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', transition: 'all 0.2s',
                                        zIndex: 10
                                    }}
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    style={{
                                        position: 'absolute', top: '50%', right: '10px',
                                        transform: 'translateY(-50%)',
                                        width: '34px', height: '34px', borderRadius: '50%',
                                        backgroundColor: 'rgba(184,92,56,0.85)',
                                        backdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        color: 'white', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', transition: 'all 0.2s',
                                        zIndex: 10
                                    }}
                                >
                                    <ChevronRight size={16} />
                                </button>

                                {/* Dot progress indicator */}
                                <div style={{
                                    position: 'absolute', top: '12px', right: '12px',
                                    display: 'flex', gap: '5px', zIndex: 10
                                }}>
                                    {routePoints.map((_, i) => (
                                        <div key={i} style={{
                                            width: i === activePointIdx ? '18px' : '6px',
                                            height: '6px', borderRadius: '3px',
                                            backgroundColor: i === activePointIdx ? 'var(--bronze-gold)' : 'rgba(255,255,255,0.45)',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer'
                                        }} onClick={() => handleSelectPoint(i)} />
                                    ))}
                                </div>
                            </div>

                            {/* ── Text Content ── */}
                            <div style={{ padding: '1.6rem 1.75rem 1.75rem' }}>

                                <p style={{
                                    fontSize: '0.93rem', color: 'var(--text-muted)',
                                    lineHeight: '1.68', marginBottom: '1.5rem', fontWeight: 500
                                }}>
                                    {activePoint.desc[i18n.language] || activePoint.desc['es']}
                                </p>

                                {/* Stats Row */}
                                <div style={{
                                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                                    gap: '1rem',
                                    borderTop: '1px solid rgba(15,44,89,0.08)',
                                    paddingTop: '1.25rem', marginBottom: '1.4rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span className="icon-badge icon-badge-terracotta" style={{ padding: '0.42rem', border: 'none' }}>
                                            <Clock size={14} />
                                        </span>
                                        <div>
                                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                                                Visita Sugerida
                                            </div>
                                            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--primary)' }}>
                                                {activePoint.duration}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span className="icon-badge icon-badge-bronze" style={{ padding: '0.42rem', border: 'none' }}>
                                            <Mountain size={14} />
                                        </span>
                                        <div>
                                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>
                                                Altitud Real
                                            </div>
                                            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--primary)' }}>
                                                {activePoint.height}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                                    {activePoint.tags.map((tg, i) => (
                                        <span key={i} style={{
                                            fontSize: '0.7rem',
                                            backgroundColor: 'rgba(184,92,56,0.07)',
                                            color: 'var(--terracotta)',
                                            padding: '0.28rem 0.75rem',
                                            borderRadius: '8px', fontWeight: 800,
                                            border: '1px solid rgba(184,92,56,0.18)',
                                            fontFamily: 'var(--font-heading)'
                                        }}>
                                            #{tg}
                                        </span>
                                    ))}
                                </div>

                                {/* Prev / Next Buttons */}
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button
                                        onClick={handlePrev}
                                        style={{
                                            flex: 1, display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', gap: '0.4rem',
                                            padding: '0.7rem 1rem',
                                            borderRadius: '14px',
                                            border: '1.5px solid rgba(15,44,89,0.15)',
                                            color: 'var(--primary)', fontWeight: 700,
                                            fontSize: '0.82rem', cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            backgroundColor: 'rgba(15,44,89,0.03)'
                                        }}
                                    >
                                        <ChevronLeft size={15} />
                                        {i18n.language === 'en' ? 'Previous' : 'Anterior'}
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        style={{
                                            flex: 1, display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', gap: '0.4rem',
                                            padding: '0.7rem 1rem',
                                            borderRadius: '14px',
                                            border: 'none',
                                            background: 'linear-gradient(135deg, var(--terracotta) 0%, var(--rose-stone) 100%)',
                                            color: 'white', fontWeight: 700,
                                            fontSize: '0.82rem', cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            boxShadow: '0 4px 14px rgba(184,92,56,0.3)'
                                        }}
                                    >
                                        {i18n.language === 'en' ? 'Next' : 'Siguiente'}
                                        <ChevronRight size={15} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .map-grid-layout {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }
                .custom-leaflet-marker {
                    background: transparent !important;
                    border: none !important;
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 14px !important;
                    box-shadow: 0 8px 28px rgba(11,34,64,0.14) !important;
                    border: 1px solid rgba(255,255,255,0.6) !important;
                }
                .leaflet-popup-tip {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default PucaraMap;
