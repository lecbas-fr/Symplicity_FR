import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import RGPD from './pages/RGPD';
import Cybersecurity from './pages/Cybersecurity';
import Infogerance from './pages/Infogerance';
import Contact from './pages/Contact';
import Commitments from './pages/Commitments';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LegalNotice from './pages/LegalNotice';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qui-sommes-nous" element={<About />} />
          <Route path="/rgpd" element={<RGPD />} />
          <Route path="/cybersecurite" element={<Cybersecurity />} />
          <Route path="/infogerance" element={<Infogerance />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/nos-engagements" element={<Commitments />} />
          <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
          <Route path="/mentions-legales" element={<LegalNotice />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;