import React, { useEffect } from 'react';
import { Server, Clock, TrendingUp, ShieldCheck, Wallet, Users, Leaf } from 'lucide-react';
import SEO from '../components/SEO';
import RichText from '../components/RichText';
import CtaSection from '../components/CtaSection';
import { infogeranceContent } from '../data/siteContent';
import './About.css';

const icons = { Clock, TrendingUp, Server, ShieldCheck, Wallet, Users, Leaf };

const Infogerance = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEO
        page="infogerance"
        breadcrumb={[{ name: 'Accueil', path: '/' }, { name: 'Infogérance', path: '/infogerance' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Infogérance et DSI externalisée',
          serviceType: 'Infogérance informatique',
          provider: { '@type': 'LocalBusiness', name: 'Symplicity', url: 'https://www.symplicity.fr' },
          areaServed: ['Essonne', 'Seine-et-Marne', 'Paris', 'Île-de-France'],
          description: 'Gestion et maintenance du parc informatique, support utilisateurs et solutions Cloud en Île-de-France.'
        }}
      />
      <div className="service-page" data-testid="infogerance-page">

        <section className="page-hero">
          <div className="container">
            <div className="hero-icon-badge fade-in-up">
              <Server size={44} />
            </div>
            <h1 className="page-title fade-in-up" style={{ animationDelay: '0.1s' }}>{infogeranceContent.title}</h1>
            <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>{infogeranceContent.subtitle}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="intro-split">
              <div className="panel fade-in-up">
                <RichText blocks={infogeranceContent.intro} />
              </div>
              <div className="intro-visual fade-in-up" style={{ animationDelay: '0.15s' }}>
                <img src="/assets/photos/photo3.jpg" alt="Externalisez votre DSI avec Symplicity" />
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <span className="eyebrow">Pourquoi externaliser votre DSI ?</span>
            <h2 className="section-title">Les avantages sont nombreux</h2>
            <div className="advantages-list">
              {infogeranceContent.advantages.map((item, index) => {
                const Icon = icons[item.icon];
                return (
                  <article key={item.title} className="advantage-row fade-in-up" style={{ animationDelay: `${index * 0.06}s` }}>
                    <span className="advantage-index">{String(index + 1).padStart(2, '0')}</span>
                    <div className="advantage-icon"><Icon size={24} /></div>
                    <div className="advantage-body">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <CtaSection title={infogeranceContent.ctaTitle} text={infogeranceContent.ctaText} testId="infogerance-cta" />
      </div>
    </>
  );
};

export default Infogerance;
