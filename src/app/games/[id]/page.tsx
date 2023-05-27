"use client";
import { usePathname } from "next/navigation";
import * as Realm from "realm-web";
import { useState, useEffect } from "react";

interface Game {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  tags: string[];
}

export default function GameDetails() {
  const path = usePathname();
  const id = path.split("/games/item=")[1];
  const [game, setGame] = useState<Game[]>([]);

  const fetchGame = async (id: string) => {
    const REALM_APP_ID = "games-oodpu";
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const gameData = await user.functions.getAGame(id);
      setGame(gameData);
      console.log(gameData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchGame(id as string);
    }
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-firstColor">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 py-12 px-8">
        {game &&
          game.map(({ title, image, price, tags, description, id }) => (
            <div key={id}>
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
                  <p>{description}</p>

                  <p className="max-sm:hidden text-sm mb-2">
                    {tags.map((tag) => `[${tag}] `)}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-lg">{price}€</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
