import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'sonner';
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
import './index.css';

function App() {
  const [currentPackage, setCurrentPackage] = useState('standard');

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
        <meta property="og:description" content="Recorridos virtuales, mapas interactivos 3D, mapa del tesoro cultural, paquetes turísticos y rituales místicos." />
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
        <PucaraMap />
        
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
        <PucaraPlanner />
        
        {/* 6. GESTIÓN DTI: Hoja de Ruta y Smart Dashboard IoT */}
        <Roadmap5Years />
        <SmartDestinationDashboard />
        <Recommendations />
      </main>
      <Footer />

      {/* Floating features */}
      <AccessibilityMenu />
      <AIChatBot />
    </div>
  );
}

export default App;
