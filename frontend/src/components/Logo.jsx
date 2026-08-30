import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

export const Logo = ({ size = 'md', to = '/', testId = 'site-logo' }) => (
  <Link to={to} className={`brand-logo brand-logo-${size}`} data-testid={testId} aria-label="Symplicity - Accueil">
    <img src="/assets/symbol/symbol-gradient.svg" alt="" className="brand-logo-symbol" />
    <span className="brand-logo-text">
      <span className="brand-logo-name">SYMPLICITY</span>
      <span className="brand-logo-baseline">Starware &amp; Network-ing</span>
    </span>
  </Link>
);

export default Logo;
