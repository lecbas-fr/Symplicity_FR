import React, { useEffect } from 'react';
import { Leaf, Users, Zap, Recycle } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { commitmentsContent } from '../data/mockData';
import './About.css';

const Commitments = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const commitments = [
    {
      icon: <Users size={40} />,
      title: 'Bien-être des Salariés',
      description: 'Nous veillons à l\'\u00e9panouissement professionnel de nos équipes et fournissons le meilleur matériel ergonomique.'
    },
    {
      icon: <Zap size={40} />,
      title: 'Optimisation Énergétique',
      description: 'Réduction de notre consommation énergétique et de notre empreinte carbone.'
    },
    {
      icon: <Recycle size={40} />,
      title: 'Recyclage Numérique',
      description: 'Tri et recyclage actifs de nos déchets numériques pour minimiser notre impact environnemental.'
    },
    {
      icon: <Leaf size={40} />,
      title: 'Responsabilité Environnementale',
      description: 'Conscience de l\'impact de l\'informatique sur l\'environnement et actions concrètes à notre échelle.'
    }
  ];

  return (
    <div className="service-page">
      <ParticleBackground />
      
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title fade-in-up">Nos Engagements</h1>
          <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
            Responsabilité Sociétale et Environnementale au cœur de notre activité
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-intro glass fade-in-up">
            <h2>{commitmentsContent.title}</h2>
            {commitmentsContent.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'rgba(0, 255, 136, 0.02)' }}>
        <div className="container">
          <h2 className="section-title text-center fade-in-up">Nos 4 Piliers d'Engagement</h2>
          <div className="highlights-grid" style={{ marginTop: '60px' }}>
            {commitments.map((commitment, index) => (
              <div key={index} className="highlight-card glass fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="highlight-icon">{commitment.icon}</div>
                <h3 className="highlight-title">{commitment.title}</h3>
                <p className="highlight-description">{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="commitment-quote glass fade-in-up" style={{ padding: '60px 50px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.3rem', lineHeight: '1.9', color: 'rgba(255, 255, 255, 0.9)', fontStyle: 'italic' }}>
              "Nous sommes convaincus que la technologie doit être au service de l'humain et de l'environnement. Chaque jour, nous travaillons pour minimiser notre impact écologique tout en maximisant le bien-être de nos équipes et de nos clients."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Commitments;