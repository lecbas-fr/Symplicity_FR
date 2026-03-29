import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Turnstile from 'react-turnstile';
import ParticleBackground from '../components/ParticleBackground';
import SEO from '../components/SEO';
import { companyInfo } from '../data/mockData';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';
import './Contact.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const TURNSTILE_SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_KEY;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTurnstileVerify = (token) => {
    setTurnstileToken(token);
  };

  const handleTurnstileError = () => {
    setTurnstileToken(null);
    toast({
      title: 'Erreur CAPTCHA',
      description: 'La vérification CAPTCHA a échoué. Veuillez réessayer.',
      variant: 'destructive'
    });
  };

  const handleTurnstileExpire = () => {
    setTurnstileToken(null);
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
        turnstileToken: turnstileToken
      });
      
      if (response.status === 200) {
        toast({
          title: 'Message envoyé !',
          description: 'Nous vous recontacterons dans les plus brefs délais.',
        });
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
        
        // Réinitialiser Turnstile
        setTurnstileToken(null);
        if (turnstileRef.current) {
          turnstileRef.current.reset();
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
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
        title="Contact | Symplicity - Expert Infogérance Essonne"
        description="Contactez Symplicity pour vos besoins en infogérance, RGPD, cybersécurité en Essonne, Paris et Seine-et-Marne. Experts à votre écoute."
        keywords="contact Symplicity, infogérance Essonne, audit cybersécurité, DPO Essonne, RGPD conseil, contact expert IT"
        url="https://www.symplicity.fr/contact"
      />
      <div className="contact-page">
        <ParticleBackground />
      
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title fade-in-up">Contactez-Nous</h1>
          <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
            Notre équipe est à votre écoute pour répondre à vos questions
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info fade-in-up">
              <h2>Nos Coordonnées</h2>
              <p className="contact-intro">
                N'hésitez pas à nous contacter pour toute question concernant nos services d'infogérance, RGPD ou cybersécurité.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3>Adresse</h3>
                    <p>{companyInfo.address}</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3>Téléphone</h3>
                    <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
                  </div>
                </div>
              </div>

              <div className="contact-hours glass">
                <h3>Horaires d'ouverture</h3>
                <p>Lundi - Vendredi : 9h00 - 18h00</p>
                <p>Samedi : 8h00 - 12h00</p>
                <p>Dimanche : Fermé</p>
              </div>
            </div>

            <div className="contact-form-wrapper fade-in-up" style={{ animationDelay: '0.2s' }}>
              <form onSubmit={handleSubmit} className="contact-form glass">
                <h2>Envoyez-nous un message</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nom complet *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01 XX XX XX XX"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Entreprise</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Sujet *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="infogerance">Infogérance</option>
                    <option value="rgpd">RGPD & Conformité</option>
                    <option value="cybersecurite">Cybersécurité</option>
                    <option value="audit">Audit IT</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Décrivez votre besoin..."
                  ></textarea>
                </div>

                {TURNSTILE_SITE_KEY && TURNSTILE_SITE_KEY !== 'votre-turnstile-site-key' && (
                  <div className="turnstile-container" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                    <Turnstile
                      ref={turnstileRef}
                      sitekey={TURNSTILE_SITE_KEY}
                      onVerify={handleTurnstileVerify}
                      onError={handleTurnstileError}
                      onExpire={handleTurnstileExpire}
                      theme="light"
                      size="normal"
                    />
                  </div>
                )}

                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Envoi en cours...' : (
                    <>
                      Envoyer <Send size={18} style={{ marginLeft: '8px' }} />
                    </>
                  )}
                </button>
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