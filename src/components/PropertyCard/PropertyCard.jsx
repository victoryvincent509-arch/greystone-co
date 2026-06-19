import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import { formatPrice } from '../../data/properties';
import './PropertyCard.css';

export default function PropertyCard({ property, cardImages }) {
  const images = cardImages || property.images.slice(0, 4);

  return (
    <article className="property-card" data-card>
      <div className="property-card__media">
        <Carousel images={images} alt={property.name} />
        <span className="property-card__badge">{property.status}</span>
      </div>
      <div className="property-card__body">
        <h3 className="property-card__name">{property.name}</h3>
        <p className="property-card__price">{formatPrice(property)}</p>
        <p className="property-card__location">{property.neighbourhood}, London</p>
        <div className="property-card__stats">
          <span>{property.beds} Beds</span>
          <span className="property-card__divider">|</span>
          <span>{property.baths} Baths</span>
          <span className="property-card__divider">|</span>
          <span>{property.sqft.toLocaleString('en-GB')} Sqft</span>
        </div>
        <Link to={`/listings/${property.slug}`} className="property-card__link text-link">
          View Property &rarr;
        </Link>
      </div>
    </article>
  );
}
