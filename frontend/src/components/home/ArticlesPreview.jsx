import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { articles } from '../../data/siteContent';
import '../../pages/News.css';

const ArticlesPreview = () => (
  <section className="section" data-testid="home-articles">
    <div className="container">
      <div className="articles-header">
        <div>
          <span className="eyebrow">Actualités</span>
          <h2 className="section-title">Nos derniers articles</h2>
        </div>
        <Link to="/actualites" className="articles-header-link" data-testid="home-all-articles-link">
          Voir tous les articles <ArrowRight size={18} />
        </Link>
      </div>

      <div className="articles-grid">
        {articles.map((article, index) => (
          <article key={article.slug} className="article-card fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
            <Link to={`/actualites/${article.slug}`} className="article-card-media">
              <img src={article.image} alt={article.title} />
            </Link>
            <div className="article-card-body">
              <div className="article-meta">
                <span><Calendar size={14} /> {article.dateLabel}</span>
              </div>
              <h3 className="article-card-title">
                <Link to={`/actualites/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className="article-card-excerpt">{article.excerpt}</p>
              <Link to={`/actualites/${article.slug}`} className="article-card-link">
                Lire l'article <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ArticlesPreview;
