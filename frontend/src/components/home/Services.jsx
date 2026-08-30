import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Server, ArrowRight } from 'lucide-react';
import { services } from '../../data/mockData';
import './Services.css';

const Services = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Shield':
        return <Shield size={48} />;
      case 'Lock':
        return <Lock size={48} />;
      case 'Server':
        return <Server size={48} />;
      default:
        return <Shield size={48} />;
    }
  };

  return (
    <section className="services-section section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title fade-in-up">Notre expertise</h2>
          <p className="section-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
            Notre métier ? Vous accompagner sur les sujets suivants :
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="service-card glass fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="service-icon">
                {getIcon(service.icon)}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <Link to={service.link} className="service-link">
                Découvrir <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;