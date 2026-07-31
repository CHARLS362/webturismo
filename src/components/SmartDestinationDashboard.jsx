import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
    Activity, 
    Video, 
    Wifi, 
    Trash2, 
    TrendingUp, 
    Users, 
    Droplet, 
    Heart, 
    Star, 
    Smile, 
    MessageSquare, 
    Send, 
    Database 
} from 'lucide-react';
import { 
    ResponsiveContainer, 
    AreaChart, 
    Area, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    Legend, 
    PieChart, 
    Pie, 
    Cell 
} from 'recharts';

// Initial mock reviews
const initialReviews = [
    { id: 1, author: "John Doe", rating: 5, comment: "Kalasaya was breathtaking! The tour was so organized.", source: "TripAdvisor", sentiment: "positive" },
    { id: 2, author: "María Flores", rating: 5, comment: "¡Me encantó moldear mi propio Torito en el taller de alfarería!", source: "Google Reviews", sentiment: "positive" },
    { id: 3, author: "Hans Schmidt", rating: 4, comment: "Beautiful scenery, but it gets very cold at night. Bring warm clothes.", source: "Booking", sentiment: "neutral" }
];

const COLORS = ['#B85C38', '#C59B27', '#0B2240', '#5A6E4B'];

const SmartDestinationDashboard = () => {
    const { t } = useTranslation();
    const [currentTime, setCurrentTime] = useState(new Date());
    
    // IoT sensor flow simulation
    const [attractionsFlow, setAttractionsFlow] = useState([
        { id: 'kalasaya', name: t('dashboard.iot_sensor_flow_kalasaya', { defaultValue: 'Complejo Kalasaya' }), current: 42, max: 100, status: 'low' },
        { id: 'museo', name: t('dashboard.iot_sensor_flow_museum', { defaultValue: 'Museo Lítico de Pucará' }), current: 18, max: 40, status: 'low' },
        { id: 'penon', name: t('dashboard.iot_sensor_flow_penon', { defaultValue: 'Peñón de Pucará' }), current: 52, max: 120, status: 'low' },
        { id: 'temple', name: t('dashboard.iot_sensor_flow_temple', { defaultValue: 'Templo de Santa Isabel' }), current: 28, max: 80, status: 'low' },
        { id: 'taller', name: t('dashboard.iot_sensor_flow_workshops', { defaultValue: 'Talleres Alfareros' }), current: 12, max: 30, status: 'low' }
    ]);

    // Live Feed Camera selection
    const [activeCam, setActiveCam] = useState('cam1');
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);

    // Online reputation
    const [reviews, setReviews] = useState(initialReviews);
    const [newAuthor, setNewAuthor] = useState('');
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [showForm, setShowForm] = useState(false);

    // Update timestamp
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Simulate IoT sensors flow fluctuation
    useEffect(() => {
        const iotInterval = setInterval(() => {
            setAttractionsFlow(prevFlow => 
                prevFlow.map(attr => {
                    // Random fluctuation between -3 and +3
                    const change = Math.floor(Math.random() * 7) - 3;
                    let nextVal = attr.current + change;
                    if (nextVal < 0) nextVal = 0;
                    if (nextVal > attr.max) nextVal = attr.max;

                    // Calculate capacity status
                    const pct = (nextVal / attr.max) * 100;
                    let status = 'low';
                    if (pct >= 50 && pct < 80) status = 'med';
                    if (pct >= 80) status = 'high';

                    return { ...attr, current: nextVal, status };
                })
            );
        }, 5000);

        return () => clearInterval(iotInterval);
    }, []);

    // Recharts Data for Competitividad (Monthly Tourist Arrivals)
    const arrivalsData = [
        { month: 'Ene', turistas: 820 },
        { month: 'Feb', turistas: 940 },
        { month: 'Mar', turistas: 1100 },
        { month: 'Abr', turistas: 980 },
        { month: 'May', turistas: 1250 },
        { month: 'Jun', turistas: 1890 }, // Festival de Identidad
        { month: 'Jul', turistas: 2100 }, // Virgen del Carmen
        { month: 'Ago', turistas: 1400 },
        { month: 'Sep', turistas: 1150 },
        { month: 'Oct', turistas: 950 },
        { month: 'Nov', turistas: 800 },
        { month: 'Dic', turistas: 1050 }
    ];

    // Recharts Data for Sostenibilidad (Recycle comparison)
    const sustainabilityData = [
        { name: 'Residuos Reciclados (%)', 'Línea Base': 10, 'Meta 2030': 50, 'Actual 2026': 28 },
        { name: 'Empleo Local (%)', 'Línea Base': 30, 'Meta 2030': 60, 'Actual 2026': 45 }
    ];



    // Handle review submission
    const handleAddReview = (e) => {
        e.preventDefault();
        if (!newAuthor || !newComment) return;

        let sentiment = "neutral";
        if (newRating >= 4) sentiment = "positive";
        if (newRating <= 2) sentiment = "negative";

        const newRev = {
            id: Date.now(),
            author: newAuthor,
            rating: newRating,
            comment: newComment,
            source: "Web Pucará 365",
            sentiment
        };

        setReviews([newRev, ...reviews]);
        setNewAuthor('');
        setNewComment('');
        setNewRating(5);
        setShowForm(false);
    };

    // Calculations
    const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
    const positivePercent = Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100);

    return (
        <section id="pucara-dashboard" className="section bg-blue-base" style={{ position: 'relative', overflow: 'hidden', padding: '6.5rem 0' }}>
            {/* Ambient Background Grid */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(204, 156, 86, 0.03) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                opacity: 0.5,
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                
                {/* Header in Larana Style */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '4rem', borderBottom: '1px solid rgba(15, 44, 89, 0.08)', paddingBottom: '2rem' }}>
                    <div>
                        <span className="script-subtitle">Smart Destination DTI 2030...</span>
                        <h2 className="bold-title" style={{ margin: 0 }}>
                            {t('dashboard.title')}
                        </h2>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div style={{ background: 'rgba(15, 44, 89, 0.03)', border: '1px solid rgba(15, 44, 89, 0.08)', padding: '0.5rem 1rem', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Wifi size={14} className="pulse-slow" style={{ color: '#4CAF50' }} />
                            <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: '#4CAF50', fontWeight: 'bold' }}>IoT CONNECTED</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
                        </span>
                    </div>
                </div>

                <p style={{ maxWidth: '850px', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '4rem' }}>
                    {t('dashboard.desc')}
                </p>

                {/* Dashboard Grid Layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 0.8fr',
                    gap: '2.5rem',
                }} className="dti-grid">

                    {/* LEFT PANEL: IoT Live Cameras & Flow */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        
                        {/* 1. CCTV Video Feed */}
                        <div className="glass-panel-dark" style={{ borderRadius: '24px', padding: '2rem', border: '1px solid rgba(15, 44, 89, 0.08)' }}>
                            <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontWeight: 600, color: 'var(--primary)' }}>
                                <Video size={20} style={{ color: 'var(--accent)' }} />
                                {t('dashboard.iot_cameras')}
                            </h3>

                            {/* Video Display Container */}
                            <div style={{
                                position: 'relative',
                                aspectRatio: '16/9',
                                background: '#000',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '3px solid rgba(15, 44, 89, 0.08)',
                                boxShadow: '0 20px 40px rgba(15,44,89,0.1)'
                            }}>
                                {/* Grid Line Scanner Effect */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                                    backgroundSize: '100% 4px, 6px 100%',
                                    zIndex: 5,
                                    pointerEvents: 'none'
                                }} />
                                
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '15px',
                                    zIndex: 6,
                                    background: 'rgba(217, 95, 89, 0.85)',
                                    color: 'white',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '30px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
                                }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white' }} className="pulse-slow" />
                                    <span>LIVE</span>
                                </div>

                                <div style={{
                                    position: 'absolute',
                                    bottom: '15px',
                                    right: '15px',
                                    zIndex: 6,
                                    background: 'rgba(0,0,0,0.65)',
                                    backdropFilter: 'blur(5px)',
                                    color: 'rgba(255,255,255,0.9)',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontFamily: 'monospace'
                                }}>
                                    {activeCam === 'cam1' ? 'CAM_01_PLAZA' : 'CAM_02_TALLER'} | FPS: 30.0 | ISO: 400
                                </div>

                                {/* Video 1 */}
                                <video
                                    ref={videoRef1}
                                    style={{
                                        display: activeCam === 'cam1' ? 'block' : 'none',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                    src="/videos/pucara-alrededores.mp4"
                                    loop
                                    muted
                                    autoPlay
                                    playsInline
                                />

                                {/* Video 2 */}
                                <video
                                    ref={videoRef2}
                                    style={{
                                        display: activeCam === 'cam2' ? 'block' : 'none',
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                    src="/videos/pucara-artesanos.mp4"
                                    loop
                                    muted
                                    autoPlay
                                    playsInline
                                />
                            </div>

                            {/* Camera Toggle Tabs */}
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem' }}>
                                <button
                                    onClick={() => {
                                        setActiveCam('cam1');
                                        if (videoRef1.current) videoRef1.current.play();
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '0.85rem 1rem',
                                        borderRadius: '12px',
                                        border: '1px solid ' + (activeCam === 'cam1' ? 'var(--accent)' : 'rgba(15, 44, 89, 0.15)'),
                                        background: activeCam === 'cam1' ? 'var(--accent)' : 'rgba(15, 44, 89, 0.05)',
                                        color: activeCam === 'cam1' ? 'var(--primary)' : 'var(--primary)',
                                        cursor: 'pointer',
                                        fontWeight: '900',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {t('dashboard.camera_plaza')}
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveCam('cam2');
                                        if (videoRef2.current) videoRef2.current.play();
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '0.85rem 1rem',
                                        borderRadius: '12px',
                                        border: '1px solid ' + (activeCam === 'cam2' ? 'var(--accent)' : 'rgba(15, 44, 89, 0.15)'),
                                        background: activeCam === 'cam2' ? 'var(--accent)' : 'rgba(15, 44, 89, 0.05)',
                                        color: activeCam === 'cam2' ? 'var(--primary)' : 'var(--primary)',
                                        cursor: 'pointer',
                                        fontWeight: '900',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {t('dashboard.camera_taller')}
                                </button>
                            </div>
                        </div>

                        {/* 2. IoT Sensor Flow */}
                        <div className="glass-panel-dark" style={{ borderRadius: '24px', padding: '2rem', border: '1px solid rgba(15, 44, 89, 0.08)' }}>
                            <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontWeight: 600, color: 'var(--primary)' }}>
                                <Database size={20} style={{ color: 'var(--accent)' }} />
                                {t('dashboard.iot_sensor_flow')}
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {attractionsFlow.map(attr => {
                                    const percent = Math.round((attr.current / attr.max) * 100);
                                    
                                    // Status styling
                                    let badgeColor = '#4CAF50';
                                    let badgeBg = 'rgba(76, 175, 80, 0.1)';
                                    let textStatus = t('dashboard.state_low');
                                    
                                    if (attr.status === 'med') {
                                        badgeColor = '#F4CE14';
                                        badgeBg = 'rgba(244, 206, 20, 0.1)';
                                        textStatus = t('dashboard.state_med');
                                    } else if (attr.status === 'high') {
                                        badgeColor = '#D95F59';
                                        badgeBg = 'rgba(217, 95, 89, 0.1)';
                                        textStatus = t('dashboard.state_high');
                                    }

                                    return (
                                        <div key={attr.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{attr.name}</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                                    <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', opacity: 0.8 }}>
                                                        {attr.current} / {attr.max} pax
                                                    </span>
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        color: badgeColor,
                                                        background: badgeBg,
                                                        padding: '0.2rem 0.6rem',
                                                        borderRadius: '6px',
                                                        fontWeight: 'bold',
                                                        border: `1px solid ${badgeColor}33`
                                                    }}>
                                                        {textStatus}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {/* Progress Bar */}
                                            <div style={{ height: '8px', background: 'rgba(15, 44, 89, 0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                                                <motion.div
                                                    animate={{ width: `${percent}%`, backgroundColor: badgeColor }}
                                                    transition={{ type: 'spring', stiffness: 60 }}
                                                    style={{ height: '100%', borderRadius: '4px' }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT PANEL: Recharts Charts & Reputation Feed */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        
                        {/* 1. Tourist Arrivals Chart */}
                        <div className="glass-panel-dark" style={{ borderRadius: '24px', padding: '2rem', border: '1px solid rgba(15, 44, 89, 0.08)' }}>
                            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontWeight: 600, color: 'var(--primary)' }}>
                                <TrendingUp size={20} style={{ color: 'var(--accent)' }} />
                                {t('dashboard.competitiveness')} - {t('dashboard.indicadores.arribos')}
                            </h3>
                            
                            <div style={{ width: '100%', height: '200px', fontSize: '0.8rem' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={arrivalsData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorTuristas" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="month" stroke="rgba(15, 44, 89, 0.4)" />
                                        <YAxis stroke="rgba(15, 44, 89, 0.4)" />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: 'white', border: '1px solid rgba(15, 44, 89, 0.1)', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
                                            labelStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                                            itemStyle={{ color: 'var(--accent)' }}
                                        />
                                        <Area type="monotone" dataKey="turistas" stroke="var(--accent)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTuristas)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 2. Sustainability Metrics Bar Chart */}
                        <div className="glass-panel-dark" style={{ borderRadius: '24px', padding: '2rem', border: '1px solid rgba(15, 44, 89, 0.08)' }}>
                            <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontWeight: 600, color: 'var(--primary)' }}>
                                <Trash2 size={20} style={{ color: 'var(--accent)' }} />
                                {t('dashboard.sustainability')}
                            </h3>

                            <div style={{ width: '100%', height: '220px', fontSize: '0.8rem' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={sustainabilityData} margin={{ top: 10, right: 5, left: -25, bottom: 5 }}>
                                        <XAxis dataKey="name" stroke="rgba(15, 44, 89, 0.4)" />
                                        <YAxis stroke="rgba(15, 44, 89, 0.4)" />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: 'white', border: '1px solid rgba(15, 44, 89, 0.1)', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }}
                                            labelStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                                            itemStyle={{ color: 'var(--primary)' }}
                                        />
                                        <Legend wrapperStyle={{ color: 'rgba(15, 44, 89, 0.7)' }} />
                                        <Bar dataKey="Línea Base" fill="rgba(15, 44, 89, 0.15)" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="Actual 2026" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="Meta 2030" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 3. Online Reputation Simulator */}
                        <div className="glass-panel-dark" style={{ borderRadius: '24px', padding: '2rem', border: '1px solid rgba(15, 44, 89, 0.08)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0, fontWeight: 600, color: 'var(--primary)' }}>
                                    <MessageSquare size={20} style={{ color: 'var(--accent)' }} />
                                    {t('dashboard.reputation')}
                                </h3>
                                
                                {/* Score Badge */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(200, 88, 51, 0.08)', padding: '0.35rem 0.75rem', borderRadius: '10px', color: 'var(--secondary)', fontWeight: 'bold' }}>
                                    <Star size={16} fill="var(--secondary)" style={{ color: 'var(--secondary)' }} />
                                    <span>{avgRating}</span>
                                </div>
                            </div>

                            {/* Mini Metrics */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'rgba(15, 44, 89, 0.04)', padding: '0.75rem', borderRadius: '12px', textAlign: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', opacity: 0.6, display: 'block', marginBottom: '0.2rem' }}>
                                        {t('dashboard.satisfaction')}
                                    </span>
                                    <strong style={{ fontSize: '1.25rem', color: '#4CAF50' }}>{positivePercent}%</strong>
                                </div>
                                <div style={{ background: 'rgba(15, 44, 89, 0.04)', padding: '0.75rem', borderRadius: '12px', textAlign: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', opacity: 0.6, display: 'block', marginBottom: '0.2rem' }}>
                                        Total Reviews
                                    </span>
                                    <strong style={{ fontSize: '1.25rem' }}>{reviews.length}</strong>
                                </div>
                            </div>

                            {/* Reviews list */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '200px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                                <AnimatePresence initial={false}>
                                    {reviews.map(rev => (
                                        <motion.div
                                            key={rev.id}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            style={{
                                                background: 'rgba(15, 44, 89, 0.03)',
                                                border: '1px solid rgba(15, 44, 89, 0.08)',
                                                padding: '0.85rem',
                                                borderRadius: '12px'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                                                <span style={{ fontWeight: 650, fontSize: '0.9rem' }}>{rev.author}</span>
                                                <span style={{ fontSize: '0.75rem', opacity: 0.5, fontStyle: 'italic' }}>{rev.source}</span>
                                            </div>
                                            
                                            {/* Stars & Comment */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.4rem' }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        size={12} 
                                                        fill={i < rev.rating ? "var(--accent)" : "none"} 
                                                        stroke={i < rev.rating ? "var(--accent)" : "rgba(15, 44, 89, 0.2)"} 
                                                    />
                                                ))}
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.82rem', opacity: 0.85, lineHeight: 1.4 }}>
                                                "{rev.comment}"
                                            </p>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Input Form Toggle */}
                            {!showForm ? (
                                <button
                                    onClick={() => setShowForm(true)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        background: 'rgba(15, 44, 89, 0.05)',
                                        border: '1px dashed rgba(15, 44, 89, 0.3)',
                                        color: 'var(--primary)',
                                        cursor: 'pointer',
                                        fontWeight: 800,
                                        fontSize: '0.85rem',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    + {t('dashboard.write_review')}
                                </button>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    onSubmit={handleAddReview}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid rgba(15, 44, 89, 0.1)', paddingTop: '1rem' }}
                                >
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                                        <input
                                            type="text"
                                            required
                                            placeholder={t('dashboard.name_placeholder')}
                                            value={newAuthor}
                                            onChange={e => setNewAuthor(e.target.value)}
                                            style={{
                                                background: 'rgba(15, 44, 89, 0.05)',
                                                border: '1px solid rgba(15, 44, 89, 0.15)',
                                                borderRadius: '8px',
                                                padding: '0.5rem 0.75rem',
                                                color: 'var(--primary)',
                                                fontSize: '0.85rem',
                                                fontWeight: 600
                                            }}
                                        />
                                        <select
                                            value={newRating}
                                            onChange={e => setNewRating(Number(e.target.value))}
                                            style={{
                                                background: 'white',
                                                border: '1px solid rgba(15, 44, 89, 0.15)',
                                                borderRadius: '8px',
                                                padding: '0.5rem',
                                                color: 'var(--primary)',
                                                fontSize: '0.85rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            <option value={5}>5 ★</option>
                                            <option value={4}>4 ★</option>
                                            <option value={3}>3 ★</option>
                                            <option value={2}>2 ★</option>
                                            <option value={1}>1 ★</option>
                                        </select>
                                    </div>
                                    
                                    <textarea
                                        required
                                        placeholder={t('dashboard.comment_placeholder')}
                                        value={newComment}
                                        onChange={e => setNewComment(e.target.value)}
                                        rows={2}
                                        style={{
                                            background: 'rgba(15, 44, 89, 0.05)',
                                            border: '1px solid rgba(15, 44, 89, 0.15)',
                                            borderRadius: '8px',
                                            padding: '0.5rem 0.75rem',
                                            color: 'var(--primary)',
                                            fontSize: '0.85rem',
                                            resize: 'none',
                                            fontWeight: 600
                                        }}
                                    />

                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            type="submit"
                                            style={{
                                                flex: 2,
                                                padding: '0.55rem',
                                                background: 'var(--accent)',
                                                color: 'var(--primary)',
                                                border: 'none',
                                                borderRadius: '8px',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.4rem',
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            <Send size={12} /> {t('dashboard.submit_review')}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            style={{
                                                flex: 1,
                                                padding: '0.55rem',
                                                background: 'rgba(15, 44, 89, 0.05)',
                                                border: '1px solid rgba(15, 44, 89, 0.15)',
                                                borderRadius: '8px',
                                                color: 'var(--primary)',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                fontWeight: 800
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </div>

                    </div>

                </div>

            </div>

            {/* Custom media queries styles via CSS tags */}
            <style>{`
                @media (max-width: 992px) {
                    .dti-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                .pulse-slow {
                    animation: pulseEffect 2s infinite;
                }
                @keyframes pulseEffect {
                    0% { opacity: 0.4; }
                    50% { opacity: 1; }
                    100% { opacity: 0.4; }
                }
            `}</style>
        </section>
    );
};

export default SmartDestinationDashboard;
