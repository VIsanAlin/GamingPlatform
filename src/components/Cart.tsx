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
        <div className="fixed top-0 w-full left-0 md:left-[50%] md:w-1/2 lg:left-[75%] lg:w-1/4 h-full bg-forthColor flex justify-center items-start">
          <div className="p-4 ">
            <button
              onClick={toggleCart}
              className="absolute top-3 right-5 p-2 bg-transparent border-none"
            >
              X
            </button>
            {cartItems.length === 0 ? (
              <div className="text-center pt-10">
                <p>No items added until now</p>
              </div>
            ) : (
              <div className="py-10">
                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.id} className=" pb-6">
                      <div className="flex justify-between">
                        <img
                          src={item.image}
                          alt={item.image}
                          className="object-cover w-1/2 h-1/2 "
                        />
                        <div className="">
                          <p className="pb-2">{item.title}</p>
                          <p className="pb-2">Quantity: 1</p>
                          <p className="pb-2">
                            Price: ${item.sale ? item.sale.price : item.price}{" "}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="pl-52 pt-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                <p>Total Price: ${getTotal()}</p>

                <Link href="order" className="text-eightColor">
                  <button onClick={toggleCart}>Checkout</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
