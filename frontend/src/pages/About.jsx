import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Award, Target } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import SEO from '../components/SEO';
import { aboutContent } from '../data/mockData';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const highlights = [
    { icon: <Shield size={32} />, title: 'Expertise Certifiée', description: 'Labellisés ExpertCyber par l\'AFNOR en 2021' },
    { icon: <Users size={32} />, title: '+700 Clients', description: 'TPE/PME et collectivités locales nous font confiance' },
    { icon: <Award size={32} />, title: '15 Ans d\'Expérience', description: 'Solutions innovantes et créatrices de valeur' },
    { icon: <Target size={32} />, title: 'Référence Cybermalveillance', description: 'Prestataire officiel Cybermalveillance.Gouv.fr' }
  ];

  return (
    <>
      <SEO 
        title="Qui sommes-nous ? | Symplicity - Expert Infogérance et Cybersécurité"
        description="Découvrez Symplicity, expert en infogérance, RGPD et cybersécurité depuis 2007. +700 clients TPE/PME nous font confiance en Essonne, Paris et Seine-et-Marne."
        keywords="qui sommes-nous Symplicity, expert infogérance, cybersécurité Essonne, labellisé ExpertCyber, prestataire Cybermalveillance, DPO Essonne"
        url="https://www.symplicity.fr/qui-sommes-nous"
      />
      <div className="about-page">
        <ParticleBackground />
        
        <section className="page-hero">
          <div className="container">
            <h1 className="page-title fade-in-up">Qui Sommes-Nous ?</h1>
            <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
              Découvrez l'équipe et l'expertise derrière Symplicity
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content-grid">
              <div className="content-text fade-in-up">
                {aboutContent.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} style={{ animationDelay: `${index * 0.1}s` }}>{paragraph}</p>
                ))}
                <div className="certification-badge fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <img src={aboutContent.certificationLogo} alt="Cybermalveillance" />
                </div>
              </div>
              <div className="content-image fade-in-up" style={{ animationDelay: '0.2s' }}>
                <img src={aboutContent.image} alt="Équipe Symplicity" className="glass" />
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'rgba(0, 255, 136, 0.02)' }}>
          <div className="container">
            <h2 className="section-title text-center fade-in-up">Nos Points Forts</h2>
            <div className="highlights-grid">
              {highlights.map((item, index) => (
                <div key={index} className="highlight-card glass fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="highlight-icon">{item.icon}</div>
                  <h3 className="highlight-title">{item.title}</h3>
                  <p className="highlight-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container text-center">
            <h2 className="section-title fade-in-up">Prêt à Travailler Ensemble ?</h2>
            <p className="section-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
              Contactez-nous pour discuter de vos besoins en infrastructure IT
            </p>
            <Link to="/contact" className="btn-primary fade-in-up" style={{ animationDelay: '0.2s' }}>
              Nous Contacter <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;