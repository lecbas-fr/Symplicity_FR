import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/mockData';
import './Testimonials.css';

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const go = useCallback((next) => {
    setIndex((current) => (next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => go(index + 1), 7000);
    return () => clearInterval(timer);
  }, [index, go]);

  const active = testimonials[index];

  return (
    <section className="testimonials-section section section-alt" data-testid="testimonials-section">
      <div className="container">
        <h6 className="testimonials-label">Témoignages</h6>

        <figure className="testimonial" key={active.id}>
          <blockquote className="testimonial-quote" data-testid="testimonial-quote">
            « {active.quote} »
          </blockquote>
          <figcaption className="testimonial-author">
            <img src={active.logo} alt={active.company} className="testimonial-logo" />
            <span className="testimonial-identity">
              <span className="author-name" data-testid="testimonial-author">{active.author}</span>
              <span className="author-role">{active.role} — {active.company}</span>
            </span>
          </figcaption>
        </figure>

        <div className="testimonials-controls">
          <button
            type="button"
            className="testimonial-nav"
            onClick={() => go(index - 1)}
            aria-label="Témoignage précédent"
            data-testid="testimonial-prev"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="testimonial-dots">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`testimonial-dot ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Témoignage ${i + 1}`}
                data-testid={`testimonial-dot-${i}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="testimonial-nav"
            onClick={() => go(index + 1)}
            aria-label="Témoignage suivant"
            data-testid="testimonial-next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
