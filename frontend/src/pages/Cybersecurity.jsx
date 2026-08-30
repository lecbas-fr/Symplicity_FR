import React, { useEffect } from 'react';
import { Lock, ShieldAlert, LifeBuoy } from 'lucide-react';
import SEO from '../components/SEO';
import RichText from '../components/RichText';
import CtaSection from '../components/CtaSection';
import { cyberContent } from '../data/siteContent';
import './About.css';

const Cybersecurity = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEO
        title="Cybersécurité | Symplicity - Expert Cyber labellisé en Essonne"
        description="Audit de sécurité, pentesting, PRA/PCA, sensibilisation et remédiation post-incident. Symplicity est labellisée ExpertCyber par Cybermalveillance.gouv.fr."
        keywords="cybersécurité Essonne, audit sécurité IT, ExpertCyber AFNOR, cybermalveillance, pentest, PRA PCA, sécurité informatique TPE PME"
        url="https://www.symplicity.fr/cybersecurite"
      />
      <div className="service-page" data-testid="cybersecurity-page">

        <section className="page-hero">
          <div className="container">
            <div className="hero-icon-badge fade-in-up">
              <Lock size={44} />
            </div>
            <h1 className="page-title fade-in-up" style={{ animationDelay: '0.1s' }}>{cyberContent.title}</h1>
            <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>{cyberContent.subtitle}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="panel fade-in-up">
              <RichText blocks={cyberContent.intro} />
            </div>

            <div className="figures-grid">
              {cyberContent.keyFigures.map((figure, index) => (
                <div key={figure.value} className="figure-card fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
                  <span className="figure-value">{figure.value}</span>
                  <span className="figure-label">{figure.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <RichText blocks={cyberContent.blocks} className="prose-wide" />
          </div>
        </section>

        <section className="section">
          <div className="container service-lists">
            <div className="panel fade-in-up">
              <h2 className="list-title"><ShieldAlert size={22} /> {cyberContent.preventive.title}</h2>
              <ul className="check-list">
                {cyberContent.preventive.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="panel fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="list-title"><LifeBuoy size={22} /> {cyberContent.curative.title}</h2>
              <p className="list-intro">{cyberContent.curative.intro}</p>
              <ul className="check-list">
                {cyberContent.curative.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <span className="eyebrow">Nos solutions</span>
            <h2 className="section-title">{cyberContent.solutions.title}</h2>
            <p className="section-subtitle">{cyberContent.solutions.intro}</p>
            <div className="solutions-grid">
              {cyberContent.solutions.items.map((item, index) => (
                <div key={item.name} className="solution-card fade-in-up" style={{ animationDelay: `${index * 0.06}s` }}>
                  <span className="solution-name">{item.name}</span>
                  <span className="solution-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="label-block">
              <div className="label-block-text">
                <h2 className="section-title">{cyberContent.label.title}</h2>
                <RichText blocks={cyberContent.label.blocks} />
              </div>
              <div className="label-block-logos">
                <img src="/assets/certifications/logo_expert_cyber.png" alt="Label ExpertCyber" />
                <img src="/assets/certifications/professionnel-reference.jpg" alt="Professionnel référencé Cybermalveillance.gouv.fr" />
              </div>
            </div>
          </div>
        </section>

        <CtaSection title={cyberContent.ctaTitle} text={cyberContent.ctaText} testId="cyber-cta" />
      </div>
    </>
  );
};

export default Cybersecurity;
