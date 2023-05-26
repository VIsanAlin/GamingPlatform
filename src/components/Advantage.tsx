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
          <h2 className="text-thirdColor text-3xl mt-2">Refunds</h2>
          <p className="text-eightColor text-xl mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="advantagesBox hid">
          <h2 className="text-thirdColor text-3xl mt-2">Best discounts</h2>
          <p className="text-eightColor text-xl mt-2 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="advantagesBox hid">
          <h2 className="text-thirdColor text-3xl mt-2">Multi platforms</h2>
          <p className="text-eightColor text-xl ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="advantagesBox hid">
          <h2 className="text-thirdColor text-3xl mt-2">Broken Games</h2>
          <p className="text-eightColor text-xl ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  );
}
