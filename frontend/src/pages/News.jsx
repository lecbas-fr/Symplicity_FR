import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import VeilleSection from '../components/news/VeilleSection';
import './News.css';

const News = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEO
        page="actualites"
        breadcrumb={[{ name: 'Accueil', path: '/' }, { name: 'Actualités', path: '/actualites' }]}
      />
      <div className="service-page" data-testid="news-page">
        <section className="page-hero">
          <div className="container">
            <h1 className="page-title fade-in-up">Actualités</h1>
            <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
              Alertes de sécurité, actualités RGPD et infogérance : les sources officielles
              CERT-FR et CNIL, les éditeurs et la presse spécialisée, filtrés et résumés par nos experts.
            </p>
          </div>
        </section>

        <VeilleSection />
      </div>
    </>
  );
};

export default News;
