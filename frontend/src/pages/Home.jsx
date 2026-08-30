import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import ClientsCarousel from '../components/home/ClientsCarousel';
import About from '../components/home/About';
import Certifications from '../components/home/Certifications';
import Stats from '../components/home/Stats';
import Services from '../components/home/Services';
import TargetAudience from '../components/home/TargetAudience';
import Testimonials from '../components/home/Testimonials';
import SEO from '../components/SEO';
import './Home.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        page="home"
        breadcrumb={[{ name: 'Accueil', path: '/' }]}
      />
      <div className="home-page" data-testid="home-page">
        <Hero />
        <ClientsCarousel />
        <About />
        <Certifications />
        <Stats />
        <Services />
        <TargetAudience />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
