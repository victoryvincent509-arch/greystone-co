import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMagneticButton } from '../../hooks/useMagneticButton';
import './SearchBar.css';

const propertyTypes = ['All Types', 'Apartment', 'Townhouse'];
const neighbourhoods = ['All Areas', 'Mayfair', 'Kensington', 'Chelsea', 'Notting Hill', 'Greenwich', 'Canary Wharf', 'Richmond', 'Belgravia', 'Shoreditch'];

export default function SearchBar({ variant = 'hero', onSearch }) {
  const navigate = useNavigate();
  const magnetic = useMagneticButton();
  const [type, setType] = useState('All Types');
  const [area, setArea] = useState('All Areas');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type !== 'All Types') params.set('type', type.toLowerCase());
    if (area !== 'All Areas') params.set('neighbourhood', area);
    const query = params.toString();
    if (onSearch) {
      onSearch({ type, area });
    } else {
      navigate(`/listings${query ? `?${query}` : ''}`);
    }
  };

  return (
    <form className={`search-bar search-bar--${variant}`} onSubmit={handleSearch}>
      <div className="search-bar__fields">
        <div className="search-bar__field">
          <label htmlFor="search-type">Property Type</label>
          <select id="search-type" value={type} onChange={(e) => setType(e.target.value)}>
            {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="search-bar__field">
          <label htmlFor="search-area">Neighbourhood</label>
          <select id="search-area" value={area} onChange={(e) => setArea(e.target.value)}>
            {neighbourhoods.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="search-bar__btn btn btn--primary"
        ref={magnetic.btnRef}
        onMouseMove={magnetic.handleMouseMove}
        onMouseLeave={magnetic.handleMouseLeave}
      >
        Search
      </button>
    </form>
  );
}
