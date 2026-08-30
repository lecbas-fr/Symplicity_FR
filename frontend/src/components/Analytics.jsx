import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = process.env.REACT_APP_GA_ID;

let injected = false;

const injectGtag = () => {
  if (injected || !GA_ID) return;
  injected = true;

  const loader = document.createElement('script');
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(loader);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true, send_page_view: false });
};

/** Google Analytics 4 — actif dès que REACT_APP_GA_ID est renseigné. */
export const Analytics = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!GA_ID) return;
    injectGtag();
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title
    });
  }, [pathname]);

  return null;
};

export default Analytics;
