import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { companyInfo, partnerLogos } from '../../data/mockData';
import './Hero.css';

const Hero = () => (
  <section className="hero" data-testid="hero-section">
    <div className="container hero-inner">
      <div className="hero-text">
        <span className="eyebrow" data-testid="hero-eyebrow">Partenaire de votre IT depuis 2007</span>

        <h1 className="hero-title" data-testid="hero-title">
          Services informatiques sur-mesure, créateurs de valeur pour votre entreprise
        </h1>

        <p className="hero-description" data-testid="hero-description">
          {companyInfo.description}
        </p>

        <div className="hero-actions">
          <Link to="/contact" className="btn-primary" data-testid="hero-contact-button">
            Nous contacter
          </Link>
          <Link to="/infogerance" className="link-arrow" data-testid="hero-expertise-link">
            Découvrir nos expertises <ArrowRight size={16} />
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

      <div className="hero-media">
        <img src="/assets/photos/photo_bleu_2.jpg" alt="Les équipes Symplicity au travail" />
      </div>
    </div>
  </section>
);

export default Hero;
