import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Trophy, HelpCircle, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ShieldCheck, MapPin, Award } from 'lucide-react';

const MAZE_STAGES = [
    {
        id: 0,
        name: "El Peñón Sagrado",
        description: "Encuentra la salida del laberinto rocoso del Peñón. Busca la ofrenda sagrada antes de llegar al portal.",
        gridSize: 4,
        startPos: { x: 0, y: 3 },
        endPos: { x: 3, y: 0 },
        relicPos: { x: 2, y: 1 },
        relicName: "K'intu de Hojas de Coca",
        relicFact: "El K'intu son tres hojas de coca perfectas que se presentan como ofrenda a los Apus para pedir protección.",
        obstacles: [
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 1, y: 1 }
        ],
        trivia: {
            question: "¿Qué representa espiritualmente el Peñón de Pucará para los pobladores locales?",
            options: [
                "Un mirador militar incaico.",
                "Un Apu sagrado guardián y protector de la comunidad.",
                "Un yacimiento de oro sin explotar."
            ],
            correctIdx: 1,
            feedback: "¡Correcto! El Peñón es considerado un Apu tutelar, un guardián espiritual al que se le rinde respeto."
        }
    },
    {
        id: 1,
        name: "El Templo de Piedra Roja",
        description: "Navega las catacumbas coloniales del Templo de Santa Isabel. Descubre el grabado secreto sincrético.",
        gridSize: 4,
        startPos: { x: 3, y: 3 },
        endPos: { x: 0, y: 0 },
        relicPos: { x: 1, y: 2 },
        relicName: "Tallado Colonial de Torito",
        relicFact: "Los toritos de arcilla reemplazaron a las illas de piedra pre-incas (amuleto de alpaca) tras la llegada de los jesuitas.",
        obstacles: [
            { x: 2, y: 0 },
            { x: 2, y: 1 },
            { x: 0, y: 2 }
        ],
        trivia: {
            question: "¿De qué material y color está construido el Templo de Santa Isabel de Pucará?",
            options: [
                "Adobe blanco enlucido.",
                "Piedra caliza gris tallada.",
                "Piedra arenisca de color rojo traída de canteras locales."
            ],
            correctIdx: 2,
            feedback: "¡Exacto! El templo luce su icónico color rojo debido al uso de arenisca roja labrada."
        }
    },
    {
        id: 2,
        name: "Las Ruinas de Kalasaya",
        description: "Cruza las terrazas piramidales de Kalasaya. Descubre el patio hundido ceremonial.",
        gridSize: 4,
        startPos: { x: 0, y: 0 },
        endPos: { x: 3, y: 3 },
        relicPos: { x: 2, y: 2 },
        relicName: "Estela Hatun Ñakaj",
        relicFact: "Hatun Ñakaj significa el gran Degollador en quechua, deidad ancestral que regulaba las lluvias y la fertilidad.",
        obstacles: [
            { x: 1, y: 2 },
            { x: 3, y: 1 },
            { x: 0, y: 3 }
        ],
        trivia: {
            question: "¿A qué cultura pre-inca principal pertenece la pirámide de Kalasaya?",
            options: [
                "Cultura Pucará (aprox. 500 a.C. - 200 d.C.).",
                "Imperio Wari.",
                "Cultura Tiahuanaco tardía."
            ],
            correctIdx: 0,
            feedback: "¡Excelente! Kalasaya es el centro administrativo y ceremonial supremo de la Cultura Pucará."
        }
    }
];

const PucaraMaze = () => {
    const [currentStageIdx, setCurrentStageIdx] = useState(0);
    const [playerPos, setPlayerPos] = useState(MAZE_STAGES[0].startPos);
    const [foundRelic, setFoundRelic] = useState(false);
    const [collectedRelics, setCollectedRelics] = useState([]);
    
    // Game phases: 'playing', 'trivia', 'complete', 'victory'
    const [gameState, setGameState] = useState('playing');
    const [triviaAnswer, setTriviaAnswer] = useState(null);
    const [triviaFeedback, setTriviaFeedback] = useState('');
    const [score, setScore] = useState(0);

    const stage = MAZE_STAGES[currentStageIdx];

    // Check if cell is an obstacle
    const isObstacle = (x, y) => {
        return stage.obstacles.some(obs => obs.x === x && obs.y === y);
    };

    // Move player in the grid
    const handleMove = (dx, dy) => {
        if (gameState !== 'playing') return;

        const newX = playerPos.x + dx;
        const newY = playerPos.y + dy;

        // Check grid boundary limits
        if (newX >= 0 && newX < stage.gridSize && newY >= 0 && newY < stage.gridSize) {
            // Check obstacle collision
            if (!isObstacle(newX, newY)) {
                setPlayerPos({ x: newX, y: newY });

                // Check relic detection
                if (newX === stage.relicPos.x && newY === stage.relicPos.y && !foundRelic) {
                    setFoundRelic(true);
                    setScore(prev => prev + 100);
                    setCollectedRelics([...collectedRelics, stage.relicName]);
                }

                // Check end portal destination
                if (newX === stage.endPos.x && newY === stage.endPos.y) {
                    setGameState('trivia');
                }
            }
        }
    };

    // Handle Keyboard moves
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'w') handleMove(0, -1);
        if (e.key === 'ArrowDown' || e.key === 's') handleMove(0, 1);
        if (e.key === 'ArrowLeft' || e.key === 'a') handleMove(-1, 0);
        if (e.key === 'ArrowRight' || e.key === 'd') handleMove(1, 0);
    };

    // Check Trivia response
    const handleTriviaOptionClick = (idx) => {
        if (triviaAnswer !== null) return;
        setTriviaAnswer(idx);
        if (idx === stage.trivia.correctIdx) {
            setScore(prev => prev + 150);
            setTriviaFeedback(stage.trivia.feedback);
        } else {
            setTriviaFeedback("Esa respuesta no es correcta. Pero no te preocupes, ¡la sabiduría andina te permite avanzar!");
        }
    };

    // Proceed to next level or final screen
    const handleNextStage = () => {
        setTriviaAnswer(null);
        setTriviaFeedback('');
        setFoundRelic(false);

        if (currentStageIdx < MAZE_STAGES.length - 1) {
            const nextIdx = currentStageIdx + 1;
            setCurrentStageIdx(nextIdx);
            setPlayerPos(MAZE_STAGES[nextIdx].startPos);
            setGameState('playing');
        } else {
            setGameState('victory');
        }
    };

    const handleRestart = () => {
        setCurrentStageIdx(0);
        setPlayerPos(MAZE_STAGES[0].startPos);
        setFoundRelic(false);
        setCollectedRelics([]);
        setScore(0);
        setTriviaAnswer(null);
        setTriviaFeedback('');
        setGameState('playing');
    };

    return (
        <section id="pucara-laberinto" className="section bg-blue-contrast" style={{ position: 'relative', overflow: 'hidden', padding: '6.5rem 0' }}>
            {/* Background elements */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(204, 156, 86, 0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.3
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                
                {/* Header Title in Larana Style */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <span className="script-subtitle">Aventura Vivencial Gamificada...</span>
                    <h2 className="bold-title">El Laberinto de los Apus</h2>
                    <div style={{ height: '4px', background: 'var(--accent)', width: '80px', margin: '1rem auto 1.5rem auto', borderRadius: '2px' }} />
                    <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
                        Cruza los caminos interactivos de Pucará para recolectar reliquias, responder trivias culturales y aprender la historia altiplánica. ¡Usa los botones o flechas del teclado!
                    </p>
                </div>

                {/* Score & Progress Panel */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'rgba(15, 44, 89, 0.03)',
                    border: '1px solid rgba(15, 44, 89, 0.08)',
                    padding: '1.25rem 2rem',
                    borderRadius: '20px',
                    marginBottom: '3rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <MapPin style={{ color: 'var(--secondary)' }} size={20} />
                        <span style={{ fontSize: '1rem', fontWeight: 700 }}>
                            Ubicación: <span style={{ color: 'var(--secondary)' }}>{stage.name}</span> (Ruta {currentStageIdx + 1}/3)
                        </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Trophy style={{ color: 'var(--secondary)' }} size={20} />
                            <span style={{ fontSize: '1rem', fontWeight: 800 }}>Puntos: {score}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Award style={{ color: 'var(--secondary)' }} size={20} />
                            <span style={{ fontSize: '1.05rem', fontWeight: 800 }}>Reliquias: {collectedRelics.length}</span>
                        </div>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr',
                    gap: '4rem',
                    alignItems: 'stretch'
                }} className="maze-grid">

                    {/* Left Side: Game Canvas/Board Area */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        
                        <AnimatePresence mode="wait">
                            {gameState === 'playing' && (
                                <motion.div
                                    key="playing-board"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    style={{
                                        backgroundColor: 'rgba(15, 44, 89, 0.04)',
                                        border: '2px solid rgba(15, 44, 89, 0.08)',
                                        borderRadius: '32px',
                                        padding: '2rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minHeight: '400px'
                                    }}
                                >
                                    {/* Grid Board */}
                                    <div 
                                        tabIndex="0"
                                        onKeyDown={handleKeyDown}
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: `repeat(${stage.gridSize}, 80px)`,
                                            gridTemplateRows: `repeat(${stage.gridSize}, 80px)`,
                                            gap: '8px',
                                            padding: '12px',
                                            background: 'rgba(255,255,255,0.04)',
                                            borderRadius: '24px',
                                            border: '1.5px solid rgba(255,255,255,0.1)',
                                            outline: 'none',
                                            boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        {Array.from({ length: stage.gridSize }).map((_, y) => 
                                            Array.from({ length: stage.gridSize }).map((_, x) => {
                                                const isPlayer = playerPos.x === x && playerPos.y === y;
                                                const isStart = stage.startPos.x === x && stage.startPos.y === y;
                                                const isEnd = stage.endPos.x === x && stage.endPos.y === y;
                                                const isRelic = stage.relicPos.x === x && stage.relicPos.y === y;
                                                const isColObs = isObstacle(x, y);

                                                return (
                                                    <div
                                                        key={`${x}-${y}`}
                                                        style={{
                                                            width: '80px',
                                                            height: '80px',
                                                            borderRadius: '16px',
                                                            backgroundColor: isColObs 
                                                                ? '#1E293B' 
                                                                : isStart 
                                                                    ? 'rgba(244, 206, 20, 0.1)' 
                                                                    : isEnd 
                                                                        ? 'rgba(217, 95, 89, 0.15)' 
                                                                        : 'rgba(255,255,255,0.03)',
                                                            border: isColObs 
                                                                ? '1px solid rgba(255,255,255,0.05)' 
                                                                : isEnd 
                                                                    ? '2px dashed var(--secondary)' 
                                                                    : '1px solid rgba(255,255,255,0.05)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            position: 'relative'
                                                        }}
                                                    >
                                                        {/* Obstacle rock representation */}
                                                        {isColObs && (
                                                            <div style={{ width: '36px', height: '36px', background: '#475569', borderRadius: '8px' }} />
                                                        )}

                                                        {/* End Portal Portal Gate */}
                                                        {isEnd && !isPlayer && (
                                                            <div style={{ color: 'var(--secondary)', fontWeight: 800, fontSize: '0.8rem', textAlign: 'center' }}>Portal</div>
                                                        )}

                                                        {/* Relic piece icon */}
                                                        {isRelic && !foundRelic && (
                                                            <motion.div
                                                                animate={{ scale: [1, 1.2, 1] }}
                                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                                style={{
                                                                    width: '28px',
                                                                    height: '28px',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: 'var(--accent)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    boxShadow: '0 0 15px var(--accent)'
                                                                }}
                                                            >
                                                                <Award size={16} color="var(--primary)" />
                                                            </motion.div>
                                                        )}

                                                        {/* Player token representation */}
                                                        {isPlayer && (
                                                            <motion.div
                                                                layoutId="player-token"
                                                                style={{
                                                                    width: '38px',
                                                                    height: '38px',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: 'var(--accent)',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    boxShadow: '0 0 20px var(--accent)',
                                                                    border: '2px solid white',
                                                                    zIndex: 5
                                                                }}
                                                            >
                                                                <Compass size={20} color="var(--primary)" className="animate-spin" style={{ animationDuration: '6s' }} />
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Trivia Mode Question Box */}
                            {gameState === 'trivia' && (
                                <motion.div
                                    key="trivia-box"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    style={{
                                        backgroundColor: 'var(--primary)',
                                        border: '1.5px solid var(--accent)',
                                        borderRadius: '32px',
                                        padding: '3rem',
                                        minHeight: '400px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        boxShadow: 'var(--shadow-premium)'
                                    }}
                                >
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <HelpCircle size={28} style={{ color: 'var(--accent)' }} />
                                        <h3 style={{ margin: 0, fontSize: '1.6rem', fontFamily: 'var(--font-heading)', color: 'white', fontWeight: 700 }}>
                                            Pregunta Mística de Entrada
                                        </h3>
                                    </div>
                                    
                                    <p style={{ fontSize: '1.15rem', color: 'white', marginBottom: '2.5rem', lineHeight: '1.5', opacity: 0.95 }}>
                                        {stage.trivia.question}
                                    </p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                        {stage.trivia.options.map((opt, oIdx) => {
                                            const isSelected = triviaAnswer === oIdx;
                                            const isCorrect = oIdx === stage.trivia.correctIdx;
                                            
                                            let btnBorder = '1.5px solid rgba(255,255,255,0.15)';
                                            let btnBg = 'rgba(255,255,255,0.03)';
                                            if (triviaAnswer !== null) {
                                                if (isCorrect) {
                                                    btnBg = 'rgba(46, 125, 50, 0.2)';
                                                    btnBorder = '1.5px solid #2E7D32';
                                                } else if (isSelected) {
                                                    btnBg = 'rgba(217, 95, 89, 0.2)';
                                                    btnBorder = '1.5px solid var(--secondary)';
                                                }
                                            }

                                            return (
                                                <button
                                                    key={oIdx}
                                                    onClick={() => handleTriviaOptionClick(oIdx)}
                                                    style={{
                                                        padding: '1.1rem 1.5rem',
                                                        borderRadius: '16px',
                                                        textAlign: 'left',
                                                        border: btnBorder,
                                                        background: btnBg,
                                                        color: 'white',
                                                        fontSize: '1rem',
                                                        fontWeight: 700,
                                                        cursor: triviaAnswer !== null ? 'default' : 'pointer',
                                                        transition: 'all 0.3s'
                                                    }}
                                                >
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {triviaFeedback && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            style={{
                                                padding: '1.25rem',
                                                borderRadius: '16px',
                                                backgroundColor: 'rgba(0,0,0,0.2)',
                                                borderLeft: `4px solid ${triviaAnswer === stage.trivia.correctIdx ? '#2E7D32' : 'var(--secondary)'}`,
                                                marginBottom: '2rem',
                                                fontSize: '0.95rem',
                                                lineHeight: 1.5
                                            }}
                                        >
                                            {triviaFeedback}
                                        </motion.div>
                                    )}

                                    {triviaAnswer !== null && (
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={handleNextStage}
                                            style={{
                                                backgroundColor: 'var(--accent)',
                                                color: 'var(--primary)',
                                                fontWeight: 900,
                                                padding: '1.1rem',
                                                borderRadius: '16px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            }}
                                        >
                                            Continuar Ruta
                                        </motion.button>
                                    )}
                                </motion.div>
                            )}

                            {/* Game Completed Victory Screen */}
                            {gameState === 'victory' && (
                                <motion.div
                                    key="victory-screen"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        backgroundColor: 'var(--primary)',
                                        borderRadius: '32px',
                                        padding: '4rem 3rem',
                                        textAlign: 'center',
                                        minHeight: '400px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '1.5rem',
                                        boxShadow: 'var(--shadow-premium)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                >
                                    <div style={{
                                        width: '84px',
                                        height: '84px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(244, 206, 20, 0.15)',
                                        border: '2px solid var(--accent)',
                                        color: 'var(--accent)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 0 25px rgba(244,206,20,0.3)',
                                        marginBottom: '1rem'
                                    }}>
                                        <ShieldCheck size={44} />
                                    </div>

                                    <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: 'white', fontWeight: 800, margin: 0 }}>
                                        ¡Felicidades, Guardián de Pucará!
                                    </h3>
                                    
                                    <p style={{ maxWidth: '500px', color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
                                        Has cruzado los laberintos místicos con éxito, rescatado las {collectedRelics.length} reliquias andinas y dominado la historia del origen de Pucará.
                                    </p>

                                    <div style={{
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        borderRadius: '20px',
                                        padding: '1.5rem 2.5rem',
                                        border: '1px solid rgba(255,255,255,0.06)'
                                    }}>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Puntuación Final
                                        </div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginTop: '0.25rem' }}>
                                            {score} pts
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <button
                                            onClick={handleRestart}
                                            style={{
                                                padding: '1rem 2rem',
                                                borderRadius: '14px',
                                                border: '2px solid white',
                                                background: 'transparent',
                                                color: 'white',
                                                fontWeight: 800,
                                                cursor: 'pointer',
                                                textTransform: 'uppercase',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            Jugar de Nuevo
                                        </button>
                                        <button
                                            onClick={() => document.getElementById('pucara-planificador').scrollIntoView({ behavior: 'smooth' })}
                                            style={{
                                                padding: '1rem 2rem',
                                                borderRadius: '14px',
                                                border: 'none',
                                                background: 'var(--accent)',
                                                color: 'var(--primary)',
                                                fontWeight: 850,
                                                cursor: 'pointer',
                                                textTransform: 'uppercase',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            Verificar mi Premio
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Interactive D-PAD controller buttons (useful for mobile & quick clicking) */}
                        {gameState === 'playing' && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                <motion.button 
                                    whileTap={{ scale: 0.9 }} 
                                    onClick={() => handleMove(0, -1)} 
                                    style={{
                                        width: '54px', height: '48px', borderRadius: '12px', background: 'rgba(15, 44, 89, 0.04)',
                                        border: '1px solid rgba(15, 44, 89, 0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                    }}
                                >
                                    <ArrowUp size={22} />
                                </motion.button>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <motion.button 
                                        whileTap={{ scale: 0.9 }} 
                                        onClick={() => handleMove(-1, 0)} 
                                        style={{
                                            width: '54px', height: '48px', borderRadius: '12px', background: 'rgba(15, 44, 89, 0.04)',
                                            border: '1px solid rgba(15, 44, 89, 0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                        }}
                                    >
                                        <ArrowLeft size={22} />
                                    </motion.button>
                                    <motion.button 
                                        whileTap={{ scale: 0.9 }} 
                                        onClick={() => handleMove(0, 1)} 
                                        style={{
                                            width: '54px', height: '48px', borderRadius: '12px', background: 'rgba(15, 44, 89, 0.04)',
                                            border: '1px solid rgba(15, 44, 89, 0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                        }}
                                    >
                                        <ArrowDown size={22} />
                                    </motion.button>
                                    <motion.button 
                                        whileTap={{ scale: 0.9 }} 
                                        onClick={() => handleMove(1, 0)} 
                                        style={{
                                            width: '54px', height: '48px', borderRadius: '12px', background: 'rgba(15, 44, 89, 0.04)',
                                            border: '1px solid rgba(15, 44, 89, 0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                        }}
                                    >
                                        <ArrowRight size={22} />
                                    </motion.button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Informative Sidecard (Learning Fact Panel) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        
                        <div style={{
                            backgroundColor: 'white',
                            border: '1px solid rgba(15, 44, 89, 0.08)',
                            borderRadius: '28px',
                            padding: '2.5rem',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            <h4 style={{ color: 'var(--secondary)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', borderBottom: '1px solid rgba(15, 44, 89, 0.08)', paddingBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                                Misión de la Ruta
                            </h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.55', margin: 0 }}>
                                {stage.description}
                            </p>
                        </div>

                        {/* Relic Discover Dashboard */}
                        <div style={{
                            backgroundColor: 'white',
                            border: '1px solid rgba(15, 44, 89, 0.08)',
                            borderRadius: '28px',
                            padding: '2.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            flexGrow: 1,
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            <h4 style={{ color: 'var(--primary)', fontSize: '1.25rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-heading)' }}>
                                Libro de Reliquias Desbloqueadas
                            </h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {collectedRelics.length === 0 ? (
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                                        Navega en la cuadrícula y encuentra el icono de medalla dorada para desbloquear la reliquia de esta zona.
                                    </p>
                                ) : (
                                    collectedRelics.map((rel, rIdx) => (
                                        <motion.div
                                            key={rIdx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                padding: '1rem',
                                                borderRadius: '16px',
                                                backgroundColor: 'rgba(200, 88, 51, 0.08)',
                                                border: '1px solid rgba(200, 88, 51, 0.15)'
                                            }}
                                        >
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                backgroundColor: 'var(--secondary)',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 900
                                            }}>
                                                ✓
                                            </div>
                                            <div>
                                                <h5 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 800 }}>{rel}</h5>
                                                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.1rem', lineHeight: '1.3' }}>
                                                    {MAZE_STAGES.find(s => s.relicName === rel)?.relicFact}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .maze-grid {
                        grid-template-columns: 1fr !important;
                        gap: 2.5rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default PucaraMaze;
