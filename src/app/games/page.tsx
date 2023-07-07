"use client";
import React, { useState, useEffect, useRef } from "react";
import * as Realm from "realm-web";
import Link from "next/link";
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
  aboutGame: string[];
  category: string;
  description: string;
  features: string[];
  publisher: string;
  release: string;
}

export default function Products() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

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

  // Load Platforms

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

  // Category
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const [chosenCategories, setChosenCategories] = useState([""]);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const toggleCategories = () => {
    setIsCategoriesVisible((prevVisibility) => !prevVisibility);
  };

  function categoryList() {
    const categories = games.reduce((uniqueCategories: string[], game) => {
      if (!uniqueCategories.includes(game.category)) {
        uniqueCategories.push(game.category);
      }
      return uniqueCategories;
    }, []);

    return categories;
  }

  const chosenCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categ = event.target.name;
    const updatedCategories = chosenCategories.includes(categ)
      ? chosenCategories.filter((category) => category !== categ)
      : [...chosenCategories, categ];
    setChosenCategories(updatedCategories);
    filterGames();
  };

  const uniqueCategories = categoryList();

  const scrollCategoriesLeft = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollLeft -= 200; // Adjust the scroll amount as per your preference
    }
  };

  const scrollCategoriesRight = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollLeft += 200; // Adjust the scroll amount as per your preference
    }
  };

  //  Platforms
  const [isPlatformsVisible, setIsPlatformsVisible] = useState(false);
  const [chosenPlatforms, setChosenPlatforms] = useState<string[]>([""]);
  const togglePlatforms = () => {
    setIsPlatformsVisible((prevVisibility) => !prevVisibility);
  };

  function platformList() {
    const platforms = games.reduce((uniquePlatforms: string[], game) => {
      game.platforms.forEach((platform) => {
        if (!uniquePlatforms.includes(platform)) {
          if (platform !== "") uniquePlatforms.push(platform);
        }
      });
      return uniquePlatforms;
    }, []);
    return platforms;
  }

  const chosenPlats = (event: React.ChangeEvent<HTMLInputElement>) => {
    const platform = event.target.name;
    const updatedPlatforms = chosenPlatforms.includes(platform)
      ? chosenPlatforms.filter((plat) => plat !== platform)
      : [...chosenPlatforms, platform];
    setChosenPlatforms(updatedPlatforms);

    filterGames();
  };

  const uniquePlatforms = platformList();

  // Search Bar
  const [searchValue, setSearchValue] = useState("");
  const [searchedGames, setSearchedGames] = useState<Game[]>([]);
  const searchGames = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };
  const enterGame = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searched = games.filter((game) => game.title.includes(searchValue));
      setSearchedGames(searched);
      console.log(searchValue);
      console.log(searched);
    }
  };

  // Filter Games

  const filterGames = () => {
    console.log(chosenPlatforms);
    console.log(chosenCategories);
    const filtered = games.filter((game) => {
      const categoryMatch =
        chosenCategories.length === 0 ||
        chosenCategories.includes(game.category);
      const platformMatch =
        chosenPlatforms.length === 0 ||
        chosenPlatforms.some((platform) =>
          game.platforms.includes(platform.toString())
        );

      return categoryMatch && platformMatch;
    });
    setFilteredGames(filtered);
    console.log(filtered);
  };

  useEffect(() => {
    filterGames();
  }, [chosenCategories, chosenPlatforms]);

  // Add To Cart

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
      description: gameData.description || "",
      features: gameData.features || [],
      publisher: gameData.publisher || "",
      release: gameData.release || "",
    };
    const newCart = [...cartItems, game];
    sessionStorage.setItem("cart", JSON.stringify(newCart));

    window.dispatchEvent(new Event("storage"));
  };
  `
`;
  ////////////////////////////////

  return (
    <div className="bg-firstColor">
      <div className="lg:px-40 md:px-32 py-4 px-10">
        <input
          className="bg-firstColor border-fiveColor border-2 rounded-md shadow-md shadow-fiveColor text-eightColor w-full pl-2"
          type="text"
          value={searchValue}
          onChange={searchGames}
          onKeyDown={enterGame}
        />
      </div>
      <div className="lg:px-40 md:px-32 py-4 px-10 text-fiveColor">
        <div className="  xl:w-1/5 lg:w-1/4 w-1/3" onClick={toggleCategories}>
          <p className="border-fiveColor border-2 rounded-lg text-eightColor text-center py-1 ">
            Categories
          </p>
        </div>
        {isCategoriesVisible && (
          <div className="flex overflow-x-auto py-4">
            <button
              className="text-fiveColor px-2 py-1 focus:outline-none"
              onClick={scrollCategoriesLeft}
            >
              {"<"}
            </button>
            <div className="flex space-x-2" ref={categoriesRef}>
              {uniqueCategories.map((category) => (
                <div
                  className="flex space-x-2 border-fiveColor border-2 rounded-lg bg-forthColor bg-opacity-10"
                  key={category}
                >
                  <input
                    className="rounded-xl"
                    type="checkbox"
                    name={category}
                    id={category}
                    onChange={chosenCategory}
                  />
                  <p>{category}</p>
                </div>
              ))}
            </div>
            <button
              className="text-fiveColor px-2 py-1 focus:outline-none"
              onClick={scrollCategoriesRight}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
      <div className="lg:px-40 md:px-32 py-4 px-10 text-fiveColor">
        <div className="  xl:w-1/5 lg:w-1/4 w-1/3" onClick={togglePlatforms}>
          <p className="border-fiveColor border-2 rounded-lg text-eightColor text-center py-1">
            Platforms
          </p>
        </div>
        {isPlatformsVisible && (
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-2 gap-4 text-eightColor ">
            {uniquePlatforms.map((platform) => (
              <div
                className="flex space-x-2 border-fiveColor border-2 rounded-lg bg-forthColor bg-opacity-10"
                key={platform}
              >
                <input
                  className="rounded-xl"
                  type="checkbox"
                  name={platform}
                  id={platform}
                  onChange={chosenPlats}
                />
                <p>{platform}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="lg:px-40 md:px-32 md:py-24 px-10 py-10">
        <div className="text-4xl pb-8">
          <h2 className="text-2xl md:text-4xl text-[#e6bbff]">
            Unlock Your Gaming Adventure with Unbeatable Prices!
          </h2>
        </div>
        <hr className="border-[#5A189A]" />

        {searchedGames && (
          <div className="flex flex-col md:grid md:grid-cols-2 2xl:grid-cols-4 md:gap-6 md:py-12 md:px-8 py-4">
            {searchedGames.map(
              ({ title, image, price, tags, platforms, id }) => (
                <Link
                  href="/games/item=[id]"
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex shadow-md shadow-forthColor md:grid md:bg-forthColor"
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
                      <h3 className="flex items-center font-medium md:text-lg md:mt-2 md:mb-1">
                        {title}
                        {platforms.map((platform) => (
                          <div className="px-1" key={platform}>
                            {platformsIcon(platform)}
                          </div>
                        ))}
                      </h3>
                      <p className="font-extralight text-sm md:mb-2">
                        {tags
                          .slice(0, 2)
                          .map((tag) => `${tag} `)
                          .join(" • ")}
                      </p>
                    </div>

                    <div className="flex p-2">
                      <button className="flex font-medium text-lg md:text-forthColor md:bg-eightColor md:rounded-lg py-2">
                        Add To Cart
                        <p className="font-medium text-lg md:text-forthColor pl-2">
                          €{price}
                        </p>
                      </button>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        )}

        <div className="flex flex-col md:grid md:grid-cols-2 2xl:grid-cols-4 md:gap-6 md:py-12 md:px-8 py-4">
          {filteredGames && (
            <div>
              {filteredGames.map(
                ({ title, image, price, tags, platforms, id }) => (
                  <Link
                    href="/games/item=[id]"
                    as={`/games/item=${id}`}
                    key={id}
                    className="flex shadow-md shadow-forthColor md:grid md:bg-forthColor"
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
                        <h3 className="flex items-center font-medium md:text-lg md:mt-2 md:mb-1">
                          {title}
                          {platforms.map((platform) => (
                            <div className="px-1" key={platform}>
                              {platformsIcon(platform)}
                            </div>
                          ))}
                        </h3>
                        <p className="font-extralight text-sm md:mb-2">
                          {tags
                            .slice(0, 2)
                            .map((tag) => `${tag} `)
                            .join(" • ")}
                        </p>
                      </div>

                      <div>
                        <div className="flex p-2">
                          <p className="font-medium text-lg text-eightColor pl-2 py-2 w-1/3">
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
                  </Link>
                )
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:py-12 md:px-8">
          {games &&
            games
              .slice(0, visibleGames)
              .map(({ title, image, price, tags, platforms, id }) => (
                <Link
                  href={`/games/item=${id}`}
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex shadow-md shadow-forthColor md:grid md:bg-forthColor md:rounded-lg md:shadow-sm overflow-hidden productItem my-2 "
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
                  <div className="h-16 basis-28 px-2 py-2 self-center md:h-48 md:w-auto  md:overflow-hidden">
                    <img src={image} alt={title} className="object-cover " />
                  </div>
                  <div className="md:grid  px-2 py-2">
                    <div>
                      <h3 className="flex items-center md:text-lg font-medium ">
                        {title}
                        {platforms.map((platform) => (
                          <div className="px-1" key={platform}>
                            {platformsIcon(platform)}
                          </div>
                        ))}
                      </h3>
                      <p className="font-extralight text-sm ">
                        {tags.map((tag) => `${tag}  `)}
                      </p>
                    </div>
                    <div>
                      <div className="flex p-2">
                        <p className="font-medium text-lg text-eightColor pl-2 py-2 w-1/3">
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
