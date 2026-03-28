import React from 'react';
import { stats } from '../../data/mockData';
import './Stats.css';

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <h6 className="stats-label">- NOS CHIFFRES -</h6>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card glass fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              {stat.sublabel && <div className="stat-sublabel">{stat.sublabel}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;