import React, { useEffect, useRef } from 'react';
import { clientLogos } from '../../data/mockData';
import './ClientsCarousel.css';

const ClientsCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      if (scrollPosition >= carousel.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      carousel.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Triple the logos for seamless loop
  const tripleLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="clients-section">
      <div className="container">
        <h6 className="clients-label">- NOS CLIENTS -</h6>
      </div>
      
      <div className="carousel-container">
        <div className="carousel-wrapper" ref={carouselRef}>
          <div className="carousel-track">
            {tripleLogos.map((client, index) => (
              <div key={`${client.id}-${index}`} className="client-logo">
                <img src={client.url} alt={client.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsCarousel;