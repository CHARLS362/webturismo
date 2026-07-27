import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
    Sparkles, 
    Copy, 
    Check, 
    Volume2, 
    VolumeX, 
    Video, 
    Play, 
    Bot, 
    ExternalLink, 
    Wand2, 
    Clapperboard,
    MessageCircle,
    Send
} from 'lucide-react';
import { toast } from 'sonner';

// Local Pucará assets
import kalasayaImg from '../assets/image/map/kalasaya.png';
import penonImg from '../assets/image/map/penon.png';
import temploImg from '../assets/image/map/templo.png';
import plazaImg from '../assets/image/map/plaza.png';
import museoImg from '../assets/image/map/museo.png';

const flowPrompts = [
    {
        id: 'drone-kalasaya',
        category: '🚁 Dron & Arqueología',
        title: 'Vuelo Cinematic 8K sobre Kalasaya',
        promptEn: 'Cinematic 8k FPV drone shot sweeping over the red sandstone ancient stepped terraces and sunken plaza of Kalasaya archaeological complex in Pucara Puno Peru, warm golden hour sunlight, dramatic clouds over the Andean altiplano, hyperrealistic photorealistic lighting, National Geographic documentary style, smooth camera movement.',
        promptEs: 'Toma cinematográfica de dron FPV a 8k sobre las terrazas de piedra roja y el patio hundido de Kalasaya en Pucará Puno.',
        preview: kalasayaImg
    },
    {
        id: 'craft-torito',
        category: '🏺 Alfarería Viva',
        title: 'Moldeado de Arcilla Roja del Torito',
        promptEn: 'Detailed close-up macro shot of traditional Peruvian master artisan hands sculpting a ceramic Torito de Pucara from rich red clay, rustic Andean pottery workshop background, soft warm volumetric sunlight streaming through window, 4k slow motion 60fps, shallow depth of field, photorealistic texture.',
        promptEs: 'Primer plano en macro de las manos de un maestro artesano esculpiendo un Torito de Pucará en arcilla roja.',
        preview: plazaImg
    },
    {
        id: 'penon-sunset',
        category: '🏔️ Naturaleza & Atardecer',
        title: 'Atardecer en el Peñón Mirador',
        promptEn: 'Wide panoramic drone camera movement rising above the majestic rock formation of El Peñon de Pucara in Puno Peru at sunset, epic golden rays illuminating the vast altiplano countryside, cinematic lighting, 8k resolution, breathtaking landscape film shot.',
        promptEs: 'Toma panorámica de dron ascendiendo sobre la formación rocosa del Peñón de Pucará al atardecer.',
        preview: penonImg
    },
    {
        id: 'mystic-pachamama',
        category: '🔮 Místico & Tradición',
        title: 'Pago a la Tierra con Yatiri',
        promptEn: 'Cinematic medium shot of an Andean shaman (yatiri) holding sacred green coca leaves in front of ancient pre-Inca carved monoliths at Kalasaya Pucara, gentle breeze, mystic atmospheric mist, golden volumetric light beams, photorealistic 4k 35mm film look.',
        promptEs: 'Toma cinematográfica de un chamán andino sosteniendo hojas de coca sagradas en Kalasaya.',
        preview: museoImg
    }
];

const PucaraFlowStudio = () => {
    const { t } = useTranslation();
    const [copiedId, setCopiedId] = useState(null);
    const [avatarText, setAvatarText] = useState("¡Kamisaraki! Soy Pukarin, tu guardián y guía interactivo de Pucará 365. ¿Qué te gustaría descubrir hoy sobre el templo de Kalasaya, los Toritos o nuestros paquetes?");
    const [userInput, setUserInput] = useState("");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);

    const handleCopyPrompt = (id, promptEn) => {
        navigator.clipboard.writeText(promptEn);
        setCopiedId(id);
        toast.success("¡Prompt en inglés copiado! Pégalo en Google Flow para generar tu video.");
        setTimeout(() => setCopiedId(null), 2500);
    };

    const speakAvatarResponse = (text) => {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        
        const cleanText = text.replace(/\*\*/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'es-PE';
        utterance.pitch = 1.1;
        utterance.rate = 0.95;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const handleAskAvatar = async (e) => {
        e?.preventDefault();
        if (!userInput.trim() || isLoadingAvatar) return;

        const prompt = userInput;
        setUserInput("");
        setIsLoadingAvatar(true);

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        let responseText = "";

        if (apiKey) {
            try {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Eres Pukarin, el simpático avatar animado del Torito de Pucará (Puno, Perú). Responde con entusiasmo, sabiduría andina y cariño en 2 oraciones cortas sobre la pregunta del turista: ${prompt}`
                            }]
                        }]
                    })
                });
                const data = await res.json();
                if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                    responseText = data.candidates[0].content.parts[0].text;
                }
            } catch (err) {
                console.error("Avatar Flow Gemini error:", err);
            }
        }

        if (!responseText) {
            responseText = `¡Qué excelente pregunta sobre Pucará! Te sugiero explorar nuestro mapa interactivo del tesoro y los talleres vivenciales de cerámica en Lampa y Puno.`;
        }

        setAvatarText(responseText);
        setIsLoadingAvatar(false);
        speakAvatarResponse(responseText);
    };

    return (
        <section id="pucara-flow-studio" className="section bg-blue-contrast" style={{ position: 'relative', padding: '6.5rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.4rem 1.2rem',
                        borderRadius: '30px',
                        background: 'rgba(197, 155, 39, 0.15)',
                        border: '1px solid rgba(197, 155, 39, 0.3)',
                        color: 'var(--accent)',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        marginBottom: '1rem'
                    }}>
                        <Sparkles size={16} /> Impulsado por Google Flow & AI Studio
                    </div>

                    <h2 className="bold-title">Estudio Google Flow IA — Avatar & Prompts de Video</h2>
                    <div style={{ height: '4px', background: 'var(--bronze-gold)', width: '80px', margin: '0 auto 1.5rem auto', borderRadius: '2px' }} />
                    <p style={{ maxWidth: '720px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        Interactúa con el avatar animado parlante **Pukarin** (el Torito de Pucará) y copia los prompts cinematográficos para generar videos IA en **Google Flow**.
                    </p>
                </div>

                {/* Grid 2 Columns: Left = Avatar Flow Interactive Persona, Right = Google Flow Prompt Studio */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '3rem', alignItems: 'start' }} className="flow-studio-grid">
                    
                    {/* Left Card: Interactive Flow Avatar "Pukarin" */}
                    <div style={{
                        background: 'white',
                        borderRadius: '32px',
                        padding: '2rem',
                        boxShadow: 'var(--shadow-premium)',
                        border: '2px solid rgba(184, 92, 56, 0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        {/* Avatar Image Wrapper with Glowing Animation */}
                        <div style={{ position: 'relative', width: '180px', height: '180px', marginBottom: '1.5rem' }}>
                            <motion.div
                                animate={isSpeaking ? { scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] } : { y: [0, -6, 0] }}
                                transition={{ duration: isSpeaking ? 0.6 : 3, repeat: Infinity }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--terracotta) 0%, var(--accent) 100%)',
                                    padding: '6px',
                                    boxShadow: 'var(--shadow-lg)'
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    background: '#0B2240',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '5rem'
                                }}>
                                    🐂
                                </div>
                            </motion.div>

                            {/* Speaking Badge */}
                            {isSpeaking && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        right: '0',
                                        background: 'var(--accent)',
                                        color: 'var(--primary)',
                                        borderRadius: '50%',
                                        padding: '0.6rem',
                                        boxShadow: 'var(--shadow-md)'
                                    }}
                                >
                                    <Volume2 size={18} />
                                </motion.div>
                            )}
                        </div>

                        <span style={{ color: 'var(--terracotta)', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Avatar Parlante de Google Flow
                        </span>
                        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 900, fontFamily: 'var(--font-heading)', margin: '0.2rem 0 1rem' }}>
                            Torito "Pukarin"
                        </h3>

                        {/* Speech Bubble */}
                        <div style={{
                            background: 'rgba(250, 246, 240, 0.95)',
                            borderRadius: '20px',
                            padding: '1.25rem',
                            border: '1px solid rgba(184, 92, 56, 0.2)',
                            color: 'var(--primary)',
                            fontSize: '0.98rem',
                            lineHeight: 1.6,
                            marginBottom: '1.5rem',
                            position: 'relative',
                            width: '100%',
                            minHeight: '90px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {isLoadingAvatar ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--terracotta)', fontWeight: 700 }}>
                                    <Wand2 className="spin-slow" size={20} /> Pukarin está pensando su respuesta...
                                </div>
                            ) : (
                                <span>"{avatarText}"</span>
                            )}
                        </div>

                        {/* Interactive Form to Talk to Avatar */}
                        <form onSubmit={handleAskAvatar} style={{ width: '100%', display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Hazle una pregunta a Pukarin..."
                                style={{
                                    flex: 1,
                                    padding: '0.8rem 1rem',
                                    borderRadius: '14px',
                                    border: '1px solid rgba(11, 34, 64, 0.15)',
                                    fontSize: '0.9rem',
                                    outline: 'none'
                                }}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ padding: '0.8rem 1.2rem', borderRadius: '14px' }}
                                disabled={isLoadingAvatar}
                            >
                                <Send size={16} />
                            </button>
                        </form>

                        <button
                            onClick={() => speakAvatarResponse(avatarText)}
                            style={{
                                marginTop: '1rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--terracotta)',
                                fontWeight: 800,
                                fontSize: '0.82rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}
                        >
                            <Volume2 size={16} /> Escuchar Voz del Avatar
                        </button>
                    </div>

                    {/* Right Card: Google Flow Prompt Studio for AI Video */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                                🎬 Prompts de Video para Google Flow
                            </h3>
                            <a
                                href="https://labs.google/flow/tv/channel/drone_zone"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}
                            >
                                Abrir Google Flow <ExternalLink size={14} />
                            </a>
                        </div>

                        {flowPrompts.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    background: 'white',
                                    borderRadius: '20px',
                                    padding: '1.25rem',
                                    boxShadow: 'var(--shadow-md)',
                                    border: '1px solid rgba(11, 34, 64, 0.08)',
                                    display: 'flex',
                                    gap: '1.25rem',
                                    alignItems: 'center'
                                }}
                                className="prompt-card"
                            >
                                <img
                                    src={item.preview}
                                    alt={item.title}
                                    style={{ width: '90px', height: '80px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                                />

                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--terracotta)', textTransform: 'uppercase' }}>
                                        {item.category}
                                    </span>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                                        {item.title}
                                    </h4>
                                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                                        {item.promptEs}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleCopyPrompt(item.id, item.promptEn)}
                                    style={{
                                        padding: '0.65rem 1rem',
                                        borderRadius: '12px',
                                        background: copiedId === item.id ? 'var(--ichu-green)' : 'rgba(184, 92, 56, 0.1)',
                                        color: copiedId === item.id ? 'white' : 'var(--terracotta)',
                                        border: 'none',
                                        fontWeight: 800,
                                        fontSize: '0.82rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        flexShrink: 0,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                                    {copiedId === item.id ? '¡Copiado!' : 'Copiar Prompt'}
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .flow-studio-grid { grid-template-columns: 1fr !important; }
                    .prompt-card { flex-direction: column !important; align-items: flex-start !important; }
                }
            `}</style>
        </section>
    );
};

export default PucaraFlowStudio;
