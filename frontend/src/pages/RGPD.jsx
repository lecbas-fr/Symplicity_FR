import React, { useEffect } from 'react';
import { Shield, FileText, Users, ClipboardList, GraduationCap } from 'lucide-react';
import SEO from '../components/SEO';
import RichText from '../components/RichText';
import CtaSection from '../components/CtaSection';
import { rgpdContent } from '../data/siteContent';
import './About.css';

const icons = { FileText, Users, ClipboardList, GraduationCap };

const RGPD = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEO
        title="RGPD & Conformité | Symplicity - DPO externalisé en Essonne"
        description="Mise en conformité RGPD en Essonne, Paris, Seine-et-Marne. DPO externalisé certifié CNIL, audit de conformité, registres et sensibilisation par Symplicity."
        keywords="RGPD Essonne, DPO externalisé, conformité RGPD Paris, audit RGPD, protection données, DPO certifié CNIL, mise en conformité"
        url="https://www.symplicity.fr/rgpd"
      />
      <div className="service-page" data-testid="rgpd-page">

        <section className="page-hero">
          <div className="container">
            <div className="hero-icon-badge fade-in-up">
              <Shield size={44} />
            </div>
            <h1 className="page-title fade-in-up" style={{ animationDelay: '0.1s' }}>{rgpdContent.title}</h1>
            <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.2s' }}>{rgpdContent.subtitle}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="panel fade-in-up">
              <RichText blocks={rgpdContent.blocks} />
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <span className="eyebrow">Notre accompagnement</span>
            <h2 className="section-title">Un parcours de conformité complet</h2>
            <div className="highlights-grid">
              {rgpdContent.highlights.map((item, index) => {
                const Icon = icons[item.icon];
                return (
                  <div key={item.title} className="highlight-card glass fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
                    <div className="highlight-icon"><Icon size={28} /></div>
                    <h3 className="highlight-title">{item.title}</h3>
                    <p className="highlight-description">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <CtaSection title={rgpdContent.ctaTitle} testId="rgpd-cta" />
      </div>
    </>
  );
};

export default RGPD;
