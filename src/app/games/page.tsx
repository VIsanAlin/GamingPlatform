"use client";
import React, { useState, useEffect, useRef } from "react";
import * as Realm from "realm-web";
import Link from "next/link";
import Image from "next/image";
import CartIMG from "../../../public/nav/shopping_cart_black_24dp.svg";
import {
  BsSearch,
  BsSteam,
  BsPlaystation,
  BsXbox,
  BsNintendoSwitch,
} from "react-icons/bs";

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

  // Category and Platforms
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const [isPlatformsVisible, setIsPlatformsVisible] = useState(false);
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);
  const [chosenPlatforms, setChosenPlatforms] = useState<string[]>([]);
  const [chosenPrice, setChosenPrice] = useState<string | null>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const toggleCategories = () => {
    setIsCategoriesVisible((prevVisibility) => !prevVisibility);
    setIsPlatformsVisible(false);
    setIsPriceVisible(false);
    setChosenPlatforms([]);
    setChosenPrice(null);
  };
  const togglePlatforms = () => {
    setIsPlatformsVisible((prevVisibility) => !prevVisibility);
    setIsPriceVisible(false);
    setIsCategoriesVisible(false);
    setChosenCategories([]);
    setChosenPrice(null);
  };
  const togglePrice = () => {
    setIsPriceVisible((prevVisibility) => !prevVisibility);
    setIsCategoriesVisible(false);
    setIsPlatformsVisible(false);
    setChosenCategories([]);
    setChosenPlatforms([]);
  };

  // Redirect Store -> Category
  let selectedCategory: string | null;
  useEffect(() => {
    selectedCategory = localStorage.getItem("selectedCategory");
    if (selectedCategory) {
      setChosenCategories([selectedCategory]);
    }
  }, []);

  function categoryList() {
    const categories = games.reduce((uniqueCategories: string[], game) => {
      if (!uniqueCategories.includes(game.category)) {
        uniqueCategories.push(game.category);
      }
      return uniqueCategories;
    }, []);

    return categories;
  }

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

  function priceList() {
    const priceRanges = games.reduce((uniquePriceRanges: string[], game) => {
      if (!uniquePriceRanges.includes(game.price)) {
        uniquePriceRanges.push(game.price);
      }
      return uniquePriceRanges;
    }, []);
    return priceRanges;
  }

  const chosenCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categ = event.target.name;
    const updatedCategories = chosenCategories.includes(categ)
      ? chosenCategories.filter((category) => category !== categ)
      : [...chosenCategories, categ];
    if (chosenCategories.includes(categ)) {
      localStorage.removeItem("selectedCategory");
    } else {
      localStorage.setItem("selectedCategory", categ);
    }
    setChosenCategories(updatedCategories);
    console.log(updatedCategories);
    filterGames();
  };

  const chosenPlats = (event: React.ChangeEvent<HTMLInputElement>) => {
    const platform = event.target.name;
    console.log(platform);
    const updatedPlatforms = chosenPlatforms.includes(platform)
      ? chosenPlatforms.filter((plat) => plat !== platform)
      : [...chosenPlatforms, platform];
    setChosenPlatforms(updatedPlatforms);
    console.log(updatedPlatforms);
    filterGames();
  };

  const chosenPriceRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = event.target.name;
    console.log(price);
    const updatedPrice = chosenPrice === price ? "" : price;
    setChosenPrice(updatedPrice);
    filterGames();
  };
  const uniqueCategories = categoryList();
  const uniquePlatforms = platformList();
  const uniquePrice = priceList();

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
    const filtered = games.filter((game) => {
      const categoryMatch =
        chosenCategories.length === 0 ||
        chosenCategories.includes(game.category);
      const platformMatch =
        chosenPlatforms.length === 0 ||
        chosenPlatforms.some((platform) => game.platforms.includes(platform));
      const priceMatch = chosenPrice === null || game.price === chosenPrice;

      return categoryMatch && platformMatch && priceMatch;
    });
    setFilteredGames(filtered);
  };

  useEffect(() => {
    filterGames();
  }, [chosenCategories, chosenPlatforms, chosenPrice]);

  // Add To Cart

  const handleAddToCart = (gameData: Partial<Game>) => {
    const cartItems = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const game: Game = {
      id: gameData.id || "",
      title: gameData.title || "",
      image: gameData.image || "",
      price: gameData.price || "0",
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
      <div className="lg:px-20 py-4 px-8 space-x-4">
        <div className="flex relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-eightColor">
            <BsSearch />
          </div>
          <input
            className="bg-firstColor border-fiveColor border-2 rounded-md shadow-md shadow-fiveColor text-eightColor w-full pl-10 pr-2 py-1"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={searchGames}
            onKeyDown={enterGame}
            onClick={() => setSearchValue("")}
          />
        </div>
      </div>

      <div className="lg:px-20 py-4 px-8 text-fiveColor">
        <div className="flex space-x-2">
          <div
            className={`xl:w-1/5 lg:w-1/4 w-1/3 rounded-lg ${
              isCategoriesVisible
                ? "bg-gradient-to-r from-secondColor to-fiveColor"
                : ""
            }`}
            onClick={toggleCategories}
          >
            <p className="border-fiveColor border-2 rounded-lg text-eightColor text-center py-1">
              Categories
            </p>
          </div>
          <div
            className={`xl:w-1/5 lg:w-1/4 w-1/3 rounded-lg ${
              isPlatformsVisible
                ? "bg-gradient-to-r from-secondColor via-fiveColor to-eightColor"
                : ""
            }`}
            onClick={togglePlatforms}
          >
            <p className="border-fiveColor border-2 rounded-lg text-eightColor text-center py-1">
              Platforms
            </p>
          </div>
          <div
            className={`xl:w-1/5 lg:w-1/4 w-1/3 rounded-lg ${
              isPriceVisible
                ? "bg-gradient-to-r from-secondColor to-eightColor"
                : ""
            }`}
            onClick={togglePrice}
          >
            <p className="border-fiveColor border-2 rounded-lg text-eightColor text-center py-1">
              Price
            </p>
          </div>
        </div>
        {isCategoriesVisible && (
          <div className="flex overflow-x-auto py-4">
            <div className="flex space-x-2" ref={categoriesRef}>
              {uniqueCategories.map((category) => (
                <div
                  className="flex-row w-max space-x-2 px-2 border-fiveColor border-2 rounded-lg bg-forthColor bg-opacity-10"
                  key={category}
                >
                  <input
                    type="checkbox"
                    name={category}
                    id={category}
                    checked={
                      chosenCategories.includes(category) ||
                      selectedCategory === category
                    }
                    onChange={chosenCategory}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
          </div>
        )}
        {isPlatformsVisible && (
          <div className="flex overflow-x-auto py-4">
            <div className="flex space-x-2" ref={platformsRef}>
              {uniquePlatforms.map((platform) => (
                <div
                  className="flex-row w-max space-x-2 border-fiveColor border-2 rounded-lg bg-forthColor bg-opacity-10"
                  key={platform}
                >
                  <input
                    type="checkbox"
                    name={platform}
                    id={platform}
                    onChange={chosenPlats}
                  />
                  <label htmlFor={platform}>{platform}</label>
                </div>
              ))}
            </div>
          </div>
        )}
        {isPriceVisible && (
          <div className="flex overflow-x-auto py-4">
            <div className="flex space-x-2" ref={priceRef}>
              {uniquePrice.map((price) => (
                <div
                  className="flex-row w-max space-x-2 border-fiveColor border-2 rounded-lg bg-forthColor bg-opacity-10"
                  key={price}
                >
                  <input
                    className="rounded-xl"
                    type="checkbox"
                    name={price}
                    id={price}
                    onChange={chosenPriceRange}
                  />
                  <label htmlFor={price}>{price}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="lg:px-20 px-8 py-4">
        <div className="text-4xl pb-8">
          <p className="text-2xl md:text-4xl text-[#e6bbff]">
            <span>Unlock Your Gaming Adventure with Unbeatable Prices!</span>
          </p>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:py-12 md:px-8">
          {games && games.length > 0 ? (
            games
              .filter((game) => {
                // Apply search filter
                if (searchedGames.length > 0) {
                  return searchedGames.some(
                    (searchedGame) => searchedGame.id === game.id
                  );
                }

                // Apply category and platform filters
                const categoryMatch =
                  chosenCategories.length === 0 ||
                  chosenCategories.includes(game.category);
                const platformMatch =
                  chosenPlatforms.length === 0 ||
                  chosenPlatforms.some((platform) =>
                    game.platforms.includes(platform)
                  );
                const priceMatch =
                  chosenPrice === null || game.price === chosenPrice;

                return categoryMatch && platformMatch && priceMatch;
              })
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
                      <div className="flex text-sm px-1 md:text-lg md:mt-2 md:mb-1 font-medium text-eightColor">
                        <p className="md:pr-2">{title}</p>
                      </div>
                      <div className="text-xs font-extralight">
                        {tags
                          .slice(0, 2)
                          .map((tag, index) => (
                            <span
                              className="bg-secondColor bg-opacity-25 text-eightColor border-forthColor rounded-md p-1"
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
                      <div className="flex text-eightColor">
                        {platforms.map((platform) => (
                          <div className="px-1" key={platform}>
                            {platformsIcon(platform)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between py-2 ">
                        <p className="font-medium text-lg text-eightColor px-2 w-auto">
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
              ))
          ) : (
            <div>
              <button
                type="button"
                className="flex bg-firstColor mx-auto my-20"
                disabled
              >
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-forthColor motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
                <span className="pl-4 text-eightColor">Loading games...</span>
              </button>
            </div>
          )}
        </div>
        <hr />
        {/* {searchedGames && (
          <div className="flex flex-col md:grid md:grid-cols-2 2xl:grid-cols-4 md:gap-6 md:px-8 ">
            {searchedGames.map(
              ({ title, image, price, tags, platforms, id }) => (
                <Link
                  href="/games/item=[id]"
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex shadow-md shadow-forthColor md:grid md:bg-forthColor mt-8"
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

        <div className="flex flex-col md:grid md:grid-cols-2 2xl:grid-cols-4 md:gap-6 md:px-8 ">
          {filteredGames && (
            <div>
              {filteredGames.map(
                ({ title, image, price, tags, platforms, id }) => (
                  <Link
                    href="/games/item=[id]"
                    as={`/games/item=${id}`}
                    key={id}
                    className="flex shadow-md shadow-forthColor md:grid md:bg-forthColor mt-8"
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

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:py-12 md:px-8">
          {games &&
            games
              .slice(0, visibleGames)
              .map(({ title, image, price, tags, platforms, id }) => (
                <Link
                  href={`/games/item=${id}`}
                  as={`/games/item=${id}`}
                  key={id}
                  className="flex shadow-md shadow-forthColor md:grid md:bg-forthColor md:rounded-lg md:shadow-sm overflow-hidden productItem  "
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
                  <div className="w-1/2 lg:w-auto ">
                    <img
                      src={image}
                      alt={title}
                      className="object-fit h-full w-full rounded-lg "
                    />
                  </div>
                  <div className="md:grid px-2 w-full space-y-1 py-1">
                    <div className="">
                      <div className="flex items-center text-sm px-1 md:text-base font-medium text-eightColor">
                        {title}
                      </div>
                      <div className="text-xs font-extralight">
                        {tags.slice(0, 2).map((tag) => (
                          <span className="bg-secondColor bg-opacity-25 text-eightColor border-forthColor rounded-md p-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex text-eightColor">
                        {platforms.map((platform) => (
                          <div className="px-1" key={platform}>
                            {platformsIcon(platform)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex ">
                        <p className="font-medium text-lg text-eightColor px-2 w-auto">
                          €{price}
                        </p>
                        <button
                          onClick={() =>
                            handleAddToCart({ id, title, image, price })
                          }
                          className="flex font-medium text-lg justify-center text-forthColor bg-eightColor rounded-2xl  w-2/3"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div> */}

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
