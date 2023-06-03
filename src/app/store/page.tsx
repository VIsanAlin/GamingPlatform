"use client";
import React, { useState, useEffect, cache } from "react";
import * as Realm from "realm-web";
import Link from "next/link";
import Image from "next/image";
import Carousel from "../../components/Carousel";
import Cart from "../../../public/nav/shopping_cart_black_24dp.svg";

interface Game {
  id: string;
  title: string;
  image: string;
  price: number;
  tags: string[];
  sale?: {
    price: string;
    start: string;
    end: string;
  };
  aboutGame: string[];
  category: string;
  description: string;
  features: string[];
  publisher: string;
  release: string;
}

export default function Store() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const images: string[] = [
    "https://i.ibb.co/hmzGvYH/cyberpunk2077.jpg",
    "https://i.postimg.cc/2jPC6tg7/Blood-Borne.png",
    "https://i.postimg.cc/brbckz4H/strayv2.jpg",
    "https://i.postimg.cc/L5gQwNTH/Breath-Of-The-Wild.jpg",
  ];

  const getAllGames = cache(async () => {
    const REALM_APP_ID = "games-oodpu";
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allGames = await user.functions.getAllGames();
      return allGames;
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  useEffect(() => {
    const fetchGames = async () => {
      const allGames = await getAllGames();
      setGames(allGames);
      console.log(allGames);
    };

    fetchGames();
  }, []);

  useEffect(() => {
    // Filter games based on selected tags
    const filtered = games.filter(
      (game) =>
        game.tags.includes("Fantasy") ||
        game.tags.includes("RPG") ||
        game.tags.includes("Shooter") ||
        (game.sale && game.sale.price !== null)
    );
    setFilteredGames(filtered);
  }, [games]);

  // Load More Games
  const [visibleGames, setVisibleGames] = useState(12);

  function loadMore() {
    setVisibleGames((prev) => prev + 12);
  }

  ////////////////////////////////

  const handleAddToCart = (gameData: Partial<Game>) => {
    const cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const game: Game = {
      id: gameData.id || "",
      title: gameData.title || "",
      image: gameData.image || "",
      price: gameData.price || 0,
      tags: gameData.tags || [],
      sale: gameData.sale || undefined,
      aboutGame: gameData.aboutGame || [],
      category: gameData.category || "",
      description: gameData.description || "",
      features: gameData.features || [],
      publisher: gameData.publisher || "",
      release: gameData.release || "",
    };
    const newCart = [...cartItems, game];
    sessionStorage.setItem("cart", JSON.stringify(newCart));

    window.dispatchEvent(new Event("storage"));
  };

  ////////////////////////////////

  return (
    <div className="bg-firstColor">
      <div className="lg:px-40 md:px-12 md:py-14 px-6 py-10">
        <div className="text-4xl pb-6">
          <h2 className="text-xl font-extralight lg:text-4xl text-[#e6bbff]">
            Unlock Your Next Gaming Adventure!
          </h2>
        </div>
        <hr className="border-[#5A189A]" />

        <div className="pt-2">
          <Carousel images={images} />
        </div>

        {/* Separate divs for Fantasy, RPG, and Shooter */}
        <div className="py-4 ">
          <h2 className="text-2xl py-4">Popular Games</h2>
          <hr className="border-[#5A189A] " />
          <div className="flex flex-col md:grid md:grid-cols-2 2xl:grid-cols-4 md:gap-6 md:py-12 md:px-8 ">
            {filteredGames
              .filter((game) => game.tags.includes("Fantasy"))
              .slice(0, visibleGames)
              .map(({ title, image, price, tags, id }) => (
                <Link
                  href="/games/item=[id]"
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex shadow-md shadow-forthColor md:grid md:bg-forthColor md:rounded-xl md:shadow-sm overflow-hidden productItem my-2"
                  onClick={(event) => {
                    if (
                      (event.target as Element).tagName.toLowerCase() ===
                      "button"
                    ) {
                      console.log("A button was clicked");
                      event.preventDefault();
                    } else {
                      // Manually navigate to the game page
                      console.log("not a button pushed");
                    }
                  }}
                >
                  <div className="h-16 basis-28 px-2 py-2 self-center md:h-48 md:overflow-hidden md:px-0 md:py-0">
                    <img
                      src={image}
                      alt={image}
                      className="object-cover md:object-fill md:h-full md:w-full "
                    />
                  </div>
                  <div className="md:grid-cols-2 md:justify-between md:h-30 px-2 py-2">
                    <div>
                      <h3 className="font-medium md:text-lg md:mt-2 md:mb-1">
                        {title}
                      </h3>
                      <p className="font-extralight text-sm md:mb-2">
                        {tags
                          .slice(0, 2)
                          .map((tag) => `${tag} `)
                          .join(" • ")}
                      </p>
                    </div>

                    <div className="flex md:justify-end ">
                      <button
                        onClick={() =>
                          handleAddToCart({ id, title, image, price })
                        }
                        className="flex font-medium text-lg md:text-forthColor md:bg-eightColor md:rounded-lg py-2"
                      >
                        Add To Cart
                        <p className="font-medium text-lg md:text-forthColor pl-2">
                          €{price}
                        </p>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="py-4">
          <h2 className="text-2xl pb-4">RPG Games:</h2>
          <hr className="border-[#5A189A]" />
          <div className="flex flex-col md:grid md:grid-cols-2  2xl:grid-cols-4 md:gap-6 md:py-12 md:px-8">
            {filteredGames
              .filter((game) => game.tags.includes("RPG"))
              .map(({ title, image, price, tags, id }) => (
                <Link
                  href="/games/item=[id]"
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex shadow-md shadow-forthColor md:grid md:bg-forthColor md:rounded-xl md:shadow-sm overflow-hidden productItem my-2"
                >
                  <div className="h-16 basis-28 px-2 py-2 self-center md:h-48 md:overflow-hidden md:px-0 md:py-0">
                    <img
                      src={image}
                      alt={title}
                      className="object-cover md:object-fill md:h-full md:w-full"
                    />
                  </div>
                  <div className="md:grid-cols-2 md:justify-between h-30 px-2 py-2">
                    <div>
                      <h3 className="text-lg font-medium mt-2 mb-1">{title}</h3>
                      <p className="font-extralight text-sm mb-2">
                        {tags
                          .slice(0, 2)
                          .map((tag) => `${tag}`)
                          .join(" • ")}
                      </p>
                    </div>
                    <div className="flex md:justify-end">
                      <button
                        onClick={() =>
                          handleAddToCart({ id, title, image, price })
                        }
                        className="flex font-medium text-lg text-tenColor"
                      >
                        Add To Cart{" "}
                        <p className="font-medium text-lg text-tenColor pl-4">
                          €{price}
                        </p>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl py-4">Shooter Games:</h2>
          <hr className="border-[#5A189A]" />
          <div className="flex flex-col md:grid md:grid-cols-2  2xl:grid-cols-4 md:gap-6 md:py-12 md:px-8">
            {filteredGames
              .filter((game) => game.tags.includes("Shooter"))
              .map(({ title, image, price, tags, id }) => (
                <Link
                  href="/games/item=[id]"
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex shadow-md shadow-forthColor md:grid md:bg-forthColor md:rounded-xl md:shadow-sm overflow-hidden productItem my-2"
                  onClick={(event) => {
                    if ((event.target as Element).tagName === "button") {
                      event.preventDefault();
                    }
                  }}
                >
                  <div className="h-16 basis-28 px-2 py-2 self-center md:h-48 md:overflow-hidden md:px-0 md:py-0">
                    <img
                      src={image}
                      alt={title}
                      className="object-cover md:object-fill md:h-full md:w-full"
                    />
                  </div>
                  <div className="md:grid-cols-2 md:justify-between md:h-30 px-2 py-2">
                    <div>
                      <h3 className="font-medium md:text-lg md:mt-2 md:mb-1">
                        {title}
                      </h3>
                      <p className="font-extralight text-sm mb-2">
                        {tags
                          .slice(0, 2)
                          .map((tag) => `${tag}`)
                          .join(" • ")}
                      </p>
                    </div>
                    <div className="flex md:justify-end">
                      <button
                        onClick={() =>
                          handleAddToCart({ id, title, image, price })
                        }
                        className="flex font-medium text-lg text-tenColor"
                      >
                        Add To Cart{" "}
                        <p className="font-medium text-lg text-tenColor pl-4 ">
                          €{price}
                        </p>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl py-4">Sales</h2>
          <hr className="border-[#5A189A]" />
          <div className="flex flex-col md:grid md:grid-cols-2  2xl:grid-cols-4 md:gap-6 md:py-12 md:px-8">
            {filteredGames
              .filter(
                (game) =>
                  game.sale &&
                  game.sale.price !== null &&
                  game.sale.price !== "Free"
              )
              .map(({ title, image, sale, tags, id }) => (
                <Link
                  href="/games/item=[id]"
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex shadow-md shadow-forthColor md:grid md:bg-forthColor md:rounded-xl md:shadow-sm overflow-hidden productItem my-2"
                >
                  <div className="h-16 basis-28 px-2 py-2 self-center md:h-48 md:overflow-hidden md:px-0 md:py-0">
                    <img
                      src={image}
                      alt={title}
                      className="object-cover md:object-fill md:h-full md:w-full"
                    />
                  </div>
                  <div className="md:grid-cols-2 md:justify-between md:h-30 px-2 py-2">
                    <div>
                      <h3 className="font-medium md:text-lg md:mt-2 md:mb-1">
                        {title}
                      </h3>
                      <p className="font-extralight text-sm mb-2">
                        {tags
                          .slice(0, 2)
                          .map((tag) => `${tag} `)
                          .join(" • ")}
                      </p>
                    </div>

                    <div className="flex md:justify-end">
                      <button
                        onClick={() =>
                          handleAddToCart({ id, title, image, sale })
                        }
                        className="flex font-medium text-lg text-tenColor"
                      >
                        Add To Cart{" "}
                        {sale && sale.price !== undefined ? (
                          <p className="font-light text-lg text-green-700 pl-4">
                            €{sale.price}
                          </p>
                        ) : null}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="py-4">
          <h2 className="text-2xl pb-4">Categories</h2>
          <hr className="border-[#5A189A] mb-4" />
          <div className="flex flex-col md:grid md:grid-cols-2 2lg:grid-cols-4 md:gap-6 md:py-12 md:px-8">
            <Link
              href="/games"
              as={`/games`}
              key={1}
              className="px-6 py-6 border rounded-xl self-center text-center"
            >
              {" "}
              <h2>Action Games</h2>{" "}
            </Link>
            <Link
              href="/games"
              as={`/games`}
              key={2}
              className="px-6 py-6 border rounded-xl self-center text-center"
            >
              {" "}
              <h2>RPG Games</h2>{" "}
            </Link>
            <Link
              href="/games"
              as={`/games`}
              key={3}
              className="px-6 py-6 border rounded-xl self-center text-center"
            >
              {" "}
              <h2>Fantasy Games</h2>{" "}
            </Link>
            <Link
              href="/games"
              as={`/games`}
              key={4}
              className="px-6 py-6 border rounded-xl self-center text-center"
            >
              {" "}
              <h2>Shooter Games</h2>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
