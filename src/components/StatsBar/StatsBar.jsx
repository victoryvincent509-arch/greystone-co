import './StatsBar.css';

const stats = [
  { value: '340+', label: 'Properties Sold' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '12', label: 'Years of Excellence' },
  { value: '£2.4B', label: 'in Total Sales' },
];

export default function StatsBar() {
  return (
    <section className="stats-bar section--surface">
      <div className="stats-bar__inner container">
        {stats.map((stat, i) => (
          <div key={stat.label} className="stats-bar__item" data-animate>
            <span className="stats-bar__value">{stat.value}</span>
            <span className="stats-bar__label">{stat.label}</span>
            {i < stats.length - 1 && <span className="stats-bar__divider" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  );
}
