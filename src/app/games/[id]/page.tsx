"use client";
import { usePathname } from "next/navigation";
import * as Realm from "realm-web";
import { useState, useEffect } from "react";
import Image from "next/image";
import featureIcon from "../../../../public/star.png";
import {
  BsSteam,
  BsPlaystation,
  BsXbox,
  BsNintendoSwitch,
} from "react-icons/bs";

interface Game {
  id: string;
  title: string;
  image: string;
  price: number;
  tags: string[];
  platforms: string[];
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

  function platformsIcon(platforms: string) {
    {
      switch (platforms) {
        case "PC":
          return <BsSteam />;
        case "Playstation":
          return <BsPlaystation />;
        case "Xbox":
          return <BsXbox />;
        case "Nintendo Switch":
          return <BsNintendoSwitch />;
        default:
          return null;
      }
    }
  }

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
      platforms: gameData.platforms || [],
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
      <div className="grid gap-6 py-12 px-8">
        {game &&
          game.map(
            ({
              id,
              image,
              title,
              description,
              reviews,
              publisher,
              platforms,
              category,
              aboutGame,
              features,
              systemRequirements,
              release,
              price,
              tags,
            }) => (
              <div
                key={id}
                className="grid rounded-lg shadow-2xl shadow-fiveColor"
              >
                <div className="lg:flex grid">
                  <div className=" overflow-hidden rounded-2xl">
                    <img
                      src={image}
                      alt={title}
                      className="object-cover h-full w-full"
                    />
                  </div>

                  <div className="p-4 pb-0">
                    <h3 className="flex items-center text-fiveColor text-2xl font-medium  ">
                      {title}
                      {platforms.map((platform) => (
                        <div className="px-1" key={platform}>
                          {platformsIcon(platform)}
                        </div>
                      ))}
                    </h3>
                    <h2 className="text-fiveColor text-lg font-medium">
                      Publisher :{" "}
                      <span className="text-eightColor">{publisher}</span>
                    </h2>
                    <p className="text-fiveColor text-lg">
                      Release date :{" "}
                      <span className="text-eightColor">{release}</span>
                    </p>
                    <p className="text-fiveColor mb-2">
                      Platforms {platformsIcon(platforms)}
                    </p>
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
                  </div>
                </div>
                <div className="lg:w-1/2 p-4 pt-0">
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
                            <Image
                              src={featureIcon}
                              width={25}
                              height={25}
                              alt="FeatureIcon"
                            />
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
                        <span className="text-fiveColor font-bold">OS:</span>{" "}
                        {systemRequirements.OS}
                      </p>
                      <p>
                        <span className="text-fiveColor font-bold">
                          Processor:
                        </span>{" "}
                        {systemRequirements.Processor}
                      </p>
                      <p>
                        <span className="text-fiveColor font-bold">
                          Memory:
                        </span>{" "}
                        {systemRequirements.Memory}
                      </p>
                      <p>
                        <span className="text-fiveColor font-bold">
                          Graphics:
                        </span>{" "}
                        {systemRequirements.Graphics}
                      </p>
                      <p>
                        <span className="text-fiveColor font-bold">
                          Storage:
                        </span>{" "}
                        {systemRequirements.Storage}
                      </p>
                      <p>
                        <span className="text-fiveColorfont-bold">
                          DirectX:
                        </span>{" "}
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
