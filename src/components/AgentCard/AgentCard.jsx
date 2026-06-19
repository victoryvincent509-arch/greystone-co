import { Link } from 'react-router-dom';
import './AgentCard.css';

export default function AgentCard({ agent }) {
  return (
    <article className="agent-card" data-card>
      <div className="agent-card__image-wrap">
        <img src={agent.photo} alt={agent.name} className="agent-card__image" loading="lazy" />
      </div>
      <div className="agent-card__body">
        <h3 className="agent-card__name">{agent.name}</h3>
        <p className="agent-card__title">{agent.title}</p>
        <p className="agent-card__areas">{agent.neighbourhoods.join(' · ')}</p>
        <Link to={`/agents/${agent.slug}`} className="agent-card__link text-link">
          View Profile &rarr;
        </Link>
      </div>
    </article>
  );
}
