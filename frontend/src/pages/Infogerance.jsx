import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Server, CheckCircle, HardDrive, Cloud, Headphones, Wrench, ArrowRight } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import SEO from '../components/SEO';
import './About.css';

const Infogerance = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    { icon: <CheckCircle size={24} />, text: 'Réduction des coûts IT' },
    { icon: <CheckCircle size={24} />, text: 'Expertise technique disponible' },
    { icon: <CheckCircle size={24} />, text: 'Disponibilité et réactivité 24/7' },
    { icon: <CheckCircle size={24} />, text: 'Focus sur votre cœur de métier' },
    { icon: <CheckCircle size={24} />, text: 'Technologies à jour' },
    { icon: <CheckCircle size={24} />, text: 'Accompagnement personnalisé' }
  ];

  const services = [
    {
      icon: <HardDrive size={32} />,
      title: 'Administration de Parc',
      description: 'Gestion complète de votre parc informatique et de vos équipements'
    },
    {
      icon: <Cloud size={32} />,
      title: 'Solutions Cloud',
      description: 'Migration et gestion de vos infrastructures vers le cloud'
    },
    {
      icon: <Wrench size={32} />,
      title: 'Maintenance IT',
      description: 'Maintenance préventive et corrective de vos systèmes informatiques'
    },
    {
      icon: <Headphones size={32} />,
      title: 'Support Utilisateurs',
      description: 'Assistance technique pour vos collaborateurs au quotidien'
    }
  ];

  return (
    <>
      <SEO 
        title="Infogérance | Symplicity - Gestion IT Externalisée Essonne"
        description="Infogérance informatique Essonne, Paris, Seine-et-Marne. Administration parc IT, support 24/7, solutions cloud pour TPE/PME par Symplicity."
        keywords="infogérance Essonne, gestion parc informatique, maintenance IT, support technique, infogérance TPE PME Paris, solutions cloud Essonne"
        url="https://www.symplicity.fr/infogerance"
      />
      <div className="service-page">
        <ParticleBackground />
      
      <section className="page-hero">
        <div className="container">
          <div className="hero-icon-badge fade-in-up">
            <Server size={48} />
          </div>
          <h1 className="page-title fade-in-up" style={{ animationDelay: '0.1s' }}>Infogérance</h1>
          <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>
            Externalisez votre DSI en toute quiétude. Quel que soit votre enjeu IT, nos experts vous accompagnent
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-intro glass fade-in-up">
            <h2>Votre DSI Externalisée</h2>
            <p>
              L'infogérance vous permet de vous concentrer sur votre activité principale en déléguant la gestion de votre infrastructure informatique à des experts. Administration de parc, maintenance IT, choix de logiciels, achat de matériel, solutions Cloud... nous prenons en charge l'ensemble de vos besoins informatiques pour que vous puissiez vous concentrer sur votre cœur de métier.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'rgba(0, 255, 136, 0.02)' }}>
        <div className="container">
          <h2 className="section-title text-center fade-in-up">Nos Services d'Infogérance</h2>
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
          <h2 className="section-title text-center fade-in-up">Les Avantages de l'Infogérance</h2>
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
          <h2 className="section-title fade-in-up">Externalisez Votre DSI</h2>
          <p className="section-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
            Découvrez comment nous pouvons optimiser votre infrastructure IT
          </p>
          <Link to="/contact" className="btn-primary fade-in-up" style={{ animationDelay: '0.2s' }}>
            Demander un Devis <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </section>
      </div>
    </>
  );
};

export default Infogerance;