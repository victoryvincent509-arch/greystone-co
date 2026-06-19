import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../utils/animations';
import './Testimonials.css';

const testimonials = [
  {
    quote: 'Greystone & Co. found us our dream home in Notting Hill within three weeks. James understood exactly what we wanted from the very first conversation — the level of service was unlike anything we\'d experienced before.',
    name: 'James & Sophie Hartley',
    property: 'Notting Hill Townhouse',
  },
  {
    quote: 'Absolutely exceptional. Charlotte knew every detail about Kensington before we\'d even asked a question. As a British-Ghanaian family putting down roots in London, we felt genuinely understood throughout.',
    name: 'Dr. Amara Osei',
    property: 'The Kensington, Kensington',
  },
  {
    quote: 'We sold our Chelsea flat above asking price in under a week. Marcus handled everything with the discretion and polish you\'d expect from a proper Mayfair agency — Greystone\'s network is extraordinary.',
    name: 'Marcus Bellingham',
    property: 'Chelsea Apartment',
  },
  {
    quote: 'Relocating from New York was daunting, but the Greystone team made it seamless. As Americans settling in Richmond, we needed someone who understood both worlds — professional, warm, and genuinely invested in finding us the right home.',
    name: 'Rachel & Tom Fineman',
    property: 'Richmond Townhouse',
  },
  {
    quote: 'Their off-market access is real. We found a Richmond townhouse that was never publicly listed — a stunning family home with beautiful gardens, exactly what we were looking for. Greystone made the whole process effortless.',
    name: 'Emily & Oliver Graves',
    property: 'Richmond Riverside Townhouse',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const slideRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!slideRef.current) return;
    gsap.fromTo(slideRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' });
  }, { dependencies: [current], scope: sectionRef });

  return (
    <section ref={sectionRef} className="testimonials section section--dark">
      <div className="container">
        <p className="eyebrow" data-animate>Client Stories</p>
        <h2 className="section-title" data-animate>What Our Clients Say</h2>

        <div className="testimonials__slider" data-animate>
          <div ref={slideRef} className="testimonials__slide">
            <blockquote className="testimonials__quote">&ldquo;{testimonials[current].quote}&rdquo;</blockquote>
            <div className="testimonials__stars" aria-label="5 star rating">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--color-accent)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="testimonials__name">{testimonials[current].name}</p>
            <p className="testimonials__property">{testimonials[current].property}</p>
          </div>

          <div className="testimonials__nav">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
