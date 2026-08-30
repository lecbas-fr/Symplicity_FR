import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { aboutContent } from '../../data/mockData';
import './About.css';

const About = () => {
  return (
    <section className="about-section section">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <h2 className="section-title fade-in-up">{aboutContent.title}</h2>
            <div className="about-text fade-in-up" style={{ animationDelay: '0.1s' }}>
              {aboutContent.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="about-certification fade-in-up" style={{ animationDelay: '0.2s' }}>
              <img src={aboutContent.certificationLogo} alt="Cybermalveillance" />
            </div>
            <Link to="/qui-sommes-nous" className="btn-secondary fade-in-up" style={{ animationDelay: '0.3s' }}>
              En savoir plus <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
          
          <div className="about-image-wrapper fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="about-image glass">
              <img src={aboutContent.image} alt="Équipe Symplicity" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;