import { useState } from 'react';
import brain from 'brain.js';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Brain, Sparkles, Trophy, Award, RefreshCw } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    q: 'En tu vida cotidiana, ¿cuál es el valor que consideras más indispensable?',
    options: [
      { text: 'El amor familiar, la unión y la protección del hogar.', values: { amor: 1, sabiduria: 0, naturaleza: 0, paz: 0 } },
      { text: 'La prosperidad, el crecimiento intelectual y la abundancia.', values: { amor: 0, sabiduria: 1, naturaleza: 0, paz: 0 } },
      { text: 'La salud, la vitalidad y la conexión con la Madre Tierra.', values: { amor: 0, sabiduria: 0, naturaleza: 1, paz: 0 } },
      { text: 'La paz mental, la pureza y la calma ante el caos.', values: { amor: 0, sabiduria: 0, naturaleza: 0, paz: 1 } }
    ]
  },
  {
    id: 2,
    q: '¿Cómo reaccionas ante los grandes desafíos y dificultades de la vida?',
    options: [
      { text: 'Con coraje, pasión interna y fuerza para proteger a los míos.', values: { amor: 1, sabiduria: 0, naturaleza: 0, paz: 0 } },
      { text: 'Analizando con sabiduría, buscando oportunidades en la crisis.', values: { amor: 0, sabiduria: 1, naturaleza: 0, paz: 0 } },
      { text: 'Con resiliencia, curando mis heridas en la naturaleza.', values: { amor: 0, sabiduria: 0, naturaleza: 1, paz: 0 } },
      { text: 'Manteniendo la mente fría, respirando y dialogando en paz.', values: { amor: 0, sabiduria: 0, naturaleza: 0, paz: 1 } }
    ]
  },
  {
    id: 3,
    q: '¿Qué elemento del místico altiplano de Puno te inspira mayor respeto?',
    options: [
      { text: 'El fuego sagrado de los rituales y la tierra fértil arcillosa.', values: { amor: 1, sabiduria: 0, naturaleza: 0, paz: 0 } },
      { text: 'El sol radiante (Inti) madurando los campos dorados de quinua.', values: { amor: 0, sabiduria: 1, naturaleza: 0, paz: 0 } },
      { text: 'Las aguas curativas del Lago Titicaca y las hierbas medicinales.', values: { amor: 0, sabiduria: 0, naturaleza: 1, paz: 0 } },
      { text: 'Los nevados eternos (Apus) brillando bajo el cielo límpido.', values: { amor: 0, sabiduria: 0, naturaleza: 0, paz: 1 } }
    ]
  }
];

const TRAINING_DATA = [
  { input: { amor: 1, sabiduria: 0, naturaleza: 0, paz: 0 }, output: { rojo: 1 } },
  { input: { amor: 0, sabiduria: 1, naturaleza: 0, paz: 0 }, output: { amarillo: 1 } },
  { input: { amor: 0, sabiduria: 0, naturaleza: 1, paz: 0 }, output: { verde: 1 } },
  { input: { amor: 0, sabiduria: 0, naturaleza: 0, paz: 1 }, output: { blanco: 1 } },
  // Mixed profiles
  { input: { amor: 0.67, sabiduria: 0.33, naturaleza: 0, paz: 0 }, output: { rojo: 0.8, amarillo: 0.2 } },
  { input: { amor: 0, sabiduria: 0.67, naturaleza: 0, paz: 0.33 }, output: { amarillo: 0.7, blanco: 0.3 } },
  { input: { amor: 0, sabiduria: 0, naturaleza: 0.67, paz: 0.33 }, output: { verde: 0.7, blanco: 0.3 } },
  { input: { amor: 0.33, sabiduria: 0, naturaleza: 0.67, paz: 0 }, output: { rojo: 0.3, verde: 0.7 } }
];

const COLOR_METADATA = {
  rojo: {
    colorKey: 'rojo',
    name: 'Torito de la Tierra y Protección (Rojo)',
    apu: 'Apu Huajsapata',
    desc: 'Tu perfil energético está profundamente ligado al coraje y la protección familiar. La red neuronal ha determinado que tu amuleto es el Torito Rojo de arcilla terracota, que ahuyenta las malas vibras y bendice el hogar.',
    hex: '#c85833'
  },
  amarillo: {
    colorKey: 'amarillo',
    name: 'Torito del Sol y la Sabiduría (Amarillo)',
    apu: 'Apu Allinccapac',
    desc: 'Posees una mente orientada al crecimiento, la prosperidad y la búsqueda constante de la sabiduría. Tu amuleto es el Torito de Oro Cenizo, atrayendo la abundancia material y espiritual.',
    hex: '#cc9c56'
  },
  verde: {
    colorKey: 'verde',
    name: 'Torito de la Salud y la Pachamama (Verde)',
    apu: 'Apu Illimani',
    desc: 'Tu alma busca armonía y curación natural en sintonía con la Pachamama. Tu amuleto es el Torito Verde Ichu, símbolo de esperanza, salud física y equilibrio con la tierra andina.',
    hex: '#6a7b51'
  },
  blanco: {
    colorKey: 'blanco',
    name: 'Torito de la Calma y Pureza (Blanco)',
    apu: 'Apu Khapia',
    desc: 'Irradias paz mental, claridad y pureza espiritual. La red neuronal te asigna el Torito de Piedra Tiza, ideal para limpiar las energías familiares, sanar rencores y mantener la calma.',
    hex: '#dfdcd4'
  }
};

const PucaraOracleNN = ({ onUnlockColor }) => {
  // Game state: 'intro', 'quiz', 'training', 'result'
  const [gameState, setGameState] = useState('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [accumulatedValues, setAccumulatedValues] = useState({ amor: 0, sabiduria: 0, naturaleza: 0, paz: 0 });
  const [epochs, setEpochs] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [animateSynapses, setAnimateSynapses] = useState(false);

  const startQuiz = () => {
    setAccumulatedValues({ amor: 0, sabiduria: 0, naturaleza: 0, paz: 0 });
    setCurrentQuestionIdx(0);
    setGameState('quiz');
  };

  const handleAnswerSelect = (optionValues) => {
    // Add selected weights to accumulated values
    setAccumulatedValues(prev => ({
      amor: prev.amor + (optionValues.amor || 0),
      sabiduria: prev.sabiduria + (optionValues.sabiduria || 0),
      naturaleza: prev.naturaleza + (optionValues.naturaleza || 0),
      paz: prev.paz + (optionValues.paz || 0),
    }));

    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      runNeuralNetwork();
    }
  };

  const runNeuralNetwork = () => {
    setGameState('training');
    setAnimateSynapses(true);

    // 1. Setup Brain.js neural network
    const net = new brain.NeuralNetwork({
      hiddenLayers: [4] // 4 hidden neurons
    });

    // 2. Train network locally (takes less than 1ms, but we animate epochs for wow factor)
    net.train(TRAINING_DATA, { iterations: 1000 });

    // Animate epoch counter
    let epochCounter = 0;
    const interval = setInterval(() => {
      epochCounter += 40;
      if (epochCounter >= 1000) {
        clearInterval(interval);
        setEpochs(1000);

        // 3. Normalize inputs (divide by 3 since there are 3 questions)
        const finalInput = {
          amor: accumulatedValues.amor / 3,
          sabiduria: accumulatedValues.sabiduria / 3,
          naturaleza: accumulatedValues.naturaleza / 3,
          paz: accumulatedValues.paz / 3
        };

        // 4. Predict output using trained network
        const output = net.run(finalInput);

        // Find max output key
        let maxKey = 'rojo';
        let maxValue = 0;
        Object.entries(output).forEach(([key, val]) => {
          if (val > maxValue) {
            maxValue = val;
            maxKey = key;
          }
        });

        // Safe fallback
        if (!COLOR_METADATA[maxKey]) {
          maxKey = 'rojo';
        }

        setPrediction(COLOR_METADATA[maxKey]);
        setAnimateSynapses(false);
        setGameState('result');
      } else {
        setEpochs(epochCounter);
      }
    }, 50);
  };

  const handleApplyColor = () => {
    if (!prediction) return;
    onUnlockColor?.(prediction.colorKey);
    // Smooth scroll to Planner
    document.getElementById('pucara-planificador')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pucara-oraculo" className="section bg-light" style={{ position: 'relative', overflow: 'hidden', padding: '6.5rem 0', borderTop: '1px solid rgba(184, 92, 56, 0.08)' }}>
      {/* Background patterns */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(200, 88, 51, 0.02) 1px, transparent 1px)',
        backgroundSize: '30px 30px', pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="script-subtitle">Ritual Digital & Inteligencia Artificial...</span>
          <h2 className="bold-title">El Oráculo Místico de los Apus</h2>
          <div style={{ height: '4px', background: 'var(--accent)', width: '80px', margin: '1rem auto 1.5rem auto', borderRadius: '2px' }} />
          <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Responde tres preguntas existenciales para sintonizar tu vibración con el altiplano de Puno. Una **red neuronal artificial** procesará tu energía en vivo para revelarte tu Torito guardián.
          </p>
        </div>

        <div style={{
          maxWidth: '850px',
          margin: '0 auto',
          background: 'white',
          border: '1px solid rgba(15, 44, 89, 0.08)',
          borderRadius: '32px',
          boxShadow: 'var(--shadow-premium)',
          padding: '3rem',
          minHeight: '460px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          <AnimatePresence mode="wait">
            
            {/* 1. INTRO STATE */}
            {gameState === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
              >
                <div style={{
                  width: '74px', height: '74px', borderRadius: '50%',
                  backgroundColor: 'rgba(244, 206, 20, 0.12)',
                  color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(244, 206, 20, 0.25)', marginBottom: '0.5rem'
                }}>
                  <Brain size={38} className="pulse-slow" />
                </div>

                <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                  Inicia la Predicción Neuronal
                </h3>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '550px', margin: 0 }}>
                  A diferencia de los cuestionarios estáticos, este oráculo entrena dinámicamente un modelo matemático de neuronas artificiales feed-forward en tu dispositivo, encontrando patrones entre tus respuestas y la mitología de los Apus protectores.
                </p>

                <button
                  onClick={startQuiz}
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--primary)',
                    padding: '1.1rem 2.5rem',
                    borderRadius: '18px',
                    border: 'none',
                    fontWeight: 900,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    boxShadow: '0 10px 25px rgba(244, 206, 20, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '1rem'
                  }}
                >
                  <Sparkles size={18} /> Iniciar Consulta
                </button>
              </motion.div>
            )}

            {/* 2. QUIZ STATE */}
            {gameState === 'quiz' && (
              <motion.div
                key={`quiz-${currentQuestionIdx}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(200, 88, 51, 0.08)', padding: '0.25rem 0.75rem', borderRadius: '8px', fontWeight: 'bold', color: 'var(--secondary)', textTransform: 'uppercase' }}>
                    Pregunta {currentQuestionIdx + 1} de {QUESTIONS.length}
                  </span>
                  <h3 style={{ margin: '0.75rem 0 0 0', fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 800, lineHeight: 1.35 }}>
                    {QUESTIONS[currentQuestionIdx].q}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {QUESTIONS[currentQuestionIdx].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswerSelect(opt.values)}
                      style={{
                        padding: '1.15rem 1.5rem',
                        borderRadius: '16px',
                        border: '1.5px solid rgba(15, 44, 89, 0.08)',
                        background: 'rgba(15, 44, 89, 0.02)',
                        textAlign: 'left',
                        fontSize: '0.98rem',
                        color: 'var(--primary)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.25s',
                        lineHeight: 1.4
                      }}
                      onMouseEnter={e => {
                        e.target.style.borderColor = 'var(--secondary)';
                        e.target.style.background = 'rgba(200, 88, 51, 0.03)';
                      }}
                      onMouseLeave={e => {
                        e.target.style.borderColor = 'rgba(15, 44, 89, 0.08)';
                        e.target.style.background = 'rgba(15, 44, 89, 0.02)';
                      }}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 3. TRAINING STATE */}
            {gameState === 'training' && (
              <motion.div
                key="training"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--primary)', fontWeight: 800 }}>
                    Entrenando Red Neuronal Local
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Ajustando pesos sinápticos en tiempo real (Backpropagation)...
                  </p>
                </div>

                {/* ANIMATED NEURAL NETWORK SVG */}
                <svg width="460" height="200" viewBox="0 0 460 200" style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="synapse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Connective lines (Synapses) */}
                  {/* Input layer (4) to Hidden layer (4) */}
                  {[35, 75, 115, 155].map((yInput, i) => (
                    [35, 75, 115, 155].map((yHidden, j) => (
                      <g key={`syn-1-${i}-${j}`}>
                        <line
                          x1="50" y1={yInput}
                          x2="230" y2={yHidden}
                          stroke="url(#synapse-grad)"
                          strokeWidth="1.5"
                          opacity="0.25"
                        />
                        {animateSynapses && (
                          <circle r="3" fill="var(--accent)">
                            <animateMotion
                              path={`M50,${yInput} L230,${yHidden}`}
                              dur={`${Math.random() * 1 + 0.5}s`}
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                      </g>
                    ))
                  ))}

                  {/* Hidden layer (4) to Output layer (4) */}
                  {[35, 75, 115, 155].map((yHidden, i) => (
                    [35, 75, 115, 155].map((yOutput, j) => (
                      <g key={`syn-2-${i}-${j}`}>
                        <line
                          x1="230" y1={yHidden}
                          x2="410" y2={yOutput}
                          stroke="url(#synapse-grad)"
                          strokeWidth="1.5"
                          opacity="0.25"
                        />
                        {animateSynapses && (
                          <circle r="3" fill="var(--secondary)">
                            <animateMotion
                              path={`M230,${yHidden} L410,${yOutput}`}
                              dur={`${Math.random() * 1 + 0.5}s`}
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                      </g>
                    ))
                  ))}

                  {/* Input Nodes (Layer 1) */}
                  {['Amor', 'Mente', 'Tierra', 'Paz'].map((label, idx) => {
                    const y = 35 + idx * 40;
                    return (
                      <g key={`in-${idx}`}>
                        <circle cx="50" cy={y} r="14" fill="var(--primary)" stroke="var(--accent)" strokeWidth="2" />
                        <text x="30" y={y + 4} fontSize="9" fill="var(--primary)" fontWeight="800" textAnchor="end">{label}</text>
                      </g>
                    );
                  })}

                  {/* Hidden Nodes (Layer 2) */}
                  {[0, 1, 2, 3].map((_, idx) => {
                    const y = 35 + idx * 40;
                    return (
                      <g key={`hid-${idx}`}>
                        <circle cx="230" cy={y} r="12" fill="var(--secondary)" stroke="white" strokeWidth="2" className="pulse-slow" />
                      </g>
                    );
                  })}

                  {/* Output Nodes (Layer 3) */}
                  {['Rojo', 'Amarillo', 'Verde', 'Blanco'].map((label, idx) => {
                    const y = 35 + idx * 40;
                    const colorsList = ['#c85833', '#cc9c56', '#6a7b51', '#dfdcd4'];
                    return (
                      <g key={`out-${idx}`}>
                        <circle cx="410" cy={y} r="14" fill={colorsList[idx]} stroke="var(--primary)" strokeWidth="2" />
                        <text x="430" y={y + 4} fontSize="9" fill="var(--primary)" fontWeight="800" textAnchor="start">{label}</text>
                      </g>
                    );
                  })}
                </svg>

                {/* Progress bar */}
                <div style={{ width: '100%', maxWidth: '300px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.35rem' }}>
                    <span>Épocas entrenadas:</span>
                    <span>{epochs}/1000</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(15, 44, 89, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(epochs / 1000) * 100}%`, height: '100%', backgroundColor: 'var(--accent)', transition: 'width 0.1s' }} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. RESULT STATE */}
            {gameState === 'result' && prediction && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ type: 'spring', stiffness: 100 }}
                style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
              >
                <div style={{
                  width: '84px', height: '84px', borderRadius: '50%',
                  backgroundColor: 'white',
                  border: `4px solid ${prediction.hex}`,
                  color: prediction.hex, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 25px ${prediction.hex}40`, marginBottom: '0.5rem'
                }}>
                  <Award size={44} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Resultado del Oráculo IA
                  </span>
                  <h3 style={{ margin: 0, fontSize: '2.1rem', color: 'var(--primary)', fontWeight: 900, fontFamily: 'var(--font-heading)' }}>
                    {prediction.name}
                  </h3>
                  <span style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Apu Guardián: {prediction.apu}
                  </span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.6, maxWidth: '580px', margin: 0 }}>
                  {prediction.desc}
                </p>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    onClick={startQuiz}
                    style={{
                      background: 'transparent',
                      color: 'var(--primary)',
                      border: '2px solid rgba(15, 44, 89, 0.15)',
                      padding: '1rem 2rem',
                      borderRadius: '16px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.25s'
                    }}
                    onMouseEnter={e => e.target.style.borderColor = 'var(--primary)'}
                    onMouseLeave={e => e.target.style.borderColor = 'rgba(15, 44, 89, 0.15)'}
                  >
                    <RefreshCw size={18} /> Reintentar Ritual
                  </button>

                  <button
                    onClick={handleApplyColor}
                    style={{
                      background: prediction.hex,
                      color: prediction.colorKey === 'blanco' || prediction.colorKey === 'amarillo' ? 'var(--primary)' : 'white',
                      border: 'none',
                      padding: '1.1rem 2.2rem',
                      borderRadius: '16px',
                      fontWeight: 900,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: `0 10px 25px ${prediction.hex}35`,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    <Trophy size={18} /> Desbloquear y Pintar Torito 3D
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default PucaraOracleNN;
