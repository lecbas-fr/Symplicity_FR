import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import './About.css';

const LegalNotice = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="service-page">
      <ParticleBackground />
      
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title fade-in-up">Mentions Légales</h1>
          <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
            Informations légales et éditoriales
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-intro glass fade-in-up">
            <h2>Éditeur et responsable de la publication</h2>
            <p>
              La société SYMPLICITY est l'éditeur de ce site.
            </p>
            <ul style={{ marginTop: '20px', paddingLeft: '20px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.9' }}>
              <li><strong>Adresse :</strong> 38 rue des Processions, 91240 Saint-Michel-Sur-Orge, FRANCE</li>
              <li><strong>SIRET :</strong> 49523209200025</li>
              <li><strong>Email :</strong> <a href="mailto:contact@symplicity.fr" style={{ color: '#7ed957' }}>contact@symplicity.fr</a></li>
              <li><strong>Téléphone :</strong> 01 85 450 300</li>
            </ul>
            <p style={{ marginTop: '20px' }}>
              Toutes les informations de ce site sont la propriété exclusive de la société SYMPLICITY.
            </p>
          </div>

          <div className="service-intro glass fade-in-up" style={{ animationDelay: '0.2s', marginTop: '40px' }}>
            <h2>Contenu du site</h2>
            <p>
              Le contenu du site est composé par sa structure générale et les éléments le composant : textes, images, photos, plans et éléments multimédia. Toute représentation totale ou partielle de ce site et de son contenu, par quelque procédé que ce soit, sans autorisation préalable expresse de SYMPLICITY, est interdite et constituerait une contrefaçon sanctionnée par les articles L335-2 et suivants du code de la propriété intellectuelle.
            </p>
          </div>

          <div className="service-intro glass fade-in-up" style={{ animationDelay: '0.3s', marginTop: '40px' }}>
            <h2>Marques déposées</h2>
            <p>
              Toutes les marques déposées et logos de SYMPLICITY figurant sur ce site sont la propriété exclusive de la société SYMPLICITY. Il est interdit de les utiliser, télécharger, reproduire ou diffuser sans autorisation écrite préalable.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalNotice;