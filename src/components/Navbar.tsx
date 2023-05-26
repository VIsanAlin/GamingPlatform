"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function Logo() {
  const logoImage = "/game-controller.png";
  return (
    <Link className="flex space-x-2 mx-2" href="/">
      <Image src={logoImage} width={30} height={30} alt="logoImg" />
      <p className="text-eightColor">Gaming platform </p>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-secondColor">
      <div className="flex justify-between">
        <div className="flex ">
          <Logo />
          <div className="hidden md:flex space-x-2 ">
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
        <div className="block md:hidden">
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button className="flex items-center space-x-1 text-eightColor focus:outline-none">
                  <span>Menu</span>
                  <ChevronDownIcon
                    className={`${open ? "transform rotate-180" : ""} w-5 h-5`}
                  />
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
                    className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg outline-none"
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
    </nav>
  );
}
