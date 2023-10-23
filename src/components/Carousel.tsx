import React, { useState } from "react";
import Link from "next/link";
import {
  BsSteam,
  BsPlaystation,
  BsXbox,
  BsNintendoSwitch,
} from "react-icons/bs";

interface CarouselProps {
  images: string[];
  title: string[];
  description: string[];
  price: string[];
  id: string[];
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  title,
  description,
  price,
  id,
}) => {
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
    <div className="relative mt-4 pb-4 z-0 justify-between px-12">
      <Link
        href={`/games/item=${id[currentIndex]}`}
        className="flex relative  mt-2 z-0 "
      >
        <div className="relative block z-0 lg:w-[70%]">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="rounded-xl lg:rounded-l-3xl lg:rounded-r-none"
          />
        </div>
        <div
          className="hidden lg:flex lg:flex-col justify-between pl-4 pr-4 ml-4 bg-forthColor rounded-r-3xl"
          style={{ maxWidth: "30%" }}
        >
          <div className="">
            <h2 className="text-xl font-bold py-4">{title[currentIndex]}</h2>
            <p className="hidden lg:block text-sm mb-4">
              {description[currentIndex]}
            </p>
          </div>
          <div>
            <p className="font-light mb-2">{price[currentIndex]}</p>
            <div className="flex space-x-4 pb-6">
              <button>Available right now</button>
              <BsSteam /> <BsPlaystation /> <BsXbox />
              <BsNintendoSwitch />
            </div>
          </div>
        </div>
      </Link>
      <div className="flex absolute top-[30%] lg:top-[40%] left-12 right-12 translate-y-1/2 justify-between">
        <button
          className=" bg-transparent border-none mr-auto text-3xl"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          &lt;
        </button>
        <button
          className=" bg-transparent border-none ml-auto text-3xl"
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
