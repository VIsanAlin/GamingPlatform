"use client";
import { usePathname } from "next/navigation";
import * as Realm from "realm-web";
import { useState, useEffect } from "react";

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
  description: string;
  publisher: string;
  category: string;
  aboutGame: string[];
  features: string[];
  systemRequirements: SystemReq;
  release: string;
}
interface SystemReq {
  OS: string;
  Processor: string;
  Memory: string;
  Graphics: string;
  DirectX: string;
  Storage: string;
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
      systemRequirements: gameData.systemRequirements || {
        OS: "",
        Processor: "",
        Memory: "",
        Graphics: "",
        DirectX: "",
        Storage: "",
      },
    };
    const newCart = [...cartItems, game];
    sessionStorage.setItem("cart", JSON.stringify(newCart));

    window.dispatchEvent(new Event("storage"));
  };

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
              publisher,
              category,
              aboutGame,
              features,
              systemRequirements,
              release,
              price,
              tags,
            }) => (
              <div key={id} className="rounded-lg shadow-2xl shadow-fiveColor">
                <div className=" overflow-hidden rounded-2xl">
                  <img
                    src={image}
                    alt={title}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2 py-2">{title}</h3>
                  <p className="text-eightColor text-sm mb-4">{category}</p>
                  <h2>{publisher}</h2>
                  <hr className="py-2" />
                  <div className="flex flex-col space-x-4">
                    <p className="mb-2">Release date:{release}</p>
                    <p className="font-extralight text-eightColor text-sm mb-2">
                      {tags.map((tag) => `${tag} `)}
                    </p>
                  </div>
                  <hr className="py-2" />
                  <div className="flex justify-between">
                    <button
                      onClick={() =>
                        handleAddToCart({ id, title, image, price })
                      }
                      className="flex font-medium text-lg md:text-forthColor md:bg-eightColor md:rounded-lg py-2"
                    >
                      Buy Right Now At
                      <p className="font-medium text-lg md:text-forthColor pl-2">
                        €{price}
                      </p>
                    </button>
                  </div>
                  <hr className="py-2" />
                  <p>Small Description</p>
                  <p className="text-tenColor mb-4">{description}</p>
                  <hr className="py-2" />
                  {aboutGame.map((about, index) => (
                    <li key={index} className="mr-2">
                      {about}{" "}
                    </li>
                  ))}
                  <hr className="py-2" />
                  <div className="flex justify-between items-center">
                    <div className="text-gray-600 text-sm">
                      <p className="font-medium">Features</p>
                      <ul className="mt-2 mb-2">
                        {features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 4.586l-4.879 4.88a1 1 0 101.414 1.414L9 7.414l4.879 4.88a1 1 0 101.414-1.414L10.414 6l4.88-4.879a1 1 0 10-1.414-1.414L9 4.586z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <hr className="py-2" />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      System Requirements
                    </h2>
                    <div className="space-y-2">
                      <p>
                        <span className="font-bold">OS:</span>{" "}
                        {systemRequirements.OS}
                      </p>
                      <p>
                        <span className="font-bold">Processor:</span>{" "}
                        {systemRequirements.Processor}
                      </p>
                      <p>
                        <span className="font-bold">Memory:</span>{" "}
                        {systemRequirements.Memory}
                      </p>
                      <p>
                        <span className="font-bold">Graphics:</span>{" "}
                        {systemRequirements.Graphics}
                      </p>
                      <p>
                        <span className="font-bold">Storage:</span>{" "}
                        {systemRequirements.Storage}
                      </p>
                      <p>
                        <span className="font-bold">DirectX:</span>{" "}
                        {systemRequirements.DirectX}
                      </p>
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
