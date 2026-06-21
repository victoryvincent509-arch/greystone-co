import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { animateSectionReveal, ScrollTrigger } from '../../utils/animations';
import { useMagneticButton } from '../../hooks/useMagneticButton';
import './Contact.css';

export default function Contact() {
  const pageRef = useRef(null);
  const magnetic = useMagneticButton();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  useGSAP(() => {
    animateSectionReveal(pageRef.current);

    // Refresh ScrollTrigger after animations are set up to ensure
    // trigger points are calculated based on the complete DOM
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { scope: pageRef });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    }
  };

  return (
    <div ref={pageRef} className="contact-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title" data-animate>Contact Us</h1>
          <p className="page-header__subtitle" data-animate>We&apos;d love to hear from you. Reach out and one of our specialists will be in touch shortly.</p>
        </div>
      </div>

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-info" data-animate>
            <h2>Visit Our Office</h2>
            <div className="contact-info__details">
              <p><strong>Address</strong><br />14 Berkeley Square, Mayfair<br />London, W1J 6BS</p>
              <p><strong>Phone</strong><br /><a href="tel:+442079460823">+44 20 7946 0823</a></p>
              <p><strong>Email</strong><br /><a href="mailto:hello@greystoneandco.co.uk">hello@greystoneandco.co.uk</a></p>
              <p><strong>Opening Hours</strong><br />Monday – Friday: 9:00 – 18:00<br />Saturday: 10:00 – 16:00<br />Sunday: Closed</p>
            </div>
            <div className="contact-info__map">
              <iframe
                title="Greystone & Co. office location"
                src="https://maps.google.com/maps?q=14+Berkeley+Square,+Mayfair,+London,+W1J+6BS&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} data-animate>
            <h2>Send a Message</h2>
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="contact-phone">Phone</label>
              <input id="contact-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>
            {submitStatus === 'success' && (
              <div className="form-success">Thank you for your enquiry. A member of our team will be in touch shortly.</div>
            )}
            <button
              type="submit"
              className="btn btn--primary contact-form__submit"
              ref={magnetic.btnRef}
              onMouseMove={magnetic.handleMouseMove}
              onMouseLeave={magnetic.handleMouseLeave}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <section className="contact-quick section section--surface">
        <div className="container contact-quick__grid">
          <a href="tel:+442079460823" className="contact-quick__card" data-animate>
            <h3>Call Us</h3>
            <p>+44 20 7946 0823</p>
          </a>
          <a href="mailto:hello@greystoneandco.co.uk" className="contact-quick__card" data-animate>
            <h3>Email Us</h3>
            <p>hello@greystoneandco.co.uk</p>
          </a>
          <div className="contact-quick__card" data-animate>
            <h3>Visit Us</h3>
            <p>14 Berkeley Square, Mayfair, W1J 6BS</p>
          </div>
        </div>
      </section>
    </div>
  );
}
