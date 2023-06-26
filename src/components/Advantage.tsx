"use client";
import { useEffect } from "react";

export default function Advantages() {
  useEffect(() => {
    const observer = new IntersectionObserver((e) => {
      e.forEach((entry) => {
        // console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });
    const hiddenElements = document.querySelectorAll(".hid");
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <section className="advantages">
      <div className="advantagesTitle">
        <h1>GP Advantages</h1>
      </div>
      <div className="advantagesLayout">
        <div className="advantagesBox hid">
          <h2 className="text-thirdColor text-3xl mt-2">
            Hassle-Free Refund Policy
          </h2>
          <p className="text-eightColor text-xl mt-2">
            We understand that not every game is a perfect fit. That's why
            PixelPulse offers a hassle-free refund policy, ensuring your
            satisfaction with your gaming purchases. For more information check
            our refund policy.
          </p>
        </div>
        <div className="advantagesBox hid">
          <h2 className="text-thirdColor text-3xl mt-2">Exclusive Discounts</h2>
          <p className="text-eightColor text-xl mt-2 ">
            At PixelPulse, we believe in making gaming affordable. Take
            advantage of our exclusive discounts and special offers, allowing
            you to get more games for your buck.
          </p>
        </div>
        <div className="advantagesBox hid">
          <h2 className="text-thirdColor text-3xl mt-2">Multi-Platform Keys</h2>
          <p className="text-eightColor text-xl ">
            Whether you're a PC gamer, PlayStation enthusiast, Xbox aficionado,
            or Nintendo fan, PixelPulse has you covered. Discover a vast
            selection of game keys across multiple platforms, allowing you to
            enjoy your favorite games on your preferred device.
          </p>
        </div>
        <div className="advantagesBox hid">
          <h2 className="text-thirdColor text-3xl mt-2">
            Diverse Gaming Selection
          </h2>
          <p className="text-eightColor text-xl ">
            PixelPulse prides itself on curating a diverse gaming selection.
            From action-packed adventures to immersive RPGs, we have games for
            every gaming taste and preference.
          </p>
        </div>
      </div>
    </section>
  );
}
