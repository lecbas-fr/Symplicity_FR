import React from 'react';
import { certifications } from '../../data/mockData';
import './Certifications.css';

const Certifications = () => {
  return (
    <section className="certifications-section">
      <div className="container">
        <h6 className="certifications-label">- NOS CERTIFICATIONS -</h6>
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div 
              key={cert.id} 
              className="certification-card glass fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img src={cert.url} alt={cert.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;