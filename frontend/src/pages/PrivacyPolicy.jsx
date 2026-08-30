import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import RichText from '../components/RichText';
import { privacyPage } from '../data/siteContent';
import './About.css';

const PrivacyPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEO
        page="politique-de-confidentialite"
        breadcrumb={[{ name: 'Accueil', path: '/' }, { name: 'Politique de confidentialité', path: '/politique-de-confidentialite' }]}
      />
      <div className="service-page" data-testid="privacy-page">

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
