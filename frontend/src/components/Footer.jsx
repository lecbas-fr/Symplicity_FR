import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { socialLinks, companyInfo, navigationLinks } from '../data/mockData';
import './Footer.css';

const Footer = () => {
  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case 'Linkedin':
        return <Linkedin size={20} />;
      case 'Twitter':
        return <Twitter size={20} />;
      case 'Facebook':
        return <Facebook size={20} />;
      default:
        return null;
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 25 Q35 20, 40 25 L50 35 Q55 40, 60 35 L70 25" stroke="url(#footerGrad1)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M30 45 Q35 40, 40 45 L50 55 Q55 60, 60 55 L70 45" stroke="url(#footerGrad2)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M30 65 Q35 60, 40 65 L50 75 Q55 80, 60 75 L70 65" stroke="url(#footerGrad3)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <defs>
                    <linearGradient id="footerGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7ed957" stopOpacity="1" />
                      <stop offset="100%" stopColor="#4dd0e1" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="footerGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7ed957" stopOpacity="1" />
                      <stop offset="100%" stopColor="#4dd0e1" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="footerGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7ed957" stopOpacity="1" />
                      <stop offset="100%" stopColor="#4dd0e1" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="logo-text">SYMPLICITY</span>
            </div>
            <p className="footer-description">
              {companyInfo.description}
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label={social.name}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Navigation</h3>
            <ul className="footer-links">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/qui-sommes-nous" className="footer-link">
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <Link to="/nos-engagements" className="footer-link">
                  Nos Engagements
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li>
                <Link to="/rgpd" className="footer-link">
                  RGPD & Conformité
                </Link>
              </li>
              <li>
                <Link to="/cybersecurite" className="footer-link">
                  Cybersécurité
                </Link>
              </li>
              <li>
                <Link to="/infogerance" className="footer-link">
                  Infogérance
                </Link>
              </li>
              <li>
                <a href="#audit" className="footer-link">
                  Audit IT
                </a>
              </li>
              <li>
                <a href="#cloud" className="footer-link">
                  Solutions Cloud
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Contact</h3>
            <ul className="footer-contact">
              <li>
                <MapPin size={18} />
                <span>{companyInfo.address}</span>
              </li>
              <li>
                <Phone size={18} />
                <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} {companyInfo.name}. Tous droits réservés.
          </p>
          <div className="footer-bottom-links">
            <Link to="/politique-de-confidentialite" className="footer-bottom-link">
              Politique de confidentialité
            </Link>
            <Link to="/mentions-legales" className="footer-bottom-link">
              Mentions légales
            </Link>
            <Link to="/politique-de-confidentialite" className="footer-bottom-link">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;