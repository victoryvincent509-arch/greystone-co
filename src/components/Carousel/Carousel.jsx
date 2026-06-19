import { useState, useRef, useEffect, useCallback } from 'react';
import './Carousel.css';

export default function Carousel({ images, alt = 'Property image', showThumbnails = false, className = '' }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback((index) => {
    setCurrent((index + images.length) % images.length);
  }, [images.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
  };

  useEffect(() => {
    setCurrent(0);
  }, [images]);

  if (!images?.length) return null;

  return (
    <div className={`carousel ${className}`}>
      <div
        className="carousel__main"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          className="carousel__image"
          loading={current === 0 ? 'eager' : 'lazy'}
        />
        {images.length > 1 && (
          <>
            <button className="carousel__arrow carousel__arrow--prev" onClick={() => goTo(current - 1)} aria-label="Previous image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="carousel__arrow carousel__arrow--next" onClick={() => goTo(current + 1)} aria-label="Next image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <div className="carousel__dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`carousel__dot ${i === current ? 'carousel__dot--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {showThumbnails && images.length > 1 && (
        <div className="carousel__thumbnails">
          {images.map((img, i) => (
            <button
              key={i}
              className={`carousel__thumb ${i === current ? 'carousel__thumb--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={img} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
