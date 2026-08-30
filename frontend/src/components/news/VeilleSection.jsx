import React, { useEffect, useState } from 'react';
import { AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import './Veille.css';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TABS = [
  { id: 'all', label: 'Tout' },
  { id: 'cyber', label: 'Cybersécurité' },
  { id: 'rgpd', label: 'RGPD' },
  { id: 'it', label: 'Infogérance & IT' }
];

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

const formatUpdated = (value) =>
  value
    ? new Date(value).toLocaleString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
    : '';

export const VeilleSection = () => {
  const [category, setCategory] = useState('all');
  const [data, setData] = useState({ items: [], counts: {}, alert: null, updatedAt: null });
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    fetch(`${API}/veille?category=${category}&limit=20`)
      .then((response) => {
        if (!response.ok) throw new Error('unavailable');
        return response.json();
      })
      .then((payload) => {
        if (cancelled) return;
        setData(payload);
        setStatus(payload.items.length ? 'ready' : 'empty');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [category, attempt]);

  return (
    <section className="section section-alt veille-section" data-testid="veille-section">
      <div className="container">
        <div className="veille-header">
          <div>
            <span className="eyebrow">Veille</span>
            <h2 className="section-title">Ce qu'il faut retenir aujourd'hui</h2>
          </div>
          {data.updatedAt && (
            <span className="veille-updated" data-testid="veille-updated">
              <RefreshCw size={13} /> Mise à jour le {formatUpdated(data.updatedAt)}
            </span>
          )}
        </div>

        {data.alert && (
          <a
            href={data.alert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="veille-alert"
            data-testid="veille-alert-banner"
          >
            <AlertTriangle size={18} />
            <span className="veille-alert-label">Alerte de sécurité en cours</span>
            <span className="veille-alert-title">{data.alert.title}</span>
            <ExternalLink size={14} />
          </a>
        )}

        <div className="veille-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={category === tab.id}
              className={`veille-tab ${category === tab.id ? 'active' : ''}`}
              onClick={() => setCategory(tab.id)}
              data-testid={`veille-tab-${tab.id}`}
            >
              {tab.label}
              {data.counts?.[tab.id] !== undefined && (
                <span className="veille-tab-count">{data.counts[tab.id]}</span>
              )}
            </button>
          ))}
        </div>

        {status === 'loading' && (
          <div className="veille-state" data-testid="veille-loading">Chargement de la veille…</div>
        )}

        {status === 'error' && (
          <div className="veille-state" data-testid="veille-error">
            La veille est momentanément indisponible.
            <button
              type="button"
              className="veille-retry"
              onClick={() => setAttempt((value) => value + 1)}
              data-testid="veille-retry"
            >
              Réessayer
            </button>
          </div>
        )}

        {status === 'empty' && (
          <div className="veille-state" data-testid="veille-empty">
            Aucune actualité dans cette catégorie pour le moment.
          </div>
        )}

        {status === 'ready' && (
          <ul className="veille-list" data-testid="veille-list">
            {data.items.map((item, index) => (
              <li key={item.id} className="veille-item" data-testid={`veille-item-${index}`}>
                <div className="veille-item-meta">
                  <span className={`veille-badge veille-badge-${item.kind}`}>{item.label}</span>
                  <span className="veille-source">{item.source}</span>
                  {item.publishedAt && <span className="veille-date">{formatDate(item.publishedAt)}</span>}
                </div>

                <h3 className="veille-item-title">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title} <ExternalLink size={13} />
                  </a>
                </h3>

                <p className="veille-item-summary">{item.summary || item.excerpt}</p>

                {item.vendors?.length > 0 && (
                  <div className="veille-vendors">
                    <span className="veille-vendors-label">Concerne votre parc :</span>
                    {item.vendors.map((vendor) => (
                      <span key={vendor} className="veille-vendor">{vendor}</span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="veille-note">
          Titres et extraits issus des flux publics des éditeurs et organismes cités. Cliquez sur un
          titre pour consulter l'article original sur le site de son auteur.
        </p>
      </div>
    </section>
  );
};

export default VeilleSection;
