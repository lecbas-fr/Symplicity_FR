import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import RichText from '../components/RichText';
import CtaSection from '../components/CtaSection';
import { dataRightsPage } from '../data/siteContent';
import './About.css';

const DataRights = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEO
        title="RGPD — vos données | Symplicity"
        description="Exercez vos droits RGPD : consultation, modification ou suppression des données collectées par Symplicity."
        url="https://www.symplicity.fr/rgpd-vos-donnees"
      />
      <div className="service-page" data-testid="data-rights-page">

        <section className="page-hero">
          <div className="container">
            <h1 className="page-title fade-in-up">{dataRightsPage.title}</h1>
            <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>{dataRightsPage.subtitle}</p>
          </div>
        </section>

        <section className="section">
          <div className="container container-narrow">
            <div className="panel fade-in-up">
              <RichText blocks={dataRightsPage.blocks} />
            </div>
          </div>
        </section>

        <CtaSection
          title="Une demande concernant vos données personnelles ?"
          text="Écrivez-nous via le formulaire de contact ou à contact@symplicity.fr"
          label="Nous écrire"
          testId="data-rights-cta"
        />
      </div>
    </>
  );
};

export default DataRights;
