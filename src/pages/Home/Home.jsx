import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap, animateSectionReveal, animateStaggerCards, setupParallax, ScrollTrigger } from '../../utils/animations';
import { useMagneticButton } from '../../hooks/useMagneticButton';
import { properties } from '../../data/properties';
import { getFeaturedAgents } from '../../data/agents';
import { blogPosts } from '../../data/blogPosts';
import SearchBar from '../../components/SearchBar/SearchBar';
import StatsBar from '../../components/StatsBar/StatsBar';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import AgentCard from '../../components/AgentCard/AgentCard';
import BlogCard from '../../components/BlogCard/BlogCard';
import Testimonials from '../../components/Testimonials/Testimonials';
import './Home.css';

const featuredAgents = getFeaturedAgents(3);
const featuredBlog = blogPosts.slice(0, 3);


export default function Home() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const aboutImageRef = useRef(null);
  const parallaxRef = useRef(null);
  const exploreMagnetic = useMagneticButton();
  const ctaMagnetic = useMagneticButton();
  const ctaMagnetic2 = useMagneticButton();

  useGSAP(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero__eyebrow', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
      .fromTo('.hero__title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.8)
      .fromTo('.hero__subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.0)
      .fromTo('.hero__actions', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.2)
      .fromTo('.hero__search', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.4);

    gsap.fromTo('.hero__video', { y: () => -window.innerHeight * 0.2 }, {
      y: () => window.innerHeight * 0.4,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Increased parallax effect on mobile
    if (window.innerWidth < 768) {
      gsap.fromTo('.hero__video', { y: () => -window.innerHeight * 0.15 }, {
        y: () => window.innerHeight * 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, { scope: heroRef });

  useGSAP(() => {
    animateSectionReveal(pageRef.current);
    animateStaggerCards(pageRef.current?.querySelector('.properties__grid'));
    animateStaggerCards(pageRef.current?.querySelector('.agents-teaser__grid'));
    animateStaggerCards(pageRef.current?.querySelector('.blog-teaser__grid'));
    setupParallax(aboutImageRef.current, 0.4);
    const parallaxImg = parallaxRef.current?.querySelector('.home-parallax__image');
    if (parallaxImg) setupParallax(parallaxImg, 0.4);

    // Refresh ScrollTrigger after animations are set up to ensure
    // trigger points are calculated based on the complete DOM
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="home">
      <section ref={heroRef} className="hero">
        <div className="hero__video-wrap">
          <img
            className="hero__video"
            src="https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?w=1600&q=85"
            alt="London skyline"
          />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content container">
          <p className="hero__eyebrow">London&apos;s Premier Boutique Agency</p>
          <h1 className="hero__title">Exceptional Homes,<br />Extraordinary Lives</h1>
          <p className="hero__subtitle">Greystone &amp; Co. connects discerning buyers with London&apos;s finest properties — from Kensington apartments to Chelsea townhouses.</p>
          <div className="hero__actions">
            <Link
              to="/listings"
              className="btn btn--primary"
              ref={exploreMagnetic.btnRef}
              onMouseMove={exploreMagnetic.handleMouseMove}
              onMouseLeave={exploreMagnetic.handleMouseLeave}
            >
              Explore Our Listings
            </Link>
            <Link to="/agents" className="text-link--white">Meet Our Agents &rarr;</Link>
          </div>
          <div className="hero__search">
            <SearchBar variant="hero" />
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="about-intro section">
        <div className="about-intro__inner container">
          <div className="about-intro__image-wrap" data-animate>
            <img
              ref={aboutImageRef}
              src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80"
              alt="Luxury London property interior"
              className="about-intro__image"
              loading="lazy"
            />
          </div>
          <div className="about-intro__text" data-animate>
            <p className="eyebrow">About Greystone &amp; Co.</p>
            <h2 className="section-title">We Don&apos;t Just Find Houses. We Find Homes.</h2>
            <p className="about-intro__body">Founded in 2012, Greystone &amp; Co. has built its reputation on discretion, expertise, and an unwavering commitment to our clients. Our team of specialists knows every street, every neighbourhood, and every opportunity London has to offer — before it hits the market.</p>
            <Link to="/about" className="text-link">Our Story &rarr;</Link>
          </div>
        </div>
      </section>

      <section className="properties section">
        <div className="container">
          <p className="eyebrow" data-animate>OUR LISTINGS</p>
          <h2 className="section-title" data-animate>Properties Available Now</h2>
          <p className="section-subtitle" data-animate>A carefully selected collection of apartments and townhouses across London's most desirable neighbourhoods.</p>
          <div className="properties__grid grid-3" data-animate>
            {properties.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
          <div className="properties__cta" data-animate>
            <Link to="/listings" className="btn btn--secondary">View All Properties &rarr;</Link>
          </div>
        </div>
      </section>

      <section className="why-us section section--surface">
        <div className="container">
          <h2 className="section-title" data-animate>Why London&apos;s Finest Choose Greystone</h2>
          <div className="why-us__grid">
            <div className="why-us__item" data-animate>
              <h3>Exclusive Access</h3>
              <p>We list properties before they reach the open market, giving our clients first-mover advantage.</p>
            </div>
            <div className="why-us__item" data-animate>
              <h3>Expert Guidance</h3>
              <p>Our agents are specialists in their neighbourhoods, offering advice grounded in decades of combined experience.</p>
            </div>
            <div className="why-us__item" data-animate>
              <h3>White-Glove Service</h3>
              <p>From first viewing to final completion, we manage every detail so you don&apos;t have to.</p>
            </div>
          </div>
          <div data-animate>
            <Link to="/services" className="text-link">Explore Our Services &rarr;</Link>
          </div>
        </div>
      </section>

      <section className="home-parallax" ref={parallaxRef}>
        <img
          src="https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=800&q=80"
          alt="Luxury London property"
          className="home-parallax__image"
          loading="lazy"
        />
        <div className="home-parallax__overlay" />
        <div className="home-parallax__text container">
          <p className="home-parallax__quote">&ldquo;London is not a city. It is a world.&rdquo;</p>
        </div>
      </section>

      <Testimonials />

      <section className="agents-teaser section">
        <div className="container">
          <p className="eyebrow" data-animate>Our People</p>
          <h2 className="section-title" data-animate>Specialists You Can Trust</h2>
          <div className="agents-teaser__grid grid-3">
            {featuredAgents.map((agent) => (
              <AgentCard key={agent.slug} agent={agent} />
            ))}
          </div>
          <div className="agents-teaser__cta" data-animate>
            <Link to="/agents" className="btn btn--secondary">Meet the Full Team &rarr;</Link>
          </div>
        </div>
      </section>

      <section className="blog-teaser section section--surface">
        <div className="container">
          <p className="eyebrow" data-animate>Market Insights</p>
          <h2 className="section-title" data-animate>Stay Ahead of the Market</h2>
          <div className="blog-teaser__grid grid-3">
            {featuredBlog.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="blog-teaser__cta" data-animate>
            <Link to="/blog" className="btn btn--secondary">Read All Articles &rarr;</Link>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container contact-cta__inner" data-animate>
          <h2 className="contact-cta__title">Ready to Find Your Perfect London Home?</h2>
          <p className="contact-cta__text">Speak with one of our specialists today. No pressure, just honest advice.</p>
          <div className="contact-cta__actions">
            <Link
              to="/contact"
              className="btn btn--dark"
              ref={ctaMagnetic.btnRef}
              onMouseMove={ctaMagnetic.handleMouseMove}
              onMouseLeave={ctaMagnetic.handleMouseLeave}
            >
              Book a Viewing
            </Link>
            <a
              href="tel:+442079460823"
              className="btn btn--outline-dark"
              ref={ctaMagnetic2.btnRef}
              onMouseMove={ctaMagnetic2.handleMouseMove}
              onMouseLeave={ctaMagnetic2.handleMouseLeave}
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
