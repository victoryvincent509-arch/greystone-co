import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { animateSectionReveal, ScrollTrigger } from '../../utils/animations';
import { getPropertyBySlug, formatPrice } from '../../data/properties';
import { getAgentBySlug } from '../../data/agents';
import Carousel from '../../components/Carousel/Carousel';
import { useMagneticButton } from '../../hooks/useMagneticButton';
import './PropertyDetail.css';

export default function PropertyDetail() {
  const { slug } = useParams();
  const property = getPropertyBySlug(slug);
  const pageRef = useRef(null);
  const magnetic = useMagneticButton();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});

  useGSAP(() => {
    animateSectionReveal(pageRef.current);

    // Refresh ScrollTrigger after animations are set up to ensure
    // trigger points are calculated based on the complete DOM
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { scope: pageRef });

  if (!property) {
    return (
      <div className="container section">
        <h1>Property Not Found</h1>
        <Link to="/listings" className="text-link">&larr; Back to Listings</Link>
      </div>
    );
  }

  const agent = getAgentBySlug(property.agentSlug);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setForm({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    }
  };

  return (
    <div ref={pageRef} className="property-detail">
      <div className="property-detail__gallery" data-animate>
        <Carousel images={property.images} alt={property.name} showThumbnails className="carousel--gallery" />
      </div>

      <div className="container property-detail__main">
        <Link to="/listings" className="property-detail__back text-link">&larr; Back to Listings</Link>

        <div className="property-detail__layout">
          <div className="property-detail__content">
            <div data-animate>
              <span className="property-detail__badge">{property.status}</span>
              <h1 className="property-detail__title">{property.name}</h1>
              <p className="property-detail__price">{formatPrice(property)}</p>
              <p className="property-detail__location">{property.neighbourhood}, London</p>
            </div>

            <div className="property-detail__stats" data-animate>
              <div className="property-detail__stat"><span>{property.beds}</span> Beds</div>
              <div className="property-detail__stat"><span>{property.baths}</span> Baths</div>
              <div className="property-detail__stat"><span>{property.sqft.toLocaleString('en-GB')}</span> Sqft</div>
              <div className="property-detail__stat"><span>{property.parking}</span> Parking</div>
              <div className="property-detail__stat"><span>{property.garden ? 'Yes' : 'No'}</span> Garden</div>
            </div>

            <div className="property-detail__description" data-animate>
              {property.description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="property-detail__features" data-animate>
              <h2>Features &amp; Amenities</h2>
              <ul className="property-detail__features-list">
                {property.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="property-detail__sidebar">
            {agent && (
              <div className="property-detail__agent" data-animate>
                <img src={agent.photo} alt={agent.name} loading="lazy" />
                <h3>{agent.name}</h3>
                <p>{agent.title}</p>
                <a href={`tel:${agent.phone.replace(/\s/g, '')}`}>{agent.phone}</a>
                <a href={`mailto:${agent.email}`}>{agent.email}</a>
              </div>
            )}

            <form className="property-detail__form" onSubmit={handleSubmit} data-animate>
              <h3>Send an Enquiry</h3>
              <div className="form-group">
                <label htmlFor="enq-name">Name</label>
                <input id="enq-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="enq-email">Email</label>
                <input id="enq-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="enq-phone">Phone</label>
                <input id="enq-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="enq-message">Message</label>
                <textarea id="enq-message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn--primary property-detail__submit">Send Enquiry</button>
              <Link
                to="/contact"
                className="btn btn--secondary property-detail__viewing"
                ref={magnetic.btnRef}
                onMouseMove={magnetic.handleMouseMove}
                onMouseLeave={magnetic.handleMouseLeave}
              >
                Book a Viewing
              </Link>
            </form>
          </aside>
        </div>
      </div>
    </div>
  );
}
