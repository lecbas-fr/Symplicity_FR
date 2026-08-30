import React, { useEffect } from 'react';
import { Zap, Building2, HeartHandshake } from 'lucide-react';
import SEO from '../components/SEO';
import RichText from '../components/RichText';
import CtaSection from '../components/CtaSection';
import { commitmentsPage } from '../data/siteContent';
import './About.css';

const icons = { Zap, Building2, HeartHandshake };

const Commitments = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEO
        page="nos-engagements"
        breadcrumb={[{ name: 'Accueil', path: '/' }, { name: 'Nos engagements', path: '/nos-engagements' }]}
      />
      <div className="service-page" data-testid="commitments-page">

        <section className="page-hero">
          <div className="container">
            <h1 className="page-title fade-in-up">{commitmentsPage.title}</h1>
            <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>{commitmentsPage.subtitle}</p>
          </div>
        </section>

        {commitmentsPage.sections.map((section, index) => {
          const Icon = icons[section.icon];
          return (
            <section key={section.title} className={`section ${index % 2 === 1 ? 'section-alt' : ''}`}>
              <div className="container">
                <div className="commitment-block fade-in-up">
                  <div className="commitment-aside">
                    <div className="commitment-icon"><Icon size={28} /></div>
                    <span className="commitment-index">0{index + 1}</span>
                  </div>
                  <div className="commitment-body">
                    <h2 className="commitment-title">{section.title}</h2>
                    <RichText blocks={section.blocks} />
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <CtaSection title={commitmentsPage.ctaTitle} text={commitmentsPage.ctaText} testId="commitments-cta" />
      </div>
    </>
  );
};

export default Commitments;
