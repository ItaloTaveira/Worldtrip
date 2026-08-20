import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Carousel.css';

function Carousel({ images, autoPlay = true, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const imagesCount = images.length;

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [currentIndex, isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % imagesCount);
  }, [currentIndex, imagesCount, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + imagesCount) % imagesCount);
  }, [currentIndex, imagesCount, goToSlide]);

  const handleTouchStart = (e) => {
    setTouchStart(e.changedTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    if (!autoPlay) return;
    intervalRef.current = setInterval(nextSlide, interval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, interval, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  const pauseAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resumeAutoPlay = () => {
    if (autoPlay) {
      intervalRef.current = setInterval(nextSlide, interval);
    }
  };

  return (
    <div
      className="carousel"
      ref={carouselRef}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Carousel de destinos"
      aria-roledescription="carousel"
    >
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isAnimating ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-slide"
            data-index={index}
            aria-hidden={index !== currentIndex}
          >
            <div className="slide-content">
              <img
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="slide-image"
              />
              <div className="slide-overlay">
                <h3 className="slide-title">{image.title}</h3>
                <p className="slide-subtitle">{image.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {imagesCount > 1 && (
        <>
          <button
            className="carousel-btn carousel-btn--prev"
            onClick={prevSlide}
            aria-label="Slide anterior"
            disabled={isAnimating}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            className="carousel-btn carousel-btn--next"
            onClick={nextSlide}
            aria-label="Próximo slide"
            disabled={isAnimating}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div className="carousel-indicators" aria-label="Indicadores de slide">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
                disabled={isAnimating}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Carousel;