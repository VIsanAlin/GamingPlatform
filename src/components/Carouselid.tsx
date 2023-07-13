import React, { useState, useEffect, useRef } from "react";

const CarouselID = ({ images }: { images: string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageCount = images.length;
  const touchStartXRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageCount - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    console.log(images);
    return () => clearInterval(interval);
  }, [images, imageCount]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDistance = touchEndX - touchStartXRef.current;

    if (touchDistance > 50) {
      goToPrevSlide();
    } else if (touchDistance < -50) {
      goToNextSlide();
    }
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
  };

  const goToPrevSlide = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imageCount) % imageCount
    );
  };

  const renderLines = () => {
    const lines = [];
    for (let i = 0; i < imageCount; i++) {
      const lineClassName =
        i === currentImageIndex ? "bg-eightColor" : "bg-forthColor";
      lines.push(
        <div
          key={i}
          className={`h-2 w-[15%] rounded-md absolute bottom-0 left-[20%] ${lineClassName}`}
          style={{ marginLeft: `${i * 20}%` }}
        ></div>
      );
    }
    return lines;
  };

  return (
    <div className="relative mt-4 z-0 justify-between pb-4">
      <div
        className="carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative block z-0 w-full lg:w-[85%] mx-auto">
          <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex}`}
            className="rounded-xl lg:rounded-l-3xl "
          />
          <div className="flex ">{renderLines()}</div>
        </div>
      </div>
    </div>
  );
};

export default CarouselID;
