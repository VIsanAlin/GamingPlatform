import React, { ReactNode } from "react";
import Image from "next/image";
import Advantage from "../components/Advantage";
import {
  BsSteam,
  BsXbox,
  BsPlaystation,
  BsNintendoSwitch,
} from "react-icons/bs";

type HeadBarIconProps = {
  icon: ReactNode;
};

const HeadBarIcon = ({ icon }: HeadBarIconProps) => (
  <div className="sidebar-icon">{icon}</div>
);

export default function Home() {
  return (
    <div className="bg-firstColor">
      <img src="/home/3.jpg" alt="Hero Image" className="heroAdvImg" />
      {/* Hero Section */}
      <section className="hero">
        {/* Left Text*/}
        <div className="heroText">
          <h1 className="text-forthColor max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
            Best Gaming Store
          </h1>
          <p className="text-eightColor max-w-sm text-justify md:text-left ">
            Welcome to PixelPulse, your ultimate gaming store destination! We
            offer a wide range of gaming products, from the latest releases to
            timeless classics. Immerse yourself in the world of gaming with
            PixelPulse and enjoy a seamless shopping experience that caters to
            all your gaming needs.
          </p>
        </div>
        {/* Right Image*/}
        <div className="md:w-1/2">
          <img src="home/2.jpg" alt="HeroImage" className="heroImage" />
        </div>
      </section>

      {/* Advantages  Section*/}
      <Advantage />

      {/* Platforms Sections*/}
      <section id="platforms" className="platforms">
        <div className="advantagesTitle">
          <h1>Collab</h1>
        </div>
        <div className="platformsLayout">
          <div className="platformsBox">
            <h2 className="text-thirdColor text-2xl flex flex-row mt-4 justify-center space-x-2">
              <HeadBarIcon
                icon={<BsSteam size="30" className="text-eightColor" />}
              />{" "}
              <p>PC</p>
            </h2>
            <p className="text-eightColor text-md text-justify px-4 py-4">
              Unlock the ultimate gaming experience on your PC with our
              extensive collection of PC game keys. Dive into high-quality
              graphics, customizable settings, and a vast library of titles.
            </p>
          </div>
          <div className="platformsBox">
            <h2 className="text-thirdColor text-2xl flex flex-row  mt-4 justify-center space-x-2">
              <HeadBarIcon
                icon={<BsXbox size="30" className="text-eightColor" />}
              />{" "}
              <p>XBOX</p>
            </h2>
            <p className="text-eightColor text-md text-justify px-4 py-4">
              Get your game on with Xbox! Browse through our selection of Xbox
              game keys and embrace the world of online multiplayer, dynamic
              gaming communities, and unmatched entertainment.
            </p>
          </div>
          <div className="platformsBox">
            <h2 className="text-thirdColor text-2xl flex flex-row  mt-4 justify-center space-x-2">
              <HeadBarIcon
                icon={<BsPlaystation size="30" className="text-eightColor" />}
              />{" "}
              <p>PlayStation</p>
            </h2>
            <p className="text-eightColor text-md text-justify px-4 py-4">
              Level up your gaming on PlayStation! Explore our range of
              PlayStation game keys and discover captivating stories, stunning
              visuals, and exhilarating gameplay exclusive to this platform.
            </p>
          </div>
          <div className="platformsBox">
            <h2 className="text-thirdColor text-2xl flex flex-row mt-4 justify-center space-x-2">
              <HeadBarIcon
                icon={
                  <BsNintendoSwitch size="30" className="text-eightColor" />
                }
              />
              <p>Nintendo</p>
            </h2>
            <p className="text-eightColor text-md text-justify px-4 py-4">
              Experience the magic of Nintendo gaming! Choose from our Nintendo
              game keys and embark on unforgettable adventures with beloved
              characters, innovative gameplay, and family-friendly fun.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile app Section*/}
      <section id="mobileApp" className="mobileApp">
        <div className="layoutMobileApp">
          <div className="mobileAppSectionFirst">
            <div className="textMobileApp ">
              <h1 className="text-forthColor max-w-md text-4xl font-bold text-center md:text-5xl md:text-left pt-6">
                On your way back home ?
              </h1>
              <p className="text-eightColor max-w-sm text-center md:text-left pt-6">
                Stay connected with gaming on the go with the PixelPulse mobile
                app. Our app provides you with a seamless shopping experience,
                exclusive app-only deals, instant notifications about new
                releases and promotions, and the ability to manage your gaming
                library right from your fingertips.
              </p>
            </div>
            <div className="flex items-center mx-auto">
              <img src="/home/5v4.jpg" alt="" className="mobileImage" />
            </div>
          </div>
          <div className="mobileAppSectionSecond">
            <div className="flex items-center mx-auto">
              <img src="/home/5v2.jpg" alt="" className="mobileImage" />
            </div>
            <div className="textMobileApp flex flex-col flex-wrap content-end">
              <h1 className="text-forthColor max-w-md text-4xl font-bold text-center md:text-5xl md:text-right pt-6">
                Get notified everywhere you are
              </h1>
              <p className="text-eightColor max-w-md text-center md:text-right pt-6">
                Download the PixelPulse app today and elevate your gaming
                experience to the next level.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
