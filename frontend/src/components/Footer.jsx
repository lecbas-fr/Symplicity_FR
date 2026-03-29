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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <img 
                src="https://customer-assets.emergentagent.com/job_symplicity-preview/artifacts/38ekfx2a_Symbole_SWS_d%C3%A9grad%C3%A9.png" 
                alt="Symplicity Symbol" 
                className="footer-logo-symbol"
                style={{ height: '45px', width: 'auto' }}
              />
              <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#7ed957', fontFamily: 'Poppins, sans-serif', letterSpacing: '1px' }}>symplicity</span>
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