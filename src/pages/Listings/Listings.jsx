import { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap, animateSectionReveal, ScrollTrigger } from '../../utils/animations';
import { filterProperties } from '../../data/properties';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import './Listings.css';

const typeOptions = ['All', 'Apartment', 'Townhouse'];
const neighbourhoodOptions = ['All', 'Mayfair', 'Kensington', 'Chelsea', 'Notting Hill', 'Greenwich', 'Canary Wharf', 'Richmond', 'Belgravia', 'Shoreditch'];
const statusOptions = ['All', 'For Sale', 'To Let'];

export default function Listings() {
  const pageRef = useRef(null);
  const gridRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeParam = searchParams.get('type');
  const [type, setType] = useState(typeParam ? typeParam.charAt(0).toUpperCase() + typeParam.slice(1) : 'All');
  const [neighbourhood, setNeighbourhood] = useState(searchParams.get('neighbourhood') || 'All');
  const [status, setStatus] = useState(searchParams.get('status') || 'All');
  const [scrolled, setScrolled] = useState(false);
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100 && window.innerWidth < 768) {
        setScrolled(true);
        setFiltersCollapsed(true);
      } else if (scrollY <= 100 || window.innerWidth >= 768) {
        setScrolled(false);
        setFiltersCollapsed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFilters = () => {
    setFiltersCollapsed(!filtersCollapsed);
  };

  const filtered = useMemo(() => {
    return filterProperties({
      type: type === 'All' ? '' : type.toLowerCase(),
      neighbourhood: neighbourhood === 'All' ? '' : neighbourhood,
      status: status === 'All' ? '' : status,
    });
  }, [type, neighbourhood, status]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (type !== 'All') params.set('type', type.toLowerCase());
    if (neighbourhood !== 'All') params.set('neighbourhood', neighbourhood);
    if (status !== 'All') params.set('status', status);
    setSearchParams(params, { replace: true });
  }, [type, neighbourhood, status, setSearchParams]);

  useGSAP(() => {
    animateSectionReveal(pageRef.current);

    // Refresh ScrollTrigger after animations are set up to ensure
    // trigger points are calculated based on the complete DOM
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { scope: pageRef });

  useGSAP(() => {
    const cards = gridRef.current?.querySelectorAll('[data-card]');
    if (!cards?.length) return;

    gsap.fromTo(cards, { opacity: 0, y: 30 }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
    });

    // Refresh ScrollTrigger after cards animation is set up
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, { dependencies: [filtered], scope: gridRef });

  const clearFilters = () => {
    setType('All');
    setNeighbourhood('All');
    setStatus('All');
  };

  return (
    <div ref={pageRef} className="listings-page">
      <div className="page-header">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__sep">/</span>
            <span>Listings</span>
          </nav>
          <h1 className="page-header__title">Our Properties</h1>
          <p className="page-header__subtitle">Browse our curated portfolio of London&apos;s finest homes.</p>
        </div>
      </div>

      <div className={`listings-filters ${filtersCollapsed ? 'filters--collapsed' : ''}`}>
        {filtersCollapsed ? (
          <div className="container listings-filters__collapsed">
            <button className="listings-filters__toggle" onClick={toggleFilters}>
              Filters <span className="listings-filters__expand-icon">▼</span>
            </button>
          </div>
        ) : (
          <div className="container listings-filters__inner">
            <div className="listings-filters__group">
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                {typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="listings-filters__group">
              <label>Neighbourhood</label>
              <select value={neighbourhood} onChange={(e) => setNeighbourhood(e.target.value)}>
                {neighbourhoodOptions.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="listings-filters__group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button className="listings-filters__clear text-link" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>

      <section className="listings-results section">
        <div className="container">
          <p className="listings-results__count">Showing {filtered.length} propert{filtered.length === 1 ? 'y' : 'ies'}</p>
          <div ref={gridRef} className="listings-results__grid grid-3">
            {filtered.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="listings-results__empty">No properties match your filters. Try adjusting your search criteria.</p>
          )}
        </div>
      </section>
    </div>
  );
}
