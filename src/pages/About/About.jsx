import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { animateSectionReveal } from '../../utils/animations';
import StatsBar from '../../components/StatsBar/StatsBar';
import { useMagneticButton } from '../../hooks/useMagneticButton';
import './About.css';

const timeline = [
  { year: '2012', title: 'Founded', description: 'Greystone & Co. established with a vision to redefine boutique estate agency in London.' },
  { year: '2014', title: 'First Mayfair Office', description: 'Opened our flagship office on Berkeley Square, Mayfair.' },
  { year: '2016', title: '100 Properties Sold', description: 'Reached our first major milestone, cementing our reputation in prime London.' },
  { year: '2019', title: 'International Clients', description: 'Expanded services to support international buyers relocating to London.' },
  { year: '2023', title: '£2B in Sales', description: 'Surpassed £2 billion in total property sales across our portfolio.' },
];

const values = [
  { title: 'Integrity', description: 'We operate with complete transparency and honesty in every transaction, ensuring our clients always receive candid, well-informed advice.' },
  { title: 'Expertise', description: 'Our team brings decades of combined experience across every corner of London, from emerging neighbourhoods to established prime addresses.' },
  { title: 'Discretion', description: 'Privacy is paramount. We handle every enquiry, viewing, and negotiation with the utmost confidentiality and professionalism.' },
];

export default function About() {
  const pageRef = useRef(null);
  const magnetic = useMagneticButton();

  useGSAP(() => {
    animateSectionReveal(pageRef.current);
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="about-page">
      <section className="about-hero">
        <img src="/about-hero.jpg" alt="London skyline" className="about-hero__image" />
        <div className="about-hero__overlay" />
        <div className="about-hero__content container">
          <h1 data-animate>About Greystone &amp; Co.</h1>
          <p data-animate>A boutique London estate agency built on discretion, expertise, and an unwavering commitment to our clients.</p>
        </div>
      </section>

      <section className="about-story section">
        <div className="container about-story__inner">
          <div className="about-story__text" data-animate>
            <p className="eyebrow">Our Story</p>
            <h2 className="section-title">A Decade of Excellence</h2>
            <p>When Greystone &amp; Co. was founded in 2012, we set out to create something different — an estate agency that combined the personal touch of a boutique firm with the reach and resources of a global network. Based in the heart of Mayfair, we have grown organically through referrals and reputation, never compromising on the quality of service that defines us.</p>
            <p>Today, our team of specialists covers every corner of London, from the leafy streets of Richmond to the vibrant energy of Shoreditch. We serve a discerning clientele of domestic and international buyers, sellers, landlords, and investors who expect nothing less than exceptional.</p>
          </div>
          <div className="about-timeline" data-animate>
            {timeline.map((item) => (
              <div key={item.year} className="about-timeline__item">
                <span className="about-timeline__year">{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-values section section--surface">
        <div className="container">
          <h2 className="section-title" data-animate>Our Values</h2>
          <div className="about-values__grid">
            <div className="about-values__card about-values__card--integrity" data-animate>
              <h3>Integrity</h3>
              <p>We operate with complete transparency and honesty in every transaction, ensuring our clients always receive candid, well-informed advice.</p>
            </div>
            <div className="about-values__card about-values__card--expertise" data-animate>
              <h3>Expertise</h3>
              <p>Our team brings decades of combined experience across every corner of London, from emerging neighbourhoods to established prime addresses.</p>
            </div>
            <div className="about-values__card about-values__card--discretion" data-animate>
              <h3>Discretion</h3>
              <p>Privacy is paramount. We handle every enquiry, viewing, and negotiation with the utmost confidentiality and professionalism.</p>
            </div>
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="about-cta section">
        <div className="container about-cta__inner" data-animate>
          <h2 className="section-title">Ready to Work With Us?</h2>
          <p>Whether you&apos;re buying, selling, or letting, our team is here to guide you every step of the way.</p>
          <Link
            to="/contact"
            className="btn btn--primary"
            ref={magnetic.btnRef}
            onMouseMove={magnetic.handleMouseMove}
            onMouseLeave={magnetic.handleMouseLeave}
          >
            Work With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
