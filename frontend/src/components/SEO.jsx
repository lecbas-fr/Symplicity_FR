import React from 'react';
import { Helmet } from 'react-helmet-async';
import seo from '../data/seo.json';

const { origin, ogImage: defaultImage, locale, name: siteName } = seo.site;

const SEO = ({
  page,
  title,
  description,
  keywords,
  ogImage,
  url,
  type = 'website',
  publishedTime,
  breadcrumb,
  jsonLd
}) => {
  const meta = page ? seo.pages[page] : null;

  const finalTitle = title || meta?.title || seo.pages.home.title;
  const finalDescription = description || meta?.description || seo.pages.home.description;
  const finalKeywords = keywords || meta?.keywords || seo.pages.home.keywords;
  const finalImage = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${origin}${ogImage}`)
    : defaultImage;
  const finalUrl = url || (meta ? `${origin}${meta.path === '/' ? '' : meta.path}` : origin);

  const breadcrumbLd = breadcrumb?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${origin}${item.path}`
        }))
      }
    : null;

  return (
    <Helmet>
      <title>{finalTitle}</title>

      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={siteName} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteName} — infogérance, RGPD et cybersécurité`} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={siteName} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      <link rel="canonical" href={finalUrl} />

      {breadcrumbLd && <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default SEO;
