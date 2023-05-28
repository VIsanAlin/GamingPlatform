"use client";
import { usePathname } from "next/navigation";
import * as Realm from "realm-web";
import { useState, useEffect } from "react";

interface Game {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  price: number;
  tags: string[];
  features: string[];
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
          game.map(
            ({
              id,
              image,
              title,
              description,
              category,
              price,
              tags,
              features,
            }) => (
              <div key={id} className="rounded-lg shadow-2xl shadow-fiveColor">
                <div className=" overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2 py-2">{title}</h3>
                  <hr className="py-2" />
                  <div className="flex flex-col space-x-4">
                    <p className="text-eightColor text-sm mb-4">{category}</p>
                    <p className="font-extralight text-eightColor text-sm mb-2">
                      {tags.map((tag) => `${tag} `)}
                    </p>
                  </div>
                  <hr className="py-2" />
                  <div className="flex justify-between">
                    <p>Buy Right Now At </p>
                    <button>
                      <p className="font-light text-lg text-eightColor text-end mb-2">
                        €{price}
                      </p>
                    </button>
                  </div>
                  <hr className="py-2" />
                  <p className="text-tenColor mb-4">{description}</p>
                  <hr className="py-2" />
                  <div className="flex justify-between items-center">
                    <div className="text-tenColor text-sm ">
                      <ul>
                        {features.map((feature, index) => (
                          <li key={index} className="mr-2">
                            [{feature}]
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
}
