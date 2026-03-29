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
          <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="https://customer-assets.emergentagent.com/job_symplicity-preview/artifacts/38ekfx2a_Symbole_SWS_d%C3%A9grad%C3%A9.png" 
              alt="Symplicity Symbol" 
              className="logo-symbol"
              style={{ height: '45px', width: 'auto' }}
            />
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#7ed957', fontFamily: 'Poppins, sans-serif', letterSpacing: '1px' }}>Symplicity</span>
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