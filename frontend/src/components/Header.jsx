import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, Twitter, Facebook, Phone } from 'lucide-react';
import { navigationLinks, socialLinks, companyInfo } from '../data/mockData';
import Logo from './Logo';
import './Header.css';

const socialIcons = { Linkedin, Twitter, Facebook };

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} data-testid="site-header">
      <div className="header-top">
        <div className="container header-top-inner">
          <a href={`tel:${companyInfo.phoneHref}`} className="header-phone" data-testid="header-phone">
            <Phone size={14} /> {companyInfo.phone}
          </a>
          <div className="social-links">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={social.name}
                  data-testid={`header-social-${social.name.toLowerCase()}`}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="container nav-container">
          <Logo size="md" testId="header-logo" />

          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`nav-link-${link.path === '/' ? 'home' : link.path.slice(1)}`}
              >
                {link.name}
              </Link>
            ))}
            <a href={`tel:${companyInfo.phoneHref}`} className="btn-help" data-testid="nav-help-button">
              HELP
            </a>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
