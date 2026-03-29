import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { companyInfo, partnerLogos } from '../../data/mockData';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="container">
          <div className="hero-partners">
            {partnerLogos.map((partner, index) => (
              <React.Fragment key={partner.id}>
                <div className="partner-badge">
                  <img src={partner.url} alt={partner.name} />
                </div>
                {index === 0 && <span className="partner-separator">X</span>}
              </React.Fragment>
            ))}
          </div>

          <h1 className="hero-title fade-in-up">
            {companyInfo.tagline}
          </h1>

          <p className="hero-description fade-in-up" style={{ animationDelay: '0.2s' }}>
            {companyInfo.description}
          </p>

          <div className="hero-decorative-line"></div>

          <div className="hero-actions fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/contact" className="btn-primary">
              NOUS CONTACTER
            </Link>
          </div>

          <div className="hero-scroll-indicator fade-in" style={{ animationDelay: '0.6s' }}>
            <ArrowDown size={24} className="scroll-arrow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;