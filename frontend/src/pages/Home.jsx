import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Hero from '../components/home/Hero';
import ClientsCarousel from '../components/home/ClientsCarousel';
import About from '../components/home/About';
import Certifications from '../components/home/Certifications';
import Stats from '../components/home/Stats';
import Services from '../components/home/Services';
import TargetAudience from '../components/home/TargetAudience';
import Testimonials from '../components/home/Testimonials';
import ArticlesPreview from '../components/home/ArticlesPreview';
import SEO from '../components/SEO';
import './Home.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Symplicity | infogérance en Essonne et Ile de France"
        description="Symplicity | Infogérance - RGPD - Cybersécurité | Essonne - Paris - Seine et Marne. Services informatiques sur-mesure, créateurs de valeur pour votre entreprise depuis 2007."
        keywords="infogérance Essonne, RGPD Paris, cybersécurité Ile de France, services informatiques TPE PME, DPO, protection données, infogérance Seine et Marne"
        url="https://www.symplicity.fr"
      />
      <div className="home-page" data-testid="home-page">
        <ParticleBackground />
        <Hero />
        <ClientsCarousel />
        <About />
        <Certifications />
        <Stats />
        <Services />
        <TargetAudience />
        <Testimonials />
        <ArticlesPreview />
      </div>
    </>
  );
};

export default Home;
