import React from 'react';

const Carousel = ({ slides }) => {
  return (
    <div className="carousel w-full h-[400px] mb-6">
      {slides.map(slide => (
        <div key={slide.id} id={`slide${slide.id}`} className="carousel-item relative w-full h-full">
          <img
            src={slide.image}
            className="w-full h-full object-contain" 
            alt={`Slide ${slide.id}`}
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href={`#slide${slide.prevSlide}`} className="btn btn-circle">❮</a>
            <a href={`#slide${slide.nextSlide}`} className="btn btn-circle">❯</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
