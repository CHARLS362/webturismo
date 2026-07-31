import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QrCode, Download, Sparkles, MapPin, Palette, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const QR_FEATURES = [
  {
    id: 'kalasaya',
    name: {
      es: 'Complejo Kalasaya (Locución de Audio)',
      en: 'Kalasaya Complex (Audio Guide)'
    },
    description: {
      es: 'Enfoca el mapa 3D en Kalasaya, abre el panel informativo y reproduce la narración por voz.',
      en: 'Focuses the 3D map on Kalasaya, opens the info panel, and plays voice narration.'
    },
    urlParams: 'feature=mapa&point=0&unlock=kalasaya_stone',
    icon: Compass,
    color: '#8b5a2b',
    skinName: {
      es: 'Piedra Ancestral Kalasaya',
      en: 'Kalasaya Ancestral Stone'
    }
  },
  {
    id: 'penon',
    name: {
      es: 'El Peñón (Locución de Audio)',
      en: 'El Peñón Lookout (Audio Guide)'
    },
    description: {
      es: 'Enfoca el mapa 3D en el mirador natural de piedra roja, activa audio y abre información.',
      en: 'Focuses the 3D map on the natural red stone lookout, plays audio, and opens info.'
    },
    urlParams: 'feature=mapa&point=1&unlock=penon_lava',
    icon: Compass,
    color: '#ff4500',
    skinName: {
      es: 'Fuego del Apu Peñón',
      en: 'Apu Peñón Fire'
    }
  },
  {
    id: 'templo',
    name: {
      es: 'Templo de Santa Isabel (Locución de Audio)',
      en: 'Santa Isabel Church (Audio Guide)'
    },
    description: {
      es: 'Enfoca el mapa 3D en la fachada colonial jesuita de arenisca roja y activa narración por voz.',
      en: 'Focuses the 3D map on the Jesuit colonial red sandstone facade and plays audio.'
    },
    urlParams: 'feature=mapa&point=2&unlock=templo_gold',
    icon: Compass,
    color: '#ffd700',
    skinName: {
      es: 'Pan de Oro Barroco',
      en: 'Baroque Gold Leaf'
    }
  },
  {
    id: 'plaza',
    name: {
      es: 'Plaza de Armas (Locución de Audio)',
      en: 'Main Square (Audio Guide)'
    },
    description: {
      es: 'Enfoca el mapa 3D en el corazón del pueblo de Pucará con sus toritos gigantes y activa narración.',
      en: 'Focuses the 3D map on the heart of Pucará with its giant bulls and plays audio.'
    },
    urlParams: 'feature=mapa&point=3&unlock=plaza_multicolor',
    icon: Compass,
    color: '#ff007f',
    skinName: {
      es: 'Cerámica Policromada',
      en: 'Polychrome Ceramic'
    }
  },
  {
    id: 'museo',
    name: {
      es: 'Museo Lítico (Locución de Audio)',
      en: 'Lytic Museum (Audio Guide)'
    },
    description: {
      es: 'Enfoca el mapa 3D en el museo que resguarda la estela del Hatun Ñakaj y activa audio.',
      en: 'Focuses the 3D map on the museum guarding the Hatun Ñakaj stela and plays audio.'
    },
    urlParams: 'feature=mapa&point=4&unlock=museo_granite',
    icon: Compass,
    color: '#5c5c5c',
    skinName: {
      es: 'Monolito de Granito',
      en: 'Granite Monolith'
    }
  },
  {
    id: 'museo_virtual',
    name: {
      es: 'Visita Virtual Oficial: Museo Lítico Pucará',
      en: 'Official Virtual Tour: Pucará Lytic Museum'
    },
    description: {
      es: 'Redirige directamente al tour virtual oficial en 360° del Ministerio de Cultura.',
      en: 'Redirects directly to the official 360° virtual tour from the Ministry of Culture.'
    },
    directUrl: 'https://visitavirtual.cultura.pe/recorridos/MLP/museo-litico-pukara/index.html',
    icon: MapPin,
    color: '#B85C38',
    skinName: null
  },
  {
    id: 'torito_amarillo',
    name: {
      es: 'Torito 3D: Oro Cenizo / Abundancia',
      en: '3D Torito: Ash Gold / Abundancia'
    },
    description: {
      es: 'Abre el personalizador del Torito 3D preseleccionando el color de la prosperidad.',
      en: 'Opens the 3D Torito customizer pre-selecting the prosperity color.'
    },
    urlParams: 'feature=torito3d&color=amarillo',
    icon: Palette,
    color: '#cc9c56',
    skinName: null
  },
  {
    id: 'torito_verde',
    name: {
      es: 'Torito 3D: Verde Ichu / Curación',
      en: '3D Torito: Ichu Green / Healing'
    },
    description: {
      es: 'Abre el personalizador del Torito 3D preseleccionando el color verde de conexión con la Pachamama.',
      en: 'Opens the 3D Torito customizer pre-selecting the connection with Pachamama green color.'
    },
    urlParams: 'feature=torito3d&color=verde',
    icon: Palette,
    color: '#6a7b51',
    skinName: null
  },
  {
    id: 'chatbot_kalasaya',
    name: {
      es: 'Chatbot IA: Leyenda de Kalasaya',
      en: 'AI Chatbot: Legend of Kalasaya'
    },
    description: {
      es: 'Abre el Asistente de IA con una pregunta preestablecida sobre los misterios de Kalasaya.',
      en: 'Opens the AI Assistant with a pre-set query about the mysteries of Kalasaya.'
    },
    urlParams: {
      es: 'feature=chatbot&query=Cuéntame el misterio del patio hundido ceremonial de Kalasaya',
      en: 'feature=chatbot&query=Tell me the mystery of the sunken ceremonial court of Kalasaya'
    },
    icon: Sparkles,
    color: '#0b2240',
    skinName: null
  }
];

const PucaraQRGenerator = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const langKey = isEn ? 'en' : 'es';

  const [selectedFeatureIdx, setSelectedFeatureIdx] = useState(0);
  const qrSize = 256;
  const qrCanvasRef = useRef(null);

  const feature = QR_FEATURES[selectedFeatureIdx];
  const origin = window.location.origin + window.location.pathname;
  
  const resolvedParams = typeof feature.urlParams === 'object'
    ? feature.urlParams[langKey]
    : feature.urlParams;

  const fullRedirectUrl = feature.directUrl || `${origin}?${resolvedParams}`;

  const downloadQR = () => {
    if (!qrCanvasRef.current) return;
    const canvas = qrCanvasRef.current.querySelector('canvas');
    if (!canvas) return;

    // Convert canvas to downloadable PNG image link
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = `pucara-qr-${feature.id}.png`;
    a.href = url;
    a.click();
  };



  return (
    <section id="pucara-qr-generator" className="section bg-blue-contrast" style={{ position: 'relative', overflow: 'hidden', padding: '6.5rem 0' }}>
      {/* Background radial highlight */}
      <div style={{
        position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(197, 155, 39, 0.04) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="script-subtitle">{isEn ? 'DTI Promotion Tool' : 'Herramienta de Promoción DTI'}</span>
          <h2 className="bold-title">{isEn ? 'Smart QR Tourist Generator' : 'Generador de Códigos QR Turísticos'}</h2>
          <div style={{ height: '4px', background: 'var(--accent)', width: '80px', margin: '1rem auto 1.5rem auto', borderRadius: '2px' }} />
          <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            {isEn
              ? 'Generate and download QR codes to print and physically place at Pucará monuments. When scanned by tourists with their mobile devices, they will access specific features on the interactive site.'
              : 'Genera y descarga códigos QR para imprimir y colocar físicamente en los monumentos de Pucará. Al ser escaneados por los turistas con sus celulares, accederán a la web interactiva con la funcionalidad específica configurada.'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '3.5rem',
          alignItems: 'center'
        }} className="qr-hub-grid">

          {/* Left panel: Feature Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)' }}>
              {isEn ? '1. Select the QR Code Destination' : '1. Selecciona el Destino del Código QR'}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem' }}>
              {QR_FEATURES.map((item, idx) => {
                const IconComponent = item.icon;
                const isSelected = selectedFeatureIdx === idx;

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setSelectedFeatureIdx(idx)}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      padding: '1.25rem 1.5rem',
                      borderRadius: '20px',
                      background: isSelected ? '#FFFFFF' : 'rgba(15, 44, 89, 0.03)',
                      border: isSelected ? '2px solid var(--terracotta)' : '1px solid rgba(15, 44, 89, 0.08)',
                      boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s, background 0.2s'
                    }}
                  >
                    <div style={{
                      backgroundColor: isSelected ? 'rgba(184, 92, 56, 0.1)' : 'rgba(15, 44, 89, 0.05)',
                      color: isSelected ? 'var(--terracotta)' : 'var(--text-muted)',
                      padding: '0.75rem',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${isSelected ? 'var(--terracotta)' : 'rgba(15, 44, 89, 0.08)'}`
                    }}>
                      <IconComponent size={24} />
                    </div>

                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: isSelected ? 'var(--terracotta)' : 'var(--primary)', fontWeight: 800 }}>
                        {item.name[langKey]}
                      </h4>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                        {item.description[langKey]}
                      </p>
                      {item.skinName && isSelected && (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          marginTop: '0.5rem',
                          background: 'rgba(200, 88, 51, 0.12)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(200, 88, 51, 0.2)',
                          fontSize: '0.72rem',
                          color: '#e28743',
                          fontWeight: 'bold'
                        }}>
                          🎁 {isEn ? 'Unlocks skin: ' : 'Desbloquea skin: '}{item.skinName[langKey]}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right panel: QR code display and download */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              key={feature.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                backgroundColor: 'white',
                padding: '2.5rem',
                borderRadius: '32px',
                boxShadow: 'var(--shadow-premium)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                border: '1px solid rgba(15, 44, 89, 0.08)',
                width: '100%',
                maxWidth: '360px'
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {isEn ? 'Pucará QR Code' : 'Código QR de Pucará'}
              </span>

              {/* QR Canvas wrapper */}
              <div ref={qrCanvasRef} style={{
                padding: '1rem',
                background: 'white',
                borderRadius: '20px',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.06)'
              }}>
                <QRCodeCanvas
                  value={fullRedirectUrl}
                  size={qrSize}
                  level="H" // High error correction to allow center logo
                  includeMargin={false}
                  style={{ display: 'block' }}
                />
              </div>
              <div style={{ width: '100%', marginTop: '0.5rem' }}>
                <button
                  onClick={downloadQR}
                  style={{
                    width: '100%',
                    background: 'var(--secondary)',
                    color: 'white',
                    border: 'none',
                    padding: '0.9rem',
                    borderRadius: '16px',
                    fontWeight: 850,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 20px rgba(200, 88, 51, 0.25)',
                    transition: 'all 0.2s'
                  }}
                >
                  <Download size={18} /> {isEn ? 'Download QR' : 'Descargar QR'}
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .qr-hub-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PucaraQRGenerator;
