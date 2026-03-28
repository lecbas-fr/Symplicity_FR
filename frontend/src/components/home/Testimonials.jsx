import React from 'react';
import { Link } from 'react-router-dom';
import { Quote } from 'lucide-react';
import { testimonials } from '../../data/mockData';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials-section section">
      <div className="container">
        <h6 className="testimonials-label">- TÉMOIGNAGES -</h6>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="testimonial-card glass fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote size={48} className="quote-icon" />
              <blockquote className="testimonial-quote">
                {testimonial.quote}
              </blockquote>
              <div className="testimonial-author">
                <div className="author-name">{testimonial.author}</div>
                <div className="author-company">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonials-cta fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/contact" className="btn-primary">
            NOUS CONTACTER
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;