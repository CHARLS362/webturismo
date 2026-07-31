import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Welcome messages by language
const welcomeMessages = {
    es: '¡Kamisaraki! (¡Hola!) Soy tu asistente virtual de **PUCARÁ 365**. Estoy aquí para guiarte en tu viaje. ¿Deseas saber sobre Kalasaya, el Museo Lítico, los Toritos tradicionales, cómo llegar o nuestras festividades? Puedes hablarme usando el micrófono 🎙️.',
    en: 'Kamisaraki! (Hello!) I am your virtual assistant from **PUCARÁ 365**. I am here to guide you on your trip. Do you want to know about Kalasaya, the Lytic Museum, traditional Toritos, how to get here, or our festivals? You can talk to me using the microphone 🎙️.'
};

const AIChatBot = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const sendMessageRef = useRef(null);

    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: welcomeMessages[i18n.language] || welcomeMessages['es']
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isMuted, setIsMuted] = useState(true); // Default muted to respect browser autoplay policies
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    const [prevLanguage, setPrevLanguage] = useState(i18n.language);
    if (i18n.language !== prevLanguage) {
        setPrevLanguage(i18n.language);
        setMessages([
            {
                sender: 'bot',
                text: welcomeMessages[i18n.language] || welcomeMessages['es']
            }
        ]);
    }

    // Initialize speech recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.lang = i18n.language === 'es' ? 'es-PE' : 'en-US';
            rec.interimResults = false;
            rec.maxAlternatives = 1;

            rec.onstart = () => setIsListening(true);
            rec.onend = () => setIsListening(false);
            rec.onerror = (e) => {
                console.error("Speech Recognition Error:", e);
                setIsListening(false);
            };
            rec.onresult = (e) => {
                const speechToText = e.results[0][0].transcript;
                setInputValue(speechToText);
                sendMessageRef.current?.(speechToText);
            };

            recognitionRef.current = rec;
        }
    }, [i18n.language]);

    // Scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    // Speech synthesis helper
    const speakText = (text) => {
        if (isMuted || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        
        // Strip markdown stars for speaking
        const plainText = text.replace(/\*\*/g, '');
        
        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.lang = i18n.language === 'es' ? 'es-PE' : 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert(i18n.language === 'es' ? "El reconocimiento de voz no está soportado o permitido en tu navegador." : "Speech recognition is not supported or allowed in your browser.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    // Keyword logic parser
    const getBotResponse = (input) => {
        const cleanInput = input.toLowerCase().trim();
        const isEn = i18n.language === 'en';

        if (cleanInput.includes('llegar') || cleanInput.includes('como voy') || cleanInput.includes('transporte') || cleanInput.includes('viajar') || cleanInput.includes('bus') || cleanInput.includes('juliaca') || cleanInput.includes('puno') || cleanInput.includes('how to get') || cleanInput.includes('travel')) {
            return isEn 
                ? 'To get to **Pucará**, you can take shared vans (colectivos) or buses from the Terrestrial Terminal of **Juliaca** (45 minutes) or **Puno** (1.5 hours). The highway is fully paved. Our packages include private roundtrip tourist transportation.'
                : 'Para llegar a **Pucará**, puedes tomar colectivos o buses desde el Terminal Terrestre de **Juliaca** (45 minutos) o de **Puno** (1.5 horas). La carretera está completamente asfaltada. En nuestros paquetes ya incluimos transporte turístico privado ida y vuelta.';
        }
        
        if (cleanInput.includes('torito') || cleanInput.includes('ceramica') || cleanInput.includes('barro') || cleanInput.includes('alfarero') || cleanInput.includes('artesano') || cleanInput.includes('arcilla') || cleanInput.includes('suvenir') || cleanInput.includes('recuerdo') || cleanInput.includes('clay') || cleanInput.includes('pottery')) {
            return isEn
                ? 'The **Torito de Pucará** is an ancestral ceramic piece symbolizing protection, happiness, and fertility in the high Andean home. They are placed in pairs on the roofs of houses. Each color has a spiritual meaning (Red: Love, Yellow: Wealth, Green: Health, White: Peace). Our packages include workshops where you can mold your own piece!'
                : 'El **Torito de Pucará** es una pieza de cerámica ancestral que simboliza protección, felicidad y fertilidad en el hogar altiplánico. Se colocan en parejas en los techos de las casas. Cada color tiene un sentido espiritual (Rojo: Amor, Amarillo: Riqueza, Verde: Salud, Blanco: Paz). ¡Nuestros paquetes incluyen talleres donde moldearás tu propia pieza!';
        }

        if (cleanInput.includes('kalasaya') || cleanInput.includes('ruinas') || cleanInput.includes('complejo') || cleanInput.includes('arqueologia') || cleanInput.includes('pre-inca') || cleanInput.includes('templo') || cleanInput.includes('ruins')) {
            return isEn
                ? 'The **Kalasaya Archaeological Complex** was the sacred center of the Pucará culture (200 B.C. to 200 A.D.). It features stepped red stone ceremonial pyramids, sunken patios, and burial chambers. It is the spiritual cradle of the highlands and a must-visit on the tour.'
                : 'El **Complejo Arqueológico Kalasaya** es el centro sagrado de la cultura Pucará (200 a.C. a 200 d.C.). Cuenta con pirámides ceremoniales de piedra roja tallada, patios hundidos y cámaras funerarias. Es la cuna espiritual del altiplano y es una visita infaltable en el tour.';
        }

        if (cleanInput.includes('museo') || cleanInput.includes('litico') || cleanInput.includes('estela') || cleanInput.includes('degollador') || cleanInput.includes('escultura') || cleanInput.includes('piedra') || cleanInput.includes('museum') || cleanInput.includes('lytic') || cleanInput.includes('sculpture')) {
            return isEn
                ? 'The **Lytic Museum of Pucará** safeguards stone sculptures of the pre-Inca culture. Its most famous piece is the stela of the **Hatun Ñakaj** (the Decapitator/Degollador) and zoomorphic monoliths. You can take a 360° virtual tour in our "360° Tour" section or hire our package that includes the physical admission ticket.'
                : 'El **Museo Lítico de Pucará** resguarda esculturas de piedra de la cultura pre-inca. Su pieza más famosa es la estela del **Hatun Ñakaj** (el Degollador) y monolitos zoomorfos grabados. Puedes visitar su tour virtual 360° en nuestra sección "Tour 360°" o contratar nuestro paquete que incluye el boleto físico de ingreso.';
        }

        if (cleanInput.includes('costo') || cleanInput.includes('precio') || cleanInput.includes('paquete') || cleanInput.includes('tarifa') || cleanInput.includes('reservar') || cleanInput.includes('reserva') || cleanInput.includes('price') || cleanInput.includes('cost') || cleanInput.includes('package') || cleanInput.includes('book')) {
            return isEn
                ? 'We have 3 basic packages tailored to your preferences: **Pucará Essential** (2 days - Cultural), **Adventure and Mysticism** (3 days - Trekking and offering to the Earth), and **Clay-Baroque Immersion** (2 days - Premium with live craft workshops). You can calculate costs in the planner section and book directly via WhatsApp.'
                : 'Contamos con 3 paquetes básicos adaptados a tus gustos: **Pucará Esencial** (2 días - Cultural), **Aventura y Misticismo** (3 días - Trekking y pago a la tierra), e **Inmersión Barroco-Alfarera** (2 días - Premium con talleres vivenciales). Puedes cotizar en la sección de planificador y reservar directo por WhatsApp.';
        }

        if (cleanInput.includes('clima') || cleanInput.includes('frio') || cleanInput.includes('llevar') || cleanInput.includes('ropa') || cleanInput.includes('abrigo') || cleanInput.includes('altitud') || cleanInput.includes('altura') || cleanInput.includes('weather') || cleanInput.includes('cold') || cleanInput.includes('altitude')) {
            return isEn
                ? 'Pucará is at **3,860 meters above sea level**. The weather is cold and dry, with strong sun during the day and temperatures dropping below 0°C at night in winter. We suggest bringing a warm windbreaker jacket, hat, sunscreen, and comfortable shoes for walking around the ruins.'
                : 'Pucará está a **3,860 msnm**. El clima es frío y seco, con fuerte sol en el día y temperaturas que bajan de 0°C en la noche de invierno. Te sugerimos traer casaca abrigadora cortavientos, sombrero, bloqueador solar y calzado cómodo para caminar en las ruinas.';
        }

        if (cleanInput.includes('fiesta') || cleanInput.includes('festividad') || cleanInput.includes('calendario') || cleanInput.includes('celebracion') || cleanInput.includes('carmen') || cleanInput.includes('capac') || cleanInput.includes('carnaval') || cleanInput.includes('festival') || cleanInput.includes('party')) {
            return isEn
                ? 'The most important festivals in Pucará are: the **Carnivals** (February/March), the **Pucará Identity Day** (June 15, with a major ceramic fair), the **Virgen del Carmen** festival (July 16, with the blessing of Toritos), and the **Cápac Raymi** or Andean solstice (December 21 at Kalasaya).'
                : 'Las festividades más importantes de Pucará son: los **Carnavales** (febrero/marzo), el **Día de la Identidad Pucareña** (15 de junio, gran feria de cerámica), la festividad de la **Virgen del Carmen** (16 de julio, con bendición de Toritos) y el **Cápac Raymi** o solsticio andino (21 de diciembre en Kalasaya).';
        }

        if (cleanInput.includes('foto') || cleanInput.includes('fotografico') || cleanInput.includes('paisaje') || cleanInput.includes('penon') || cleanInput.includes('photo') || cleanInput.includes('scenery')) {
            return isEn
                ? 'The Pucará **Photo Tour** will take you to capture the best angles of the highlands: the sunset at the top of the Peñón, the carved red stone facade of the Santa Isabel colonial temple, and portraits of artisans shaping live clay in their workshops.'
                : 'El **Tour Fotográfico** de Pucará te llevará a capturar los mejores encuadres del altiplano: el atardecer en la cima del Peñón, la fachada de piedra roja tallada del templo colonial de Santa Isabel y retratos de artesanos modelando barro vivo en sus talleres.';
        }

        if (cleanInput.includes('hola') || cleanInput.includes('buenos dias') || cleanInput.includes('buenas tardes') || cleanInput.includes('saludos') || cleanInput.includes('que tal') || cleanInput.includes('hello') || cleanInput.includes('hi')) {
            return isEn
                ? 'Hi! What a pleasure to greet you. I am ready to resolve all your questions about **Pucará 365**. How can I assist you today?'
                : '¡Hola! Qué alegría saludarte. Estoy listo para resolver todas tus dudas sobre el destino **Pucará 365**. ¿En qué puedo orientarte hoy?';
        }

        // Default fallback
        return isEn
            ? 'That is a great question about Pucará. I invite you to explore our **Attractions** section, the **Route Map**, or use the **Interactive Planner** at the bottom of the page to structure your ideal trip. Would you like to know more about a specific topic?'
            : 'Es una fantástica pregunta sobre Pucará. Te invito a explorar nuestra sección de **Atractivos**, el **Mapa de Ruta** o a usar el **Planificador Interactivo** al final de la página para estructurar tu viaje ideal. ¿Deseas saber más de algún punto en particular?';
    };

    const callGeminiAI = async (userPrompt) => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) return null;
        
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Eres Pukarin, el asistente virtual oficial del proyecto Pucará 365 (Pucará, Lampa, Puno, Perú). Responde de forma cálida, cultural y entusiasta en 2 a 4 oraciones destacando los atractivos de Kalasaya, el Museo Lítico, los Toritos de Pucará o paquetes turísticos. Pregunta del usuario: ${userPrompt}`
                        }]
                    }]
                })
            });
            const data = await response.json();
            if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                return data.candidates[0].content.parts[0].text;
            }
        } catch (err) {
            console.error("Gemini API call failed, using fallback:", err);
        }
        return null;
    };

    const sendMessage = async (textToSend = null) => {
        const text = textToSend !== null ? textToSend : inputValue;
        if (!text.trim()) return;

        // User message
        const newUserMessage = { sender: 'user', text };
        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue('');

        // Try Google Gemini AI first
        const geminiReply = await callGeminiAI(text);
        const botReplyText = geminiReply || getBotResponse(text);

        const newBotMessage = { sender: 'bot', text: botReplyText };
        setMessages((prev) => [...prev, newBotMessage]);
        speakText(botReplyText);
    };

    useEffect(() => {
        sendMessageRef.current = sendMessage;
    });

    const handleQuickQuestion = (question) => {
        sendMessage(question);
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
            
            {/* Floating Chat Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--primary)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 30px rgba(244, 206, 20, 0.4)',
                    border: '2px solid white',
                    cursor: 'pointer',
                    zIndex: 10000
                }}
            >
                {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
            </motion.button>

            {/* Chat Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 80, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 80, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 22 }}
                        style={{
                            position: 'absolute',
                            bottom: '80px',
                            right: '0',
                            width: '360px',
                            height: '500px',
                            backgroundColor: 'white',
                            borderRadius: '28px',
                            overflow: 'hidden',
                            boxShadow: '0 24px 60px rgba(15, 44, 89, 0.25)',
                            border: '1px solid rgba(15, 44, 89, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            color: '#1F2937'
                        }}
                    >
                        {/* Chat Header */}
                        <div style={{
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            padding: '1.25rem 1.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '3px solid var(--accent)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Sparkles size={20} className="text-accent" style={{ color: 'var(--accent)' }} />
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                                        {i18n.language === 'es' ? 'Guía IA Pucareña' : 'Pucará AI Guide'}
                                    </h4>
                                    <span style={{ fontSize: '0.75rem', opacity: 0.7, display: 'block' }}>
                                        {i18n.language === 'es' ? 'En línea y listo' : 'Online & Ready'}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Speech Mute / Unmute Button */}
                            <button
                                onClick={() => {
                                    setIsMuted(!isMuted);
                                    if (isMuted) {
                                        setTimeout(() => speakText(i18n.language === 'es' ? "Audio activado" : "Audio activated"), 100);
                                    } else {
                                        window.speechSynthesis.cancel();
                                    }
                                }}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    opacity: 0.8,
                                    padding: '0.25rem',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} style={{ color: 'var(--accent)' }} />}
                            </button>
                        </div>

                        {/* Message History area */}
                        <div style={{
                            flexGrow: 1,
                            padding: '1.25rem',
                            overflowY: 'auto',
                            backgroundColor: '#F8FAFC',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    style={{
                                        alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                                        maxWidth: '85%',
                                        backgroundColor: msg.sender === 'bot' ? 'white' : 'var(--primary)',
                                        color: msg.sender === 'bot' ? '#374151' : 'white',
                                        padding: '0.85rem 1.1rem',
                                        borderRadius: msg.sender === 'bot' ? '20px 20px 20px 4px' : '20px 20px 4px 20px',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.45,
                                        border: msg.sender === 'bot' ? '1px solid #E2E8F0' : 'none'
                                    }}
                                >
                                    {msg.text.split('**').map((part, index) => 
                                        index % 2 === 1 ? <strong key={index} style={{ color: msg.sender === 'bot' ? 'var(--primary)' : 'var(--accent)' }}>{part}</strong> : part
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions Chips */}
                        <div style={{
                            padding: '0.75rem 1.25rem',
                            backgroundColor: '#F8FAFC',
                            borderTop: '1px solid #E2E8F0',
                            display: 'flex',
                            gap: '0.5rem',
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                            scrollbarWidth: 'none'
                        }}>
                            {(i18n.language === 'es' ? [
                                '¿Qué significa el Torito?',
                                '¿Cómo llegar a Pucará?',
                                '¿Qué ver en Kalasaya?',
                                '¿Cuáles son las festividades?',
                                '¿Qué clima hace?'
                            ] : [
                                'What does the Torito mean?',
                                'How to get to Pucará?',
                                'What to see in Kalasaya?',
                                'What are the festivals?',
                                'What is the weather like?'
                            ]).map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuickQuestion(q)}
                                    style={{
                                        fontSize: '0.75rem',
                                        backgroundColor: 'white',
                                        color: 'var(--primary)',
                                        border: '1px solid rgba(15, 44, 89, 0.15)',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '30px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        flexShrink: 0,
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'var(--primary)';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'white';
                                        e.target.style.color = 'var(--primary)';
                                    }}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        {/* Input Footer */}
                        <div style={{
                            padding: '0.85rem 1.25rem',
                            backgroundColor: 'white',
                            borderTop: '1px solid #E2E8F0',
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center'
                        }}>
                            {/* Microphone Voice Input */}
                            <button
                                onClick={toggleListening}
                                style={{
                                    backgroundColor: isListening ? 'rgba(217, 95, 89, 0.1)' : '#F1F5F9',
                                    color: isListening ? 'var(--secondary)' : '#6B7280',
                                    border: 'none',
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    transition: 'all 0.2s'
                                }}
                                title="Hablarle al asistente"
                            >
                                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                            </button>

                            {/* Chat Text Input */}
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder={isListening ? "Escuchando..." : "Escribe tu pregunta aquí..."}
                                disabled={isListening}
                                style={{
                                    flexGrow: 1,
                                    border: '1px solid #E2E8F0',
                                    borderRadius: '12px',
                                    padding: '0.6rem 1rem',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    backgroundColor: '#F8FAFC'
                                }}
                            />

                            {/* Send Button */}
                            <button
                                onClick={() => sendMessage()}
                                style={{
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    flexShrink: 0
                                }}
                            >
                                <Send size={16} />
                            </button>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIChatBot;
