import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import './About.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="service-page">
      <ParticleBackground />
      
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title fade-in-up">Politique de Confidentialité</h1>
          <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
            Protection de vos données personnelles
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-intro glass fade-in-up">
            <h2>Informations transmises par un utilisateur</h2>
            <p>
              Toute information transmise par un utilisateur à la société SYMPLICITY via ce site sera considérée comme non confidentielle. La société SYMPLICITY pourra l'utiliser, l'archiver, la commercialiser notamment pour le développement de ses offres commerciales. Conformément aux articles 39 et suivants de la loi n° 78-17 du 6 janvier 1978 modifiée en 2004 relative à l'informatique, aux fichiers et aux libertés, toute personne peut obtenir communication et, le cas échéant, rectification ou suppression des informations la concernant.
            </p>
            <p style={{ marginTop: '20px' }}>
              Ce droit peut s'exercer en contactant : <a href="mailto:contact@symplicity.fr" style={{ color: '#7ed957', textDecoration: 'underline' }}>contact@symplicity.fr</a>
            </p>
          </div>

          <div className="service-intro glass fade-in-up" style={{ animationDelay: '0.1s', marginTop: '40px' }}>
            <h2>Cookies</h2>
            <p>
              La société SYMPLICITY se réserve le droit d'installer des Cookies lorsque vous visitez le site. L'utilisateur reconnait être informé de cette possibilité. La plupart des navigateurs vous donnent la possibilité d'accepter ou de refuser les Cookies, ou d'être prévenu en cas de Cookies pour les accepter ou les refuser au cas par cas. De même, les Cookies peuvent être supprimés de votre terminal à tout moment.
            </p>
          </div>

          <div className="service-intro glass fade-in-up" style={{ animationDelay: '0.2s', marginTop: '40px' }}>
            <h2>Protection des données (RGPD)</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données ou encore de limitation du traitement.
            </p>
            <p style={{ marginTop: '20px' }}>
              Pour exercer ces droits, contactez-nous :
            </p>
            <ul style={{ marginTop: '15px', paddingLeft: '20px', color: 'rgba(255, 255, 255, 0.8)' }}>
              <li>Email : <a href="mailto:contact@symplicity.fr" style={{ color: '#7ed957' }}>contact@symplicity.fr</a></li>
              <li>Adresse : 38 rue des Processions, 91240 Saint-Michel-Sur-Orge, FRANCE</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;