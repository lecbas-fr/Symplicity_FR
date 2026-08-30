import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { articles } from '../data/siteContent';
import './News.css';

const News = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEO
        title="Actualités | Symplicity - Infogérance, RGPD et cybersécurité"
        description="Retrouvez les actualités et analyses de Symplicity sur l'infogérance, le RGPD, la cybersécurité et l'intelligence artificielle en entreprise."
        keywords="actualités infogérance, blog cybersécurité, RGPD Essonne, IA cybersécurité, Symplicity actualités"
        url="https://www.symplicity.fr/actualites"
      />
      <div className="service-page" data-testid="news-page">

        <section className="page-hero">
          <div className="container">
            <h1 className="page-title fade-in-up">Actualités</h1>
            <p className="page-subtitle fade-in-up" style={{ animationDelay: '0.1s' }}>
              Analyses, décryptages et nouvelles de l'entreprise
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="articles-grid">
              {articles.map((article, index) => (
                <article key={article.slug} className="article-card fade-in-up" style={{ animationDelay: `${index * 0.08}s` }} data-testid={`article-card-${article.slug}`}>
                  <Link to={`/actualites/${article.slug}`} className="article-card-media">
                    <img src={article.image} alt={article.title} />
                  </Link>
                  <div className="article-card-body">
                    <div className="article-meta">
                      <span><Calendar size={14} /> {article.dateLabel}</span>
                      <span><Clock size={14} /> {article.readTime}</span>
                    </div>
                    <h2 className="article-card-title">
                      <Link to={`/actualites/${article.slug}`}>{article.title}</Link>
                    </h2>
                    <p className="article-card-excerpt">{article.excerpt}</p>
                    <Link to={`/actualites/${article.slug}`} className="article-card-link" data-testid={`article-link-${article.slug}`}>
                      Lire l'article <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default News;
