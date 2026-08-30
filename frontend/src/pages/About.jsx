import React, { useEffect } from 'react';
import { Shield, Users, Award, Target } from 'lucide-react';
import SEO from '../components/SEO';
import RichText from '../components/RichText';
import CtaSection from '../components/CtaSection';
import { aboutPage } from '../data/siteContent';
import { aboutContent } from '../data/mockData';
import './About.css';

const highlights = [
  { icon: <Shield size={28} />, title: 'Expertise certifiée', description: "Labellisés ExpertCyber par l'AFNOR en 2021" },
  { icon: <Users size={28} />, title: '+700 clients', description: 'TPE/PME et collectivités locales nous font confiance' },
  { icon: <Award size={28} />, title: "15 ans d'expérience", description: 'Solutions innovantes et créatrices de valeur' },
  { icon: <Target size={28} />, title: 'Référence Cybermalveillance', description: 'Prestataire référencé Cybermalveillance.gouv.fr' }
];

const About = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEO
        page="qui-sommes-nous"
        breadcrumb={[{ name: 'Accueil', path: '/' }, { name: 'Qui sommes-nous ?', path: '/qui-sommes-nous' }]}
      />
      <div className="about-page" data-testid="about-page">

        <section className="page-hero">
          <div className="container">
            <h1 className="page-title fade-in-up">{aboutPage.title}</h1>
            <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>{aboutPage.subtitle}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content-grid">
              <div className="fade-in-up">
                <RichText blocks={aboutPage.blocks} />
                <div className="certification-badge">
                  <img src={aboutContent.certificationLogo} alt="Prestataire référencé Cybermalveillance.gouv.fr" />
                </div>
              </div>
              <div className="content-image fade-in-up" style={{ animationDelay: '0.15s' }}>
                <img src={aboutContent.image} alt="Les équipes Symplicity au travail" />
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <span className="eyebrow">Nos points forts</span>
            <h2 className="section-title">Ce qui nous distingue</h2>
            <div className="highlights-grid">
              {highlights.map((item, index) => (
                <div key={item.title} className="highlight-card glass fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
                  <div className="highlight-icon">{item.icon}</div>
                  <h3 className="highlight-title">{item.title}</h3>
                  <p className="highlight-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaSection
          title="Prêt à faire de votre informatique un avantage concurrentiel ?"
          text="Nos experts seront heureux d'échanger autour de vos enjeux afin de vous proposer les solutions adaptées."
          testId="about-cta"
        />
      </div>
    </>
  );
};

export default About;
