import React from 'react';
import { Check } from 'lucide-react';
import { targetAudience } from '../../data/mockData';
import './TargetAudience.css';

const TargetAudience = () => {
  return (
    <section className="target-audience-section">
      <div className="container">
        <h6 className="target-label">- POUR QUI ? -</h6>
        <div className="target-grid">
          {targetAudience.map((target, index) => (
            <div 
              key={target.id} 
              className="target-item fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Check size={24} className="target-check" />
              <span className="target-title">{target.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;