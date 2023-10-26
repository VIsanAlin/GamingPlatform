"use client";
import React, { useState, useEffect, cache } from "react";
import * as Realm from "realm-web";
import Link from "next/link";
import Carousel from "../../components/Carousel";
import CartIMG from "../../../public/nav/shopping_cart_black_24dp.svg";
import Image from "next/image";
import ActionIcon from "../../../public/categ/icons8-sword-64.png";
import {
  BsSteam,
  BsPlaystation,
  BsXbox,
  BsNintendoSwitch,
} from "react-icons/bs";

//Struture for Game Object
interface Game {
  id: string;
  title: string;
  image: string;
  price: string;
  tags: string[];
  platforms: string[];
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

  //Function fetch games from Realm (mongodb)
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

  // Fetch games when component mounts
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

  // Carousel Images + Info + Link

  const imagesToDisplay = filteredGames
    .filter(
      (game) =>
        game.sale && game.sale.price !== null && game.sale.price !== "Free"
    )
    .map((game) => game.image);

  const titleToDisplay = filteredGames
    .filter(
      (game) =>
        game.sale && game.sale.price !== null && game.sale.price !== "Free"
    )
    .map((game) => game.title);

  const descToDisplay = filteredGames
    .filter(
      (game) =>
        game.sale && game.sale.price !== null && game.sale.price !== "Free"
    )
    .map((game) => game.description);

  const priceToDisplay = filteredGames
    .filter(
      (game) =>
        game.sale && game.sale.price !== null && game.sale.price !== "Free"
    )
    .map((game) => game.price);

  const idToDisplay = filteredGames
    .filter(
      (game) =>
        game.sale && game.sale.price !== null && game.sale.price !== "Free"
    )
    .map((game) => game.id);

  console.log(imagesToDisplay);

  // Category click
  const handleCategoryClick = (category: string) => {
    localStorage.setItem("selectedCategory", category);
  };

  // Render platform icon
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

  // Load More Games
  const [visibleGames, setVisibleGames] = useState(12);

  function loadMore() {
    setVisibleGames((prev) => prev + 12);
  }

  ////////////////////////////////
  // Function to add games to cart
  const handleAddToCart = (gameData: Partial<Game>) => {
    const cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const game: Game = {
      id: gameData.id || "",
      title: gameData.title || "",
      image: gameData.image || "",
      price: gameData.price || "",
      platforms: gameData.platforms || [],
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

        {/*Render Carousel */}
        <div className="pt-2">
          <Carousel
            images={imagesToDisplay}
            title={titleToDisplay}
            description={descToDisplay}
            price={priceToDisplay}
            id={idToDisplay}
          />
        </div>

        <div className="py-2">
          <div className="flex gap-4  md:py-12 md:px-8 overflow-hidden">
            <Link
              href="/games"
              as={`/games`}
              key={1}
              className="flex flex-col px-6 py-6 border max-h-36 border-y-[#5A189A] border-x-[#E0AAFF] rounded-xl self-center text-center "
              onClick={() => handleCategoryClick("Action")}
            >
              <img
                src="categ/icons8-sword-64.png"
                alt="Action Icon"
                className="h-[64px] w-[72px] lg:pl-8 lg:w-2/3 lg:h-auto  pb-2"
              />
              <h2>Action </h2>
            </Link>
            <Link
              href="/games"
              as={`/games`}
              key={2}
              className="flex  flex-col px-6 py-6 border max-h-36 border-x-[#5A189A] border-y-[#E0AAFF] rounded-xl self-center text-center"
              onClick={() => handleCategoryClick("Adventure")}
            >
              <img
                src="categ/icons8-adventure-64.png"
                alt="Action Icon"
                className="h-[64px] w-[72px] lg:pl-8 lg:w-2/3 lg:h-auto  pb-2"
              />
              <h2>Adventure </h2>{" "}
            </Link>
            <Link
              href="/games"
              as={`/games`}
              key={4}
              className="flex flex-col px-6 py-6 border max-h-36 border-y-[#5A189A] border-x-[#E0AAFF] rounded-xl self-center text-center"
              onClick={() => handleCategoryClick("Shooter")}
            >
              <img
                src="categ/icons8-assault-rifle-64.png"
                alt="Action Icon"
                className="h-[64px] w-[72px] lg:pl-8 lg:w-2/3 lg:h-auto pb-2"
              />
              <h2>Shooter </h2>{" "}
            </Link>
          </div>
        </div>

        {/* Separate divs for Popular, Sale, RPG, and Shooter */}
        <div className="py-2 ">
          <h2 className="text-2xl py-4 text-gradient">Popular Games</h2>
          <hr className="border-[#5A189A] " />
          <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-6 md:py-12 md:px-8 ">
            {filteredGames
              .filter((game) => game.tags.includes("Fantasy"))
              .slice(0, visibleGames)
              .map(({ title, image, price, tags, platforms, id }) => (
                <Link
                  href={`/games/item=${id}`}
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex px-2 py-2 md:px-0 md:py-0 shadow-md shadow-forthColor md:grid md:bg-forthColor md:rounded-xl md:shadow-sm overflow-hidden productItem my-2"
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
                  <div className="w-2/3 md:w-auto ">
                    <img
                      src={image}
                      alt={title}
                      className="object-fit h-full w-full "
                    />
                  </div>
                  <div className="md:grid px-2 py-1 w-full space-y-2 md:h-30 md:py-2 ">
                    <div className="space-y-2">
                      <div className="block md:flex text-sm px-1 md:text-lg md:mt-2 md:mb-1 font-medium ">
                        <p
                          className="md:pr-2"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {title}
                        </p>
                        <span className="bg-secondColor bg-opacity-25 text-eightColor border-forthColor rounded-md md:py-0 md:px-2">
                          Popular
                        </span>
                      </div>
                      <div className="text-xs font-extralight">
                        {tags
                          .slice(0, 2)
                          .map((tag, index) => (
                            <span
                              className="bg-secondColor bg-opacity-25  border-forthColor rounded-md p-1"
                              key={index}
                            >
                              {tag}
                            </span>
                          ))
                          .map((tagElement, index, array) => (
                            <React.Fragment key={index}>
                              {tagElement}
                              {index < array.length - 1 ? " • " : null}
                            </React.Fragment>
                          ))}
                      </div>
                      <div className="flex ">
                        {platforms.map((platform) => (
                          <div className="px-1" key={platform}>
                            {platformsIcon(platform)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between py-2 ">
                        <p className="font-medium text-lg  px-2 w-auto">
                          {price === "Free" ? price : `€${price}`}
                        </p>
                        <button
                          onClick={() =>
                            handleAddToCart({ id, title, image, price })
                          }
                          className="flex justify-center bg-forthColor md:bg-sixColor rounded-2xl py-2 w-1/4"
                        >
                          <Image src={CartIMG} alt="cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="py-2">
          <h2 className="text-2xl py-4 sale-gradient">Sales</h2>
          <hr className="border-[#5A189A]" />
          <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-6 md:py-12 md:px-8">
            {filteredGames
              .filter(
                (game) =>
                  game.sale &&
                  game.sale.price !== null &&
                  game.sale.price !== "Free"
              )
              .map(({ title, image, sale, platforms, tags, id }) => (
                <Link
                  href={`/games/item=${id}`}
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex px-2 py-2 md:px-0 md:py-0 shadow-md shadow-forthColor md:grid md:bg-forthColor md:rounded-xl md:shadow-sm overflow-hidden productItem my-2"
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
                  <div className="w-2/3 md:w-auto ">
                    <img
                      src={image}
                      alt={title}
                      className="object-fit h-full w-full "
                    />
                  </div>
                  <div className="md:grid px-2 py-1 w-full space-y-2 md:h-30 md:py-2 ">
                    <div className="space-y-2">
                      <div className="block md:flex text-sm px-1 md:text-lg md:mt-2 md:mb-1 font-medium ">
                        <p
                          className="md:pr-2"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {title}
                        </p>
                        <span className="bg-secondColor bg-opacity-25 text-green-700 border-forthColor rounded-md md:py-0 md:px-2">
                          Sale
                        </span>
                      </div>
                      <div className="text-xs font-extralight">
                        {tags
                          .slice(0, 2)
                          .map((tag, index) => (
                            <span
                              className="bg-secondColor bg-opacity-25  border-forthColor rounded-md p-1"
                              key={index}
                            >
                              {tag}
                            </span>
                          ))
                          .map((tagElement, index, array) => (
                            <React.Fragment key={index}>
                              {tagElement}
                              {index < array.length - 1 ? " • " : null}
                            </React.Fragment>
                          ))}
                      </div>
                      <div className="flex ">
                        {platforms.map((platform) => (
                          <div className="px-1" key={platform}>
                            {platformsIcon(platform)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      {sale && sale.price !== undefined ? (
                        <p className="font-semibold text-lg text-green-700 pl-2 p-2 w-1/3">
                          {sale.price === "Free"
                            ? sale.price
                            : `€${sale.price}`}
                        </p>
                      ) : null}

                      <button
                        onClick={() =>
                          handleAddToCart({ id, title, image, sale })
                        }
                        className="flex justify-center bg-forthColor md:bg-sixColor rounded-2xl py-2 w-1/4"
                      >
                        <Image src={CartIMG} alt="cart" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="py-2">
          <h2 className="text-2xl pb-4 text-gradient">RPG Games</h2>
          <hr className="border-[#5A189A]" />
          <div className="flex flex-col md:grid md:grid-cols-2  2xl:grid-cols-4 md:gap-6 md:py-12 md:px-8">
            {filteredGames
              .filter((game) => game.tags.includes("RPG"))
              .map(({ title, image, price, platforms, tags, id }) => (
                <Link
                  href={`/games/item=${id}`}
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex px-2 py-2 md:px-0 md:py-0 shadow-md shadow-forthColor md:grid md:bg-forthColor md:rounded-xl md:shadow-sm overflow-hidden productItem my-2"
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
                  <div className="w-2/3 md:w-auto ">
                    <img
                      src={image}
                      alt={title}
                      className="object-fit h-full w-full "
                    />
                  </div>
                  <div className="md:grid px-2 py-1 w-full space-y-2 md:h-30 md:py-2 ">
                    <div className="space-y-2">
                      <div className="block md:flex text-sm px-1 md:text-lg md:mt-2 md:mb-1 font-medium ">
                        <p
                          className="md:pr-2"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {title}
                        </p>
                        <span className="bg-secondColor bg-opacity-25 text-eightColor border-forthColor rounded-md md:py-0 md:px-2">
                          RPG
                        </span>
                      </div>
                      <div className="text-xs font-extralight">
                        {tags
                          .slice(0, 2)
                          .map((tag, index) => (
                            <span
                              className="bg-secondColor bg-opacity-25  border-forthColor rounded-md p-1"
                              key={index}
                            >
                              {tag}
                            </span>
                          ))
                          .map((tagElement, index, array) => (
                            <React.Fragment key={index}>
                              {tagElement}
                              {index < array.length - 1 ? " • " : null}
                            </React.Fragment>
                          ))}
                      </div>
                      <div className="flex ">
                        {platforms.map((platform) => (
                          <div className="px-1" key={platform}>
                            {platformsIcon(platform)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between py-2 ">
                        <p className="font-medium text-lg  px-2 w-auto">
                          {price === "Free" ? price : `€${price}`}
                        </p>
                        <button
                          onClick={() =>
                            handleAddToCart({ id, title, image, price })
                          }
                          className="flex justify-center bg-forthColor md:bg-sixColor rounded-2xl py-2 w-1/4"
                        >
                          <Image src={CartIMG} alt="cart" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="py-2">
          <h2 className="text-2xl py-4 text-gradient">Shooter Games</h2>
          <hr className="border-[#5A189A]" />
          <div className="flex flex-col md:grid md:grid-cols-2  2xl:grid-cols-4 md:gap-6 md:py-12 md:px-8">
            {filteredGames
              .filter((game) => game.tags.includes("Shooter"))
              .map(({ title, image, price, platforms, tags, id }) => (
                <Link
                  href={`/games/item=${id}`}
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex px-2 py-2 md:px-0 md:py-0 shadow-md shadow-forthColor md:grid md:bg-forthColor md:rounded-xl md:shadow-sm overflow-hidden productItem my-2"
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
                  <div className="w-2/3 md:w-auto ">
                    <img
                      src={image}
                      alt={title}
                      className="object-fit h-full w-full "
                    />
                  </div>
                  <div className="md:grid px-2 py-1 w-full space-y-2 md:h-30 md:py-2 ">
                    <div className="space-y-2">
                      <div className="block md:flex text-sm px-1 md:text-lg md:mt-2 md:mb-1 font-medium ">
                        <p
                          className="md:pr-2"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {title}
                        </p>
                        <span className="bg-secondColor bg-opacity-25 text-eightColor border-forthColor rounded-md md:py-0 md:px-2">
                          Shooter
                        </span>
                      </div>
                      <div className="text-xs font-extralight">
                        {tags
                          .slice(0, 2)
                          .map((tag, index) => (
                            <span
                              className="bg-secondColor bg-opacity-25  border-forthColor rounded-md p-1"
                              key={index}
                            >
                              {tag}
                            </span>
                          ))
                          .map((tagElement, index, array) => (
                            <React.Fragment key={index}>
                              {tagElement}
                              {index < array.length - 1 ? " • " : null}
                            </React.Fragment>
                          ))}
                      </div>
                      <div className="flex ">
                        {platforms.map((platform) => (
                          <div className="px-1" key={platform}>
                            {platformsIcon(platform)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between py-2 ">
                        <p className="font-medium text-lg  px-2 w-auto">
                          {price === "Free" ? price : `€${price}`}
                        </p>
                        <button
                          onClick={() =>
                            handleAddToCart({ id, title, image, price })
                          }
                          className="flex justify-center bg-forthColor md:bg-sixColor rounded-2xl py-2 w-1/4"
                        >
                          <Image src={CartIMG} alt="cart" />
                        </button>
                      </div>
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
