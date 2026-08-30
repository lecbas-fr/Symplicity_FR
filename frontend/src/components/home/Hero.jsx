import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { companyInfo, partnerLogos } from '../../data/mockData';
import './Hero.css';

const Hero = () => (
  <section className="hero" data-testid="hero-section">
    <div className="hero-bg" style={{ backgroundImage: "url('/assets/photos/photo_bleu_2.jpg')" }} aria-hidden="true" />
    <div className="hero-content">
      <div className="container hero-inner">
        <span className="eyebrow" data-testid="hero-eyebrow">Partenaire de votre IT depuis 2007</span>

        <h1 className="hero-title" data-testid="hero-title">
          Services informatiques <em>sur-mesure</em>, créateurs de valeur pour votre entreprise
        </h1>

        <p className="hero-description" data-testid="hero-description">
          {companyInfo.description}
        </p>

        <div className="hero-actions">
          <Link to="/contact" className="btn-primary" data-testid="hero-contact-button">
            NOUS CONTACTER
          </Link>
          <Link to="/infogerance" className="hero-link" data-testid="hero-expertise-link">
            Découvrir nos expertises <ArrowRight size={18} />
          </Link>
        </div>

        <div className="hero-heritage" data-testid="hero-heritage">
          <span className="hero-heritage-label">Née de la réunion de</span>
          <div className="hero-heritage-logos">
            <img src={partnerLogos[0].url} alt={partnerLogos[0].name} />
            <span className="partner-separator">×</span>
            <img src={partnerLogos[1].url} alt={partnerLogos[1].name} />
          </div>
        </div>
      </div>
    </div>

    <div className="hero-scroll-indicator" aria-hidden="true">
      <ArrowDown size={20} className="scroll-arrow" />
    </div>
  </section>
);

export default Hero;
