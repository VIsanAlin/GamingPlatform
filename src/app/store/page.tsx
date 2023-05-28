"use client";
import React, { useState, useEffect, cache } from "react";
import * as Realm from "realm-web";
import Link from "next/link";
import Carousel from "../../components/Carousel";

interface Game {
  id: string;
  title: string;
  image: string;
  price: number;
  tags: string[];
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
        game.tags.includes("Shooter")
    );
    setFilteredGames(filtered);
  }, [games]);

  // Load More Games
  const [visibleGames, setVisibleGames] = useState(12);

  function loadMore() {
    setVisibleGames((prev) => prev + 12);
  }

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

        <div>
          <Carousel images={images} />
        </div>

        {/* Separate divs for Fantasy, RPG, and Shooter */}
        <div className="py-4 ">
          <h2 className="text-2xl pb-3">Popular Games</h2>
          <hr className="border-[#5A189A]" />
          <div className="flex flex-col md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:gap-6 md:py-12 md:px-8 ">
            {filteredGames
              .filter((game) => game.tags.includes("Fantasy"))
              .slice(0, visibleGames)
              .map(({ title, image, price, tags, id }) => (
                <Link
                  href="/games/item=[id]"
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex shadow-md shadow-forthColor md:border md:rounded-md md:shadow-sm overflow-hidden productItem my-2"
                >
                  <div className="h-16 basis-28 px-2 py-2 self-center">
                    <img src={image} alt={image} className="object-cover  " />
                  </div>
                  <div className="md:flex md:justify-between px-2 py-2">
                    <div>
                      <h3 className="font-medium md:text-lg md:font-medium">
                        {title}
                      </h3>
                      <p className="font-extralight text-sm">
                        {tags.map((tag) => `${tag} `)}
                      </p>
                    </div>
                    <div>
                      <p className="font-light text-lg text-eightColor">
                        €{price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="py-4 ">
          <h2 className="text-2xl pb-4">RPG Games:</h2>
          <hr className="border-[#5A189A]" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 py-12 px-8">
            {filteredGames
              .filter((game) => game.tags.includes("RPG"))
              .map(({ title, image, price, tags, id }) => (
                <Link
                  href="/games/item=[id]"
                  as={`/games/item=${id}`}
                  key={id}
                  className="border rounded-md shadow-sm overflow-hidden productItem"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="object-fill h-full w-full"
                    />
                  </div>
                  <div className="md:flex md:justify-between h-30 px-2 py-2">
                    <div>
                      <h3 className="text-lg font-medium mt-2 mb-1">{title}</h3>
                      <p className="max-sm:hidden text-sm mb-2">
                        {tags.map((tag) => `[${tag}] `)}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">{price}€</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl pb-4">Shooter Games:</h2>
          <hr className="border-[#5A189A]" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 py-12 px-8">
            {filteredGames
              .filter((game) => game.tags.includes("Shooter"))
              .map(({ title, image, price, tags, id }) => (
                <Link
                  href="/games/item=[id]"
                  as={`/games/item=${id}`}
                  key={id}
                  className="border rounded-md shadow-sm overflow-hidden productItem"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="object-fill h-full w-full"
                    />
                  </div>
                  <div className="md:flex md:justify-between h-30 px-2 py-2">
                    <div>
                      <h3 className="text-lg font-medium mt-2 mb-1">{title}</h3>
                      <p className="max-sm:hidden text-sm mb-2">
                        {tags.map((tag) => `[${tag}] `)}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">{price}€</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
