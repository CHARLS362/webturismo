import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster, toast } from 'sonner';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Overview from './components/Overview';
import Inclusions from './components/Inclusions';
import Itinerary from './components/Itinerary';
import PucaraDestinations from './components/PucaraDestinations';
import PucaraGallery from './components/PucaraGallery';
import PucaraWalkingTour from './components/PucaraWalkingTour';
import PucaraVirtualTour from './components/PucaraVirtualTour';
import PucaraMap from './components/PucaraMap';
import PucaraPackages from './components/PucaraPackages';
import PucaraFestivals from './components/PucaraFestivals';
import PucaraPlanner from './components/PucaraPlanner';
import Roadmap5Years from './components/Roadmap5Years';
import SmartDestinationDashboard from './components/SmartDestinationDashboard';
import Recommendations from './components/Recommendations';
import AccessibilityMenu from './components/AccessibilityMenu';
import AIChatBot from './components/AIChatBot';
import PucaraQRGenerator from './components/PucaraQRGenerator';
import PucaraOracleNN from './components/PucaraOracleNN';
import { lockedToritoSkins } from './data/pucaraData';
import { playMisticSound, triggerConfetti } from './utils/effects';
import './index.css';

function App() {
  const [currentPackage, setCurrentPackage] = useState('standard');
  const [unlockedSkins, setUnlockedSkins] = useState(() => {
    try {
      const saved = localStorage.getItem('pucara_unlocked_skins');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [initialMapPoint, setInitialMapPoint] = useState(null);
  const [initialToritoColor, setInitialToritoColor] = useState(null);
  const [initialChatbotQuery, setInitialChatbotQuery] = useState('');

  const unlockSkin = (skinId) => {
    setUnlockedSkins((prev) => {
      if (prev.includes(skinId)) return prev;
      const next = [...prev, skinId];
      localStorage.setItem('pucara_unlocked_skins', JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const feature = params.get('feature');
    const point = params.get('point');
    const color = params.get('color');
    const query = params.get('query');
    const unlock = params.get('unlock');

    // Handle auto unlocking if parameter present
    if (unlock) {
      const foundSkin = lockedToritoSkins.find(s => s.color === unlock);
      if (foundSkin) {
        setTimeout(() => {
          unlockSkin(unlock);
          playMisticSound();
          triggerConfetti();
          toast.success(`🎉 ¡Felicidades! Has desbloqueado el Torito "${foundSkin.name}"`);
        }, 1500); // Small delay to let the page settle
      }
    }

    if (feature) {
      setTimeout(() => {
        if (feature === 'mapa') {
          if (point !== null) {
            setInitialMapPoint(parseInt(point, 10));
          }
          document.getElementById('pucara-mapa')?.scrollIntoView({ behavior: 'smooth' });
        } else if (feature === 'torito3d') {
          if (color) {
            setInitialToritoColor(color);
          }
          document.getElementById('pucara-planificador')?.scrollIntoView({ behavior: 'smooth' });
        } else if (feature === 'oraculo') {
          document.getElementById('pucara-oraculo')?.scrollIntoView({ behavior: 'smooth' });
        } else if (feature === 'tour360') {
          document.getElementById('pucara-tour360')?.scrollIntoView({ behavior: 'smooth' });
        } else if (feature === 'chatbot' && query) {
          setInitialChatbotQuery(query);
        }
      }, 1200); // Allow rendering to settle
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handlePackageChange = (packageId) => {
    setCurrentPackage(packageId);
  };

  return (
    <div className="app">
      {/* SEO Meta Tags Dynamic Configuration */}
      <Helmet>
        <title>Pucará 365 — Turismo Cultural, Arqueología y Toritos en Puno, Perú</title>
        <meta name="description" content="Descubre la cuna de la cultura Pucará y los artesanos alfareros del Torito de Pucará. Visita el Complejo Arqueológico Kalasaya, el Museo Lítico y rutas del altiplano." />
        <meta property="og:title" content="Pucará 365 — Destino Turístico Ancestral en Puno" />
        <meta property="og:description" content="Recorridos virtuales, mapas interactivos 3D, mapa del tesoro cultural y paquetes turísticos." />
        <meta property="og:image" content="https://upload.wikimedia.org/wikipedia/commons/4/47/Pucara_kirche.jpg" />
        <meta name="geo.region" content="PE-PUN" />
        <meta name="geo.placename" content="Pucará, Lampa, Puno, Perú" />
        <link rel="canonical" href="https://pucara365.com" />
      </Helmet>

      {/* Global Toast Notification System */}
      <Toaster position="bottom-right" richColors />

      {/* Glowing Ambient Blobs for Premium Depth */}
      <div className="bg-blobs-container">
        <div className="bg-blob bg-blob-gold"></div>
        <div className="bg-blob bg-blob-coral"></div>
        <div className="bg-blob bg-blob-blue"></div>
      </div>

      <Header />
      <Hero />
      <main>
        {/* 1. DESCUBRE & EXPLORA */}
        <PucaraDestinations />
        <PucaraGallery />
        <PucaraWalkingTour />
        <PucaraMap initialPointIdx={initialMapPoint} />
        
        {/* 2. PAQUETES TURÍSTICOS OFICIALES (1 Full Day, 2D/1N, Paquete Místico) */}
        <PucaraPackages />

        {/* 3. PLANIFICA TU ESTADÍA & PERSONALIZADOR */}
        <Overview onSelectPackage={handlePackageChange} />
        <Inclusions />
        <Itinerary selectedPackage={currentPackage} onPackageChange={handlePackageChange} />
        
        {/* 4. CINE, VIDEOS LOCALES HD & REELS (9:16) & TOUR 360° */}
        <PucaraVirtualTour />
        <PucaraFestivals />
        
        {/* 5. EXPERIENCIA INTERACTIVA 3D & IA */}
        <PucaraPlanner initialToritoColor={initialToritoColor} unlockedSkins={unlockedSkins} />

        {/* 5.5. ORÁCULO DE LOS APUS POR IA LOCAL */}
        <PucaraOracleNN onUnlockColor={unlockSkin} />
        
        {/* 6. GESTIÓN DTI: Hoja de Ruta y Smart Dashboard IoT */}
        <Roadmap5Years />
        <SmartDestinationDashboard />
        <Recommendations />

        {/* 6.5. CENTRO DE GENERACIÓN QR (ADMIN / PROMO) */}
        <PucaraQRGenerator />
      </main>
      <Footer />

      {/* Floating features */}
      <AccessibilityMenu />
      <AIChatBot initialQuery={initialChatbotQuery} />
    </div>
  );
}

export default App;
