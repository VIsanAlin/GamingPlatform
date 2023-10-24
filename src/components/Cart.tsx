import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import cart from "../../public/nav/shopping_cart_black_24dp.svg";

interface CartItem {
  id: number;
  name: string;
  title: string;
  image: string;
  price: number;
  sale: { price: string };
  quantity: number;
}

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedCartItems = sessionStorage.getItem("cart");
      console.log(sessionStorage);

      if (storedCartItems) {
        const parsedCartItems: CartItem[] = JSON.parse(storedCartItems);
        setCartItems(parsedCartItems);
      }
    };
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
  }, []);

  const removeFromCart = (itemId: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const getTotal = (): string => {
    return cartItems
      .reduce((total, item) => total + item.price * 1, 0)
      .toFixed(2);
  };

  return (
    <div className="">
      <button onClick={toggleCart}>
        <Image src={cart} alt="cart" className="mx-4 py-2" />
      </button>

      {isOpen && (
        <div className="fixed top-0 w-full left-0 md:left-[50%] md:w-1/2 h-full 2xl:left-[75%] 2xl:w-1/4 bg-forthColor  flex justify-center items-start">
          <div className="p-4 rounded-lg shadow-lg ">
            <button
              onClick={toggleCart}
              className="absolute top-3 right-5 p-2 bg-transparent border-none text-eightColor"
            >
              X
            </button>
            <div className="p-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="text-center pt-10">
                  <p>No items added until now</p>
                </div>
              ) : (
                <div className="p-6">
                  {cartItems &&
                    cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="mb-6 border-b border-eightColor pb-4 flex space-x-4 text-eightColor"
                      >
                        <div className="flex-center">
                          <img
                            src={item.image}
                            alt={item.image}
                            className="object-cover w-16 h-16 rounded-md"
                          />
                        </div>
                        <div className="flex flex-col flex-grow">
                          <p className="md:text-lg md:font-semibold mb-2">
                            {item.title}
                          </p>
                          <p className="text-sm mb-2">Quantity: 1</p>
                          <p className="md:text-lg md:font-semibold">
                            Price: ${item.sale ? item.sale.price : item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-sixColor hover:text-eightColor"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  <p className="text-center text-lg font-semibold mt-4 text-eightColor">
                    Total Price: ${getTotal()}
                  </p>

                  <Link href="order" className="text-eightColor">
                    <button
                      className=" flex font-medium text-lg justify-center text-forthColor bg-eightColor rounded-2xl py-2 mt-4 w-2/3 mx-auto"
                      onClick={toggleCart}
                    >
                      Checkout
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
