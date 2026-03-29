import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, FileText, Users, ArrowRight } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import SEO from '../components/SEO';
import './About.css';

const RGPD = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    { icon: <CheckCircle size={24} />, text: 'Mise en conformité RGPD complète' },
    { icon: <CheckCircle size={24} />, text: 'Accompagnement personnalisé par des experts certifiés' },
    { icon: <CheckCircle size={24} />, text: 'Analyse des risques et recommandations' },
    { icon: <CheckCircle size={24} />, text: 'Formation de vos équipes' },
    { icon: <CheckCircle size={24} />, text: 'Suivi et mise à jour continue' },
    { icon: <CheckCircle size={24} />, text: 'Documentation et registres RGPD' }
  ];

  const services = [
    {
      icon: <FileText size={32} />,
      title: 'Audit RGPD',
      description: 'Évaluation complète de votre conformité actuelle et identification des points d\'amélioration'
    },
    {
      icon: <Users size={32} />,
      title: 'DPO Externalisé',
      description: 'Délégué à la Protection des Données certifié pour votre entreprise'
    },
    {
      icon: <Shield size={32} />,
      title: 'Accompagnement',
      description: 'Mise en place des procédures et outils nécessaires à votre conformité'
    }
  ];

  return (
    <>
      <SEO 
        title="RGPD & Conformité | Symplicity - DPO Externalisé Essonne"
        description="Mise en conformité RGPD en Essonne, Paris, Seine-et-Marne. DPO externalisé certifié, audit RGPD, accompagnement personnalisé par Symplicity."
        keywords="RGPD Essonne, DPO externalisé, conformité RGPD Paris, audit RGPD, protection données, DPO certifié Essonne, mise en conformité"
        url="https://www.symplicity.fr/rgpd"
      />
      <div className="service-page">
        <ParticleBackground />
      
      <section className="page-hero">
        <div className="container">
          <div className="hero-icon-badge fade-in-up">
            <Shield size={48} />
          </div>
          <h1 className="page-title fade-in-up" style={{ animationDelay: '0.1s' }}>RGPD & Conformité</h1>
          <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>
            Confiez votre mise en conformité RGPD à des professionnels certifiés, qui en feront un outil de création de valeur
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-intro glass fade-in-up">
            <h2>Pourquoi la conformité RGPD est essentielle ?</h2>
            <p>
              Le Règlement Général sur la Protection des Données (RGPD) impose des obligations strictes aux entreprises traitant des données personnelles. Au-delà de l'obligation légale, la conformité RGPD est un atout pour votre entreprise : elle renforce la confiance de vos clients, améliore vos processus internes et vous protège contre les sanctions financières.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'rgba(0, 255, 136, 0.02)' }}>
        <div className="container">
          <h2 className="section-title text-center fade-in-up">Nos Services RGPD</h2>
          <div className="highlights-grid">
            {services.map((service, index) => (
              <div key={index} className="highlight-card glass fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="highlight-icon">{service.icon}</div>
                <h3 className="highlight-title">{service.title}</h3>
                <p className="highlight-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title text-center fade-in-up">Les Avantages de Notre Accompagnement</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <span className="benefit-icon">{benefit.icon}</span>
                <span className="benefit-text">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container text-center">
          <h2 className="section-title fade-in-up">Besoin d'aide pour votre conformité RGPD ?</h2>
          <p className="section-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
            Nos experts sont là pour vous accompagner
          </p>
          <Link to="/contact" className="btn-primary fade-in-up" style={{ animationDelay: '0.2s' }}>
            Demander un Audit <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </section>
      </div>
    </>
  );
};

export default RGPD;