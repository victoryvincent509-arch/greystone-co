import { useRef, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../utils/animations';
import { scrollToTop } from '../../utils/scroll';
import { useMagneticButton } from '../../hooks/useMagneticButton';
import './Navbar.css';

const navLinks = [
  { label: 'Listings', path: '/listings' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Agents', path: '/agents' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const magnetic = useMagneticButton();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useGSAP(() => {
    if (!menuOpen || !overlayRef.current) return;

    const links = overlayRef.current.querySelectorAll('.mobile-nav__link');
    gsap.fromTo(links, { opacity: 0, y: 30 }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, { dependencies: [menuOpen], scope: overlayRef });

  const isHome = location.pathname === '/';

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
    scrollToTop();
  };

  return (
    <>
      <header ref={navRef} className={`navbar ${scrolled || !isHome ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}>
        <div className="navbar__inner container">
          <Link to="/" className="navbar__logo" onClick={handleLogoClick}>Greystone &amp; Co.</Link>

          <nav className="navbar__links" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="navbar__link">
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/contact"
            className="navbar__cta btn btn--primary"
            ref={magnetic.btnRef}
            onMouseMove={magnetic.handleMouseMove}
            onMouseLeave={magnetic.handleMouseLeave}
          >
            Book a Viewing
          </Link>

          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div ref={overlayRef} className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav__links">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="mobile-nav__link">
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="mobile-nav__cta btn btn--primary">Book a Viewing</Link>
        </nav>
      </div>
    </>
  );
}
