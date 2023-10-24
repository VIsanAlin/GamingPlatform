import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface CarouselProps {
  images: string[];
  title: string[];
  description: string[];
  price: string[];
  id: string[];
}

const Carousel = ({ images, title, description, price, id }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageCount = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageCount]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageCount) % imageCount);
  };

  const renderLines = () => {
    const lines = [];
    for (let i = 0; i < imageCount; i++) {
      const lineClassName =
        i === currentIndex ? "bg-eightColor" : "bg-forthColor";
      lines.push(
        <div
          key={i}
          className={`h-2 w-[8%] rounded-md absolute bottom-0 left-[8%] ${lineClassName}`}
          style={{ marginLeft: `${i * 15}%`, bottom: "5px" }}
        ></div>
      );
    }
    return lines;
  };

  return (
    <div className="relative mt-4 pb-4 z-0 justify-between px-12">
      <Link
        href={`/games/item=${id[currentIndex]}`}
        className="flex relative mt-2 z-0"
      >
        <div className="relative block z-0 lg:w-[70%]">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="rounded-xl lg:rounded-l-3xl lg:rounded-r-none"
            style={{ height: "100%" }}
          />
        </div>
        <div
          className="hidden lg:flex lg:flex-col justify-between pl-4 pr-4 ml-4 bg-forthColor rounded-r-3xl"
          style={{ maxWidth: "30%" }}
        >
          <div className="flex flex-col h-full">
            <div className="">
              <h2 className="text-xl font-bold py-4">{title[currentIndex]}</h2>
              <p className="hidden lg:block text-sm mb-4 lg:max-h-fit xl:max-h-full">
                {description[currentIndex]}
              </p>
            </div>
            <div>
              <p className="font-light mb-2">€{price[currentIndex]}</p>
            </div>
          </div>
        </div>
        <div className="flex ">{renderLines()}</div>
      </Link>
      <div className="flex absolute top-[30%] lg:top-[40%] left-12 right-12 translate-y-1/2 justify-between">
        <button
          className="bg-transparent border-none mr-auto text-3xl"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          &lt;
        </button>
        <button
          className="bg-transparent border-none ml-auto text-3xl"
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
