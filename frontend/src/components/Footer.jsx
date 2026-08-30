import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Phone, MapPin } from 'lucide-react';
import { socialLinks, companyInfo } from '../data/mockData';
import Logo from './Logo';
import './Footer.css';

const socialIcons = { Linkedin, Twitter, Facebook };

const navColumn = [
  { name: 'RGPD', path: '/rgpd' },
  { name: 'Cybersécurité', path: '/cybersecurite' },
  { name: 'Infogérance', path: '/infogerance' },
  { name: 'Contact', path: '/contact' },
  { name: 'Qui sommes-nous ?', path: '/qui-sommes-nous' },
  { name: 'Nos engagements', path: '/nos-engagements' },
  { name: 'Actualités', path: '/actualites' }
];

const legalColumn = [
  { name: 'Mentions légales', path: '/mentions-legales' },
  { name: 'Politique de confidentialité', path: '/politique-de-confidentialite' },
  { name: 'RGPD — vos données', path: '/rgpd-vos-donnees' }
];

const Footer = () => (
  <footer className="footer" data-testid="site-footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-column">
          <Logo size="md" testId="footer-logo" />
          <p className="footer-description">{companyInfo.description}</p>
          <div className="footer-social">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label={social.name}
                  data-testid={`footer-social-${social.name.toLowerCase()}`}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Navigation</h3>
          <ul className="footer-links">
            {navColumn.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="footer-link" data-testid={`footer-link-${link.path.slice(1)}`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Informations légales</h3>
          <ul className="footer-links">
            {legalColumn.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="footer-link" data-testid={`footer-legal-${link.path.slice(1)}`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">Contact</h3>
          <ul className="footer-contact">
            <li>
              <MapPin size={18} />
              <span>
                {companyInfo.addressLines.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
              </span>
            </li>
            <li>
              <Phone size={18} />
              <a href={`tel:${companyInfo.phoneHref}`} data-testid="footer-phone">{companyInfo.phone}</a>
            </li>
          </ul>
          <Link to="/contact" className="btn-primary footer-cta" data-testid="footer-contact-cta">
            Nous contacter
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} Symplicity | Tous droits réservés
        </p>
        <div className="footer-certifications">
          <img src="/assets/certifications/logo_expert_cyber.png" alt="Label ExpertCyber" />
          <img src="/assets/certifications/logo_cnil.png" alt="DPO certifié CNIL" />
          <img src="/assets/certifications/logo_iso_27001.png" alt="ISO 27001" />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
