import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle, Shield, AlertTriangle, Search, UserCheck, ArrowRight } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import SEO from '../components/SEO';
import './About.css';

const Cybersecurity = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    { icon: <CheckCircle size={24} />, text: 'Protection contre les cyberattaques' },
    { icon: <CheckCircle size={24} />, text: 'Sécurisation de vos données sensibles' },
    { icon: <CheckCircle size={24} />, text: 'Continuité de votre activité' },
    { icon: <CheckCircle size={24} />, text: 'Conformité aux normes de sécurité' },
    { icon: <CheckCircle size={24} />, text: 'Réduction des risques cyber' },
    { icon: <CheckCircle size={24} />, text: 'Surveillance et détection 24/7' }
  ];

  const services = [
    {
      icon: <Search size={32} />,
      title: 'Audit de Sécurité',
      description: 'Analyse approfondie de vos infrastructures IT pour identifier les vulnérabilités'
    },
    {
      icon: <Shield size={32} />,
      title: 'Sécurisation',
      description: 'Mise en place de solutions de protection adaptées à votre environnement'
    },
    {
      icon: <AlertTriangle size={32} />,
      title: 'Gestion des Incidents',
      description: 'Réponse rapide et gestion des incidents de sécurité'
    },
    {
      icon: <UserCheck size={32} />,
      title: 'Formation',
      description: 'Sensibilisation de vos équipes aux bonnes pratiques de cybersécurité'
    }
  ];

  return (
    <>
      <SEO 
        title="Cybersécurité | Symplicity - Expert Sécurité IT Essonne"
        description="Protection cybersécurité Essonne, Paris, Seine-et-Marne. Audit sécurité IT, gestion incidents cyber. Experts ExpertCyber labellisés AFNOR."
        keywords="cybersécurité Essonne, audit sécurité IT, ExpertCyber AFNOR, cybermalveillance, protection cyber Paris, sécurité informatique TPE PME"
        url="https://www.symplicity.fr/cybersecurite"
      />
      <div className="service-page">
        <ParticleBackground />
      
      <section className="page-hero">
        <div className="container">
          <div className="hero-icon-badge fade-in-up">
            <Lock size={48} />
          </div>
          <h1 className="page-title fade-in-up" style={{ animationDelay: '0.1s' }}>Cybersécurité</h1>
          <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>
            Faites auditer vos infrastructures IT, repérez les failles, et faites-vous accompagner pour une sécurisation optimale de vos installations
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-intro glass fade-in-up">
            <h2>Protégez Votre Entreprise des Cybermenaces</h2>
            <p>
              Dans un monde numérique en constante évolution, les cybermenaces se multiplient et se sophistiquent. TPE, PME ou collectivités, aucune organisation n'est à l'abri. Nos experts ExpertCyber labellisés AFNOR vous accompagnent pour identifier vos vulnérabilités, mettre en place des protections efficaces et assurer la continuité de votre activité.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'rgba(0, 255, 136, 0.02)' }}>
        <div className="container">
          <h2 className="section-title text-center fade-in-up">Nos Services de Cybersécurité</h2>
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
          <h2 className="section-title text-center fade-in-up">Pourquoi Nous Choisir ?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <span className="benefit-icon">{benefit.icon}</span>
                <span className="benefit-text">{benefit.text}</span>
              </div>
            ))}
          </div>
          <div className="certification-highlight fade-in-up" style={{ marginTop: '60px', animationDelay: '0.3s' }}>
            <p className="text-center" style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              <strong style={{ color: '#00ff88' }}>Prestataire Référence Cybermalveillance.Gouv.fr</strong> - Labellisés ExpertCyber par l'AFNOR en 2021
            </p>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container text-center">
          <h2 className="section-title fade-in-up">Sécurisez Votre Infrastructure IT</h2>
          <p className="section-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
            Contactez nos experts pour un audit de sécurité personnalisé
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

export default Cybersecurity;