import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CtaSection = ({ title, text, label = 'Nous contacter', to = '/contact', testId = 'cta-section' }) => (
  <section className="section" data-testid={testId}>
    <div className="container">
      <div className="cta-panel">
        <div className="cta-panel-text">
          <h2 className="cta-panel-title">{title}</h2>
          {text && <p className="cta-panel-subtitle">{text}</p>}
        </div>
        <Link to={to} className="btn-primary cta-panel-button" data-testid={`${testId}-button`}>
          {label} <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
        </Link>
      </div>
    </div>
  </section>
);

export default CtaSection;
