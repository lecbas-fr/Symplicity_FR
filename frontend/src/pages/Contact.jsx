import React, { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Send } from 'lucide-react';
import Turnstile from 'react-turnstile';
import SEO from '../components/SEO';
import { companyInfo } from '../data/mockData';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';
import './Contact.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY;

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  position: '',
  message: ''
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!turnstileToken) {
      toast({
        title: 'Vérification requise',
        description: 'Veuillez compléter la vérification CAPTCHA.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, {
        ...formData,
        turnstileToken
      });

      if (response.status === 200) {
        toast({
          title: 'Merci pour votre envoi !',
          description: 'Nous vous recontacterons dans les plus brefs délais.'
        });
        setFormData(emptyForm);
        setTurnstileToken(null);
        if (turnstileRef.current) turnstileRef.current.reset();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Une erreur est survenue. Veuillez réessayer plus tard.';
      toast({
        title: 'Erreur',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact | Symplicity - Expert infogérance en Essonne"
        description="Contactez Symplicity pour vos besoins en infogérance, RGPD et cybersécurité en Essonne, Paris et Seine-et-Marne. Nos experts vous répondent rapidement."
        keywords="contact Symplicity, infogérance Essonne, audit cybersécurité, DPO Essonne, RGPD conseil, contact expert IT"
        url="https://www.symplicity.fr/contact"
      />
      <div className="contact-page" data-testid="contact-page">
        <section className="page-hero">
          <div className="container">
            <h1 className="page-title fade-in-up">Contactez-nous</h1>
            <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
              Notre équipe est à votre écoute pour répondre à vos questions
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info fade-in-up">
                <h2>Nos coordonnées</h2>
                <p className="contact-intro">
                  N'hésitez pas à nous contacter pour toute question concernant nos services
                  d'infogérance, de RGPD ou de cybersécurité.
                </p>

                <div className="contact-details">
                  <div className="contact-detail-item">
                    <div className="contact-icon">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h3>Adresse</h3>
                      <p>{companyInfo.addressLines.join(', ')}</p>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="contact-icon">
                      <Phone size={22} />
                    </div>
                    <div>
                      <h3>Téléphone</h3>
                      <a href={`tel:${companyInfo.phoneHref}`} data-testid="contact-phone-link">
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form-wrapper fade-in-up" style={{ animationDelay: '0.15s' }}>
                <form onSubmit={handleSubmit} className="contact-form" data-testid="contact-form">
                  <h2>Envoyez-nous un message</h2>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">Prénom *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Votre prénom"
                        data-testid="contact-input-firstname"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Nom de famille *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Votre nom"
                        data-testid="contact-input-lastname"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">E-mail *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="vous@societe.fr"
                        data-testid="contact-input-email"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Téléphone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01 XX XX XX XX"
                        data-testid="contact-input-phone"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Société</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nom de votre structure"
                        data-testid="contact-input-company"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="position">Fonction</label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Votre fonction"
                        data-testid="contact-input-position"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Votre message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Décrivez votre besoin..."
                      data-testid="contact-input-message"
                    />
                  </div>

                  {TURNSTILE_SITE_KEY && TURNSTILE_SITE_KEY !== 'votre-turnstile-site-key' && (
                    <div className="turnstile-container">
                      <Turnstile
                        ref={turnstileRef}
                        sitekey={TURNSTILE_SITE_KEY}
                        onVerify={(token) => setTurnstileToken(token)}
                        onError={() => setTurnstileToken(null)}
                        onExpire={() => setTurnstileToken(null)}
                        theme="light"
                        size="normal"
                      />
                    </div>
                  )}

                  <button type="submit" className="btn-primary" disabled={isSubmitting} data-testid="contact-submit">
                    {isSubmitting ? 'Envoi en cours…' : (
                      <>
                        Envoyer <Send size={16} />
                      </>
                    )}
                  </button>

                  <p className="form-note">
                    Les champs marqués d'un astérisque sont obligatoires. Vos données sont
                    utilisées uniquement pour répondre à votre demande.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
