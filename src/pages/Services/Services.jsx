import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { animateSectionReveal, ScrollTrigger } from '../../utils/animations';
import { useMagneticButton } from '../../hooks/useMagneticButton';
import './Services.css';

const services = [
  { title: 'Residential Sales', description: 'Helping buyers and sellers navigate London\'s prime residential market with expert guidance, market intelligence, and a network that opens doors others cannot.', image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80' },
  { title: 'Property Lettings', description: 'Matching landlords with quality tenants across all London neighbourhoods. From single flats to entire portfolios, we manage every detail with precision and care.', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80' },
  { title: 'Investment Consultancy', description: 'Identifying high-yield investment opportunities for portfolio buyers. Our analytical approach combines market data with on-the-ground intelligence to maximise returns.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { title: 'Relocation Services', description: 'Seamless relocation support for international buyers moving to London. From school searches to area orientation, we handle the complexity so you can focus on your new chapter.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { title: 'Property Valuation', description: 'Accurate, data-driven valuations with no obligation. Our valuations combine comparable sales analysis with deep local knowledge for a figure you can trust.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
  { title: 'Off-Market Access', description: 'Exclusive access to properties before they hit the open market. Our longstanding relationships with vendors and developers give our clients a genuine first-mover advantage.', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80' },
];

export default function Services() {
  const pageRef = useRef(null);
  const magnetic = useMagneticButton();

  useGSAP(() => {
    animateSectionReveal(pageRef.current);

    // Refresh ScrollTrigger after animations are set up to ensure
    // trigger points are calculated based on the complete DOM
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="services-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title" data-animate>What We Offer</h1>
          <p className="page-header__subtitle" data-animate>Comprehensive property services tailored to London&apos;s most discerning clients.</p>
        </div>
      </div>

      {services.map((service, i) => (
        <section key={service.title} className={`service-block ${i % 2 !== 0 ? 'service-block--reverse' : ''}`}>
          {service.image && (
            <div className="service-block__image" data-animate>
              <img src={service.image} alt={service.title} loading="lazy" />
            </div>
          )}
          <div className="service-block__content" data-animate>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        </section>
      ))}

      <section className="services-cta">
        <div className="container services-cta__inner" data-animate>
          <h2 className="section-title">Let&apos;s Discuss Your Requirements</h2>
          <p>Contact our team for a confidential, no-obligation consultation.</p>
          <Link
            to="/contact"
            className="btn btn--primary"
            ref={magnetic.btnRef}
            onMouseMove={magnetic.handleMouseMove}
            onMouseLeave={magnetic.handleMouseLeave}
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
