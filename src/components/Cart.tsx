import React, { useState } from "react";
import Image from "next/image";
import cart from "../../public/nav/shopping_cart_black_24dp.svg";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const getTotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      <button onClick={toggleCart}>
        <Image src={cart} alt="cart" className="mx-4 py-2" />
      </button>

      {isOpen && (
        <div className="cart">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <button onClick={toggleCart} className="close-button">
                X
              </button>
              <p>No items in the cart</p>
              <p>Total: $0</p>
            </div>
          ) : (
            <div className="cart-items">
              <button onClick={toggleCart} className="close-button">
                X
              </button>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <p>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </div>
              ))}
              <p>Total: ${getTotal()}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
