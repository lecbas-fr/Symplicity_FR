import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navigationLinks } from '../data/mockData';
import Logo from './Logo';
import './Header.css';

const HELP_URL = 'https://get.teamviewer.com/6yqvgcy';

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
            <a
              href={HELP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-help"
              data-testid="nav-help-button"
            >
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
