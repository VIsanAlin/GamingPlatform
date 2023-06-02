"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import menublack from "../../public/nav/menu_black_24dp.svg";

import Cart from "./Cart";

function Logo() {
  const logoImage = "/game-controller.png";
  return (
    <Link className="flex space-x-2 mx-2 pl-4 " href="/">
      <Image
        src={logoImage}
        width={60}
        height={30}
        alt="logoImg"
        loading="lazy"
      />
      <p className=" text-eightColor pl-4 pt-4">PixelPulse</p>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-firstColor sticky top-0 z-10">
      <div className="flex justify-between py-2">
        <div className="flex ">
          <Logo />
          <div className="hidden md:flex space-x-4 pl-4 pt-4">
            <Link href="store" className="text-eightColor">
              Store
            </Link>
            <Link href="games" className="text-eightColor">
              {" "}
              Games{" "}
            </Link>
            <Link href="help" className="text-eightColor">
              Help
            </Link>
            <Link href="contact" className="text-eightColor">
              {" "}
              Contact
            </Link>
          </div>
        </div>
        <div className="flex py-2 px-2 pr-4">
          <Cart />
          <div className="block md:hidden">
            <Menu>
              {({ open }) => (
                <>
                  <Menu.Button className="flex items-center space-x-1 text-eightColor focus:outline-none">
                    <Image src={menublack} alt="menu" className="py-2" />
                  </Menu.Button>

                  <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10"
                    >
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="store"
                              className={`${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-900"
                              } flex items-center px-4 py-2 text-sm`}
                            >
                              Store
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="games"
                              className={`${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-900"
                              } flex items-center px-4 py-2 text-sm`}
                            >
                              Games
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="help"
                              className={`${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-900"
                              } flex items-center px-4 py-2 text-sm`}
                            >
                              Help
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="contact"
                              className={`${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-900"
                              } flex items-center px-4 py-2 text-sm`}
                            >
                              Contact
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
