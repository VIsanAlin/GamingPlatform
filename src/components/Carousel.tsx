import React, { useState } from "react";
import Link from "next/link";
import { BsNintendoSwitch } from "react-icons/bs";

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
    <div className="relative mt-2 z-0 justify-between ">
      <Link href="/product-link" className="relative mt-2 z-0 flex">
        <div className="relative block z-0 " style={{ width: "65%" }}>
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="rounded-l-3xl"
          />
        </div>
        <div
          className="flex flex-col justify-between ml-4 bg-forthColor rounded-r-3xl"
          style={{ maxWidth: "30%" }}
        >
          <div>
            <h2 className="text-xl font-bold py-4">Title</h2>
            <p className="text-sm mb-4">
              Here is the description for the product you are seeing the image
              on your left and will make you more interested to buy this game
            </p>
          </div>
          <div>
            <p className="font-light mb-2">$29.99</p>
            <div className="flex space-x-4 pb-6">
              <button>Available right now</button>
              <BsNintendoSwitch />
            </div>
          </div>
        </div>
      </Link>
      <div className="flex absolute top-1/3 left-0 right-0 translate-y-1/2 justify-between">
        <button
          className="text-xl bg-transparent border-none mr-auto"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          &lt;
        </button>
        <button
          className="text-xl bg-transparent border-none ml-auto"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
