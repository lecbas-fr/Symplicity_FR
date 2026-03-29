import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, Twitter, Facebook } from 'lucide-react';
import { navigationLinks, socialLinks } from '../data/mockData';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case 'Linkedin':
        return <Linkedin size={18} />;
      case 'Twitter':
        return <Twitter size={18} />;
      case 'Facebook':
        return <Facebook size={18} />;
      default:
        return null;
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-top">
        <div className="container">
          <div className="social-links">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={social.name}
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 25 Q35 20, 40 25 L50 35 Q55 40, 60 35 L70 25" stroke="url(#grad1)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M30 45 Q35 40, 40 45 L50 55 Q55 60, 60 55 L70 45" stroke="url(#grad2)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M30 65 Q35 60, 40 65 L50 75 Q55 80, 60 75 L70 65" stroke="url(#grad3)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#7ed957', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#4dd0e1', stopOpacity: 1}} />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#7ed957', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#4dd0e1', stopOpacity: 1}} />
                  </linearGradient>
                  <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#7ed957', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#4dd0e1', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="logo-text">SYMPLICITY</span>
          </Link>

          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a href="#contact" className="btn-help">HELP</a>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;