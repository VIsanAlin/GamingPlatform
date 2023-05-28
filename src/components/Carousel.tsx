import React, { useState } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative mt-2 z-0">
      <div className="relative block z-0">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      </div>
      <div className="flex absolute  top-1/3 left-0 right-0 translate-y-1/2 justify-between ">
        <button
          className="text-xl bg-transparent border-none mr-auto "
          onClick={goToPrevSlide}
        >
          &lt;
        </button>
        <button
          className="text-xl bg-transparent border-none ml-auto"
          onClick={goToNextSlide}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
