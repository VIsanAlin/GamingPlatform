import React, { ReactNode } from "react";
import Image from "next/image";
import Advantage from "../components/Advantage";
import { BsSteam, BsXbox, BsPlaystation } from "react-icons/bs";

type HeaedBarIconProps = {
  icon: ReactNode;
};

const HeadBarIcon = ({ icon }: HeaedBarIconProps) => (
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
            Best Gaming Platform
          </h1>
          <p className="text-eightColor max-w-sm text-center md:text-left">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.{" "}
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
            <h2 className="text-thirdColor text-2xl flex flex-row py-2 justify-center">
              <HeadBarIcon
                icon={<BsSteam size="30" className="text-eightColor" />}
              />{" "}
              PC
            </h2>
            <p className="text-eightColor text-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="platformsBox">
            <h2 className="text-thirdColor text-2xl flex flex-row  py-2 justify-center">
              <HeadBarIcon
                icon={<BsXbox size="30" className="text-eightColor" />}
              />{" "}
              XBOX
            </h2>
            <p className="text-eightColor text-md ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="platformsBox">
            <h2 className="text-thirdColor text-2xl flex flex-row  py-2 justify-center">
              <HeadBarIcon
                icon={<BsPlaystation size="30" className="text-eightColor" />}
              />{" "}
              PlayStation
            </h2>
            <p className="text-eightColor text-md ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.{" "}
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
                {" "}
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
