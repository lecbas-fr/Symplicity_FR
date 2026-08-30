import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import SEO from '../components/SEO';
import RichText from '../components/RichText';
import { privacyPage } from '../data/siteContent';
import './About.css';

const PrivacyPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEO
        title="Politique de confidentialité | Symplicity"
        description="Politique de confidentialité du site symplicity.fr : traitement des informations transmises et gestion des cookies."
        url="https://www.symplicity.fr/politique-de-confidentialite"
      />
      <div className="service-page" data-testid="privacy-page">
        <ParticleBackground />

        <section className="page-hero">
          <div className="container">
            <h1 className="page-title fade-in-up">{privacyPage.title}</h1>
            <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>{privacyPage.subtitle}</p>
          </div>
        </section>

        <section className="section">
          <div className="container container-narrow">
            <div className="panel fade-in-up">
              <RichText blocks={privacyPage.blocks} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
