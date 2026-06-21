import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { animateSectionReveal, animateStaggerCards, ScrollTrigger } from '../../utils/animations';
import { agents } from '../../data/agents';
import './Agents.css';

export default function Agents() {
  const pageRef = useRef(null);

  useGSAP(() => {
    animateSectionReveal(pageRef.current);
    animateStaggerCards(pageRef.current?.querySelector('.agents-grid'));

    // Refresh ScrollTrigger after animations are set up to ensure
    // trigger points are calculated based on the complete DOM
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="agents-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title" data-animate>Meet Our Team</h1>
          <p className="page-header__subtitle" data-animate>Our specialists bring decades of combined experience and genuine passion for London property.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="agents-grid">
            {agents.map((agent) => (
              <Link key={agent.slug} to={`/agents/${agent.slug}`} className="agents-card" data-card>
                <div className="agents-card__image">
                  <img src={agent.photo} alt={agent.name} loading="lazy" />
                </div>
                <div className="agents-card__body">
                  <h2 className="agents-card__name">{agent.name}</h2>
                  <p className="agents-card__title">{agent.title}</p>
                  <p className="agents-card__areas">{agent.neighbourhoods.join(' · ')}</p>
                  <div className="agents-card__stats">
                    <span>{agent.propertiesSold} Properties Sold</span>
                  </div>
                  <p className="agents-card__bio">{agent.bio.slice(0, 160)}...</p>
                  <span className="agents-card__link text-link">View Profile &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
