import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Overview from './components/Overview';
import Inclusions from './components/Inclusions';
import Itinerary from './components/Itinerary';
import Recommendations from './components/Recommendations';
import './index.css';

function App() {
  const [currentPackage, setCurrentPackage] = useState('standard');

  const handlePackageChange = (packageId) => {
    setCurrentPackage(packageId);
  };

  return (
    <div className="app">
      <Header />
      <Hero />
      <main>
        <Overview onSelectPackage={handlePackageChange} />
        <Inclusions />
        <Itinerary selectedPackage={currentPackage} onPackageChange={handlePackageChange} />
        <Recommendations />
      </main>
      <Footer />
      <elevenlabs-convai agent-id="agent_2801keagc3yhes5spngcxw6j14ex"></elevenlabs-convai>
    </div>
  );
}

export default App;
