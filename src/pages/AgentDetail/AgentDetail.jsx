import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { animateSectionReveal, animateStaggerCards, ScrollTrigger } from '../../utils/animations';
import { getAgentBySlug } from '../../data/agents';
import { getPropertiesByAgent } from '../../data/properties';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './AgentDetail.css';

export default function AgentDetail() {
  const { slug } = useParams();
  const agent = getAgentBySlug(slug);
  const pageRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});

  useGSAP(() => {
    animateSectionReveal(pageRef.current);
    animateStaggerCards(pageRef.current?.querySelector('.agent-listings__grid'));

    // Refresh ScrollTrigger after animations are set up to ensure
    // trigger points are calculated based on the complete DOM
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { scope: pageRef });

  if (!agent) {
    return (
      <div className="container section">
        <h1>Agent Not Found</h1>
        <Link to="/agents" className="text-link">&larr; Back to Team</Link>
      </div>
    );
  }

  const listings = getPropertiesByAgent(agent.slug);

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
    <div ref={pageRef} className="agent-detail">
      <section className="agent-detail__hero">
        <img src={agent.photo} alt={agent.name} className="agent-detail__hero-image" />
        <div className="agent-detail__hero-overlay" />
        <div className="container agent-detail__hero-content">
          <Link to="/agents" className="agent-detail__back text-link--white">&larr; Back to Team</Link>
          <h1 data-animate>{agent.name}</h1>
          <p data-animate>{agent.title}</p>
        </div>
      </section>

      <section className="section">
        <div className="container agent-detail__layout">
          <div className="agent-detail__main">
            <div data-animate>
              <h2 className="section-title">About {agent.name.split(' ')[0]}</h2>
              <p className="agent-detail__bio">{agent.bio}</p>
            </div>

            <div className="agent-detail__specialisms" data-animate>
              <h3>Specialisms</h3>
              <div className="agent-detail__tags">
                {agent.neighbourhoods.map((n) => (
                  <span key={n} className="agent-detail__tag">{n}</span>
                ))}
              </div>
            </div>

            <div className="agent-detail__stats-row" data-animate>
              <div className="agent-detail__stat">
                <span>{agent.propertiesSold}</span>
                Properties Sold
              </div>
              <div className="agent-detail__stat">
                <span>{agent.yearsExperience}</span>
                Years Experience
              </div>
              <div className="agent-detail__stat">
                <span>{agent.clientRating}</span>
                Client Rating
              </div>
            </div>
          </div>

          <aside className="agent-detail__sidebar">
            <form className="agent-detail__form" onSubmit={handleSubmit} data-animate>
              <h3>Contact {agent.name.split(' ')[0]}</h3>
              <div className="form-group">
                <label htmlFor="agent-name">Name</label>
                <input id="agent-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="agent-email">Email</label>
                <input id="agent-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="agent-phone">Phone</label>
                <input id="agent-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="agent-message">Message</label>
                <textarea id="agent-message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn--primary agent-detail__submit">Send Message</button>
            </form>
          </aside>
        </div>
      </section>

      {listings.length > 0 && (
        <section className="agent-listings section section--surface">
          <div className="container">
            <h2 className="section-title" data-animate>Active Listings</h2>
            <div className="agent-listings__grid grid-3">
              {listings.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
