import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Symplicity | infogérance en Essonne et Ile de France",
  description = "Symplicity | Infogérance - RGPD - Cybersécurité | Essonne - Paris - Seine et Marne",
  keywords = "infogérance, RGPD, cybersécurité, Essonne, Paris, Seine et Marne, services informatiques, TPE, PME, DPO, protection données",
  ogImage = "https://www.symplicity.fr/assets/img/og-symplicity.png",
  url = "https://www.symplicity.fr"
}) => {
  return (
    <Helmet>
      {/* Titre de la page */}
      <title>{title}</title>
      
      {/* Meta tags de base */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Symplicity" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
