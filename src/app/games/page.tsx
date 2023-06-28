"use client";
import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
import Link from "next/link";

interface Game {
  id: string;
  title: string;
  image: string;
  price: number;
  tags: string[];
}

export default function Products() {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      const REALM_APP_ID = "games-oodpu";
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const allGames = await user.functions.getAllGames();
        setGames(allGames);
        console.log(allGames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, []);

  // Load More Games
  const [visibleGames, setVisibleGames] = useState(12);

  function loadMore() {
    setVisibleGames((prev) => prev + 12);
  }
  ////////////////////////////////

  return (
    <div className="bg-firstColor">
      <div></div>
      <div className="lg:px-40 md:px-32 md:py-24 px-10 py-10">
        <div className="text-4xl pb-8">
          <h2 className="text-2xl md:text-4xl text-[#e6bbff]">
            Unlock Your Gaming Adventure with Unbeatable Prices!
          </h2>
        </div>
        <hr className="border-[#5A189A]" />

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:py-12 md:px-8">
          {games &&
            games
              .slice(0, visibleGames)
              .map(({ title, image, price, tags, id }) => (
                <Link
                  href={`/games/item=${id}`}
                  as={`/games/item=${id}`}
                  key={id}
                  passHref
                  className="flex shadow-md shadow-forthColor md:grid md:bg-forthColor md:rounded-lg md:shadow-sm overflow-hidden productItem my-2 "
                >
                  <div className="h-16 basis-28 px-2 py-2 self-center md:h-48 md:w-auto  md:overflow-hidden">
                    <img src={image} alt={title} className="object-cover " />
                  </div>
                  <div className="md:flex md:justify-between px-2 py-2">
                    <div>
                      <h3 className="md:text-lg font-medium ">{title}</h3>
                      <p className="font-extralight text-sm ">
                        {tags.map((tag) => `${tag}  `)}
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

        {visibleGames < games.length && (
          <button
            onClick={loadMore}
            className="loadMoreButton bg-forthColor w-full text-white font-semibold py-2 px-4 rounded mt-4"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
