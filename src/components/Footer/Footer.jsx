import { Link } from 'react-router-dom';
import './Footer.css';

const footerLinks = [
  { label: 'Listings', path: '/listings' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Agents', path: '/agents' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main container">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">Greystone &amp; Co.</Link>
          <p className="footer__tagline">Exceptional homes, extraordinary lives.</p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link key={link.path} to={link.path} className="footer__link">{link.label}</Link>
          ))}
        </nav>

        <div className="footer__contact">
          <p>14 Berkeley Square, Mayfair</p>
          <p>London, W1J 6BS</p>
          <p><a href="tel:+442079460823">+44 20 7946 0823</a></p>
          <p><a href="mailto:hello@greystoneandco.co.uk">hello@greystoneandco.co.uk</a></p>
        </div>

        <div className="footer__social">
          <a href="#" aria-label="Instagram" className="footer__social-link">Instagram</a>
          <a href="#" aria-label="LinkedIn" className="footer__social-link">LinkedIn</a>
          <a href="#" aria-label="Facebook" className="footer__social-link">Facebook</a>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>&copy; 2025 Greystone &amp; Co. All rights reserved.</p>
        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
