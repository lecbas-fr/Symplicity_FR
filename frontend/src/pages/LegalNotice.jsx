import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import SEO from '../components/SEO';
import RichText from '../components/RichText';
import { legalNoticePage } from '../data/siteContent';
import './About.css';

const LegalNotice = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEO
        title="Mentions légales | Symplicity"
        description="Mentions légales du site symplicity.fr : éditeur, hébergement, contenu du site et marques déposées."
        url="https://www.symplicity.fr/mentions-legales"
      />
      <div className="service-page" data-testid="legal-notice-page">
        <ParticleBackground />

        <section className="page-hero">
          <div className="container">
            <h1 className="page-title fade-in-up">{legalNoticePage.title}</h1>
            <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>{legalNoticePage.subtitle}</p>
          </div>
        </section>

        <section className="section">
          <div className="container container-narrow">
            <div className="panel fade-in-up">
              <RichText blocks={legalNoticePage.blocks} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LegalNotice;
