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
  reviews: [ReviewCompanies];
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
interface ReviewCompanies {
  username: string;
  comment: string;
  rating: number;
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
      reviews: gameData.reviews || [
        {
          username: "",
          comment: "",
          rating: 0,
        },
      ],
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
              reviews,
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
                  <h3 className="text-fiveColor text-2xl font-medium  ">
                    {title}
                  </h3>

                  <h2 className="text-fiveColor text-lg font-medium">
                    Publisher :{" "}
                    <span className="text-eightColor">{publisher}</span>
                  </h2>

                  <p className="text-fiveColor text-lg">
                    Release date :{" "}
                    <span className="text-eightColor">{release}</span>
                  </p>
                  <p className="text-fiveColor mb-2">Categories :</p>
                  <p className="hidden md:block font-extralight text-eightColor text-sm mb-2">
                    Tags :{" "}
                    {tags
                      .slice(0, 3)
                      .map((tag) => `${tag} `)
                      .join(" • ")}
                  </p>

                  <hr />
                  <div className="flex justify-between py-4">
                    <p className="font-medium text-lg text-forthColor pl-2 py-2 w-1/3">
                      €{price}
                    </p>
                    <button
                      onClick={() =>
                        handleAddToCart({ id, title, image, price })
                      }
                      className="flex font-medium text-lg justify-center text-forthColor bg-eightColor rounded-2xl py-2 w-2/3"
                    >
                      Buy
                    </button>
                  </div>
                  <hr className="py-2" />
                  <div className="pb-4">
                    <p className="text-fiveColor text-xl text-bold text-center">
                      Reviewers
                    </p>
                    {reviews.map((review, index) => (
                      <div
                        key={index}
                        className="bg-forthColor bg-opacity-10 rounded-md mt-6"
                      >
                        <h2 className="text-eightColor text-2xl font-bold text-center pt-2">
                          {review.username}
                        </h2>
                        <h3 className="text-xl text-center font-semibold py-2 ">
                          {review.rating}
                        </h3>
                        <p className="text-eightColor text-justify text-sm px-4 pb-4">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                  <hr className="py-2" />
                  <p className="text-fiveColor text-2xl font-bold text-center py-2">
                    Description
                  </p>
                  <p className="text-tenColor text-justify text-base/6 mb-4">
                    {description}
                  </p>

                  <p className="text-fiveColor text-xl text-bold pb-2">
                    Did you know ?
                  </p>
                  {aboutGame.map((about, index) => (
                    <p
                      key={index}
                      className="text-tenColor text-justify text-base/6 mb-4"
                    >
                      {about}{" "}
                    </p>
                  ))}
                  <hr className="py-2" />
                  <div className="flex justify-between items-center">
                    <div className="text-tenColor text-sm">
                      <p className="text-fiveColor text-xl text-bold pb-2">
                        Features
                      </p>
                      <ul className="pt-2 pb-4">
                        {features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2 pb-2"
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
                    <h2 className="text-fiveColor text-2xl font-bold mb-2">
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
