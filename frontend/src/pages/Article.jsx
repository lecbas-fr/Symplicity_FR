import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import RichText from '../components/RichText';
import CtaSection from '../components/CtaSection';
import { articles } from '../data/siteContent';
import './News.css';

const Article = () => {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!article) return <Navigate to="/actualites" replace />;

  const others = articles.filter((item) => item.slug !== slug);

  return (
    <>
      <SEO
        title={`${article.title} | Symplicity`}
        description={article.excerpt}
        keywords={article.tags.join(', ')}
        ogImage={article.image}
        url={`https://www.symplicity.fr/actualites/${article.slug}`}
      />
      <div className="service-page" data-testid="article-page">

        <section className="article-hero">
          <div className="container container-narrow">
            <Link to="/actualites" className="article-back" data-testid="article-back-link">
              <ArrowLeft size={16} /> Toutes les actualités
            </Link>
            <div className="article-tags">
              {article.tags.map((tag) => <span key={tag} className="article-tag">{tag}</span>)}
            </div>
            <h1 className="article-title" data-testid="article-title">{article.title}</h1>
            <div className="article-meta">
              <span><Calendar size={14} /> {article.dateLabel}</span>
              <span><Clock size={14} /> {article.readTime}</span>
            </div>
          </div>
        </section>

        <div className="container container-narrow">
          <div className="article-cover">
            <img src={article.image} alt={article.title} />
          </div>
        </div>

        <section className="section">
          <div className="container container-narrow">
            <RichText blocks={article.blocks} className="article-body" />
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <span className="eyebrow">À lire également</span>
            <div className="articles-grid articles-grid-2">
              {others.map((item) => (
                <article key={item.slug} className="article-card">
                  <Link to={`/actualites/${item.slug}`} className="article-card-media">
                    <img src={item.image} alt={item.title} />
                  </Link>
                  <div className="article-card-body">
                    <h2 className="article-card-title">
                      <Link to={`/actualites/${item.slug}`}>{item.title}</Link>
                    </h2>
                    <Link to={`/actualites/${item.slug}`} className="article-card-link">
                      Lire l'article <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaSection
          title="Un projet IT, une question de conformité ou de sécurité ?"
          text="Nos experts vous répondent et construisent avec vous une solution sur-mesure."
          testId="article-cta"
        />
      </div>
    </>
  );
};

export default Article;
