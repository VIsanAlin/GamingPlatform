"use client";
import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  image: string;
  sale?: { price: string };
  quantity: number;
  total: number;
}

export default function Order() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderData, setOrderData] = useState({
    orderUser: {
      name: "",
      email: "",
      age: "",
      privacy: false,
    },
    orderItems: [] as OrderItem[],
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedOrderedItems = sessionStorage.getItem("cart");

      if (storedOrderedItems) {
        const parsedOrderedItems: OrderItem[] = JSON.parse(storedOrderedItems);
        setOrderItems(parsedOrderedItems);
        setOrderData((prevData) => ({
          ...prevData,
          orderItems: parsedOrderedItems,
        }));
      }
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const pushOrder = async () => {
    const REALM_APP_ID = "games-oodpu";
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();

    try {
      const user = await app.logIn(credentials);
      if (user !== null && app.currentUser !== null) {
        const pushOrder = await user.functions.pushAnOrder(orderData);
        console.log("Order inserted successfully!");
        sessionStorage.removeItem("cart");
        return pushOrder;
      }
    } catch (error) {
      console.error("Error inserting order:", error);
      return [];
    }
  };

  const getTotal = (): string => {
    return orderItems
      .reduce((total, item) => total + item.price * 1, 0)
      .toFixed(2);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;

      setOrderData((prevData) => ({
        ...prevData,
        orderUser: {
          ...prevData.orderUser,
          [name]: checked,
        },
      }));
    } else {
      setOrderData((prevData) => ({
        ...prevData,
        orderUser: {
          ...prevData.orderUser,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmitOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(orderItems);
    console.log(orderData);
    await pushOrder();
    setOrderData({
      orderUser: {
        name: "",
        email: "",
        age: "",
        privacy: false,
      },
      orderItems: [],
    });
  };

  return (
    <div className="bg-firstColor p-4 lg:p-12">
      <h2 className="text-fiveColor mx-auto text-center">Order Details</h2>
      <p className="text-eightColor mx-auto text-center">
        This information is going into the database
      </p>
      <div className="p-4">
        {orderItems.length === 0 ? (
          <div className="text-center pt-10">
            <p>No items added until now</p>
          </div>
        ) : (
          <div className="py-10 space-y-4">
            <h2 className="text-fiveColor mx-auto text-center">
              Ordered items
            </h2>
            <hr />
            {orderItems.map((item) => (
              <div key={item.id} className="bg-forthColor bg-opacity-20  ">
                <div className="flex pr-4 space-x-4">
                  <img
                    src={item.image}
                    alt={item.image}
                    className="pl-2 object-cover w-1/3 h-1/3 lg:w-1/3 lg:h-1/3  my-auto"
                  />
                  <div className="text-eightColor">
                    <p className="pb-2">{item.title}</p>
                    <p className="pb-2">Quantity: {item.quantity}</p>
                    <p className="pb-2">
                      Price: ${item.sale ? item.sale.price : item.price}
                    </p>
                    <button className="pb-2">Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-eightColor text-lg font-medium text-end pr-2">
              Total Price: ${getTotal()}
            </p>
          </div>
        )}
      </div>

      <div>
        <form
          className="flex flex-col space-y-2 text-eightColor"
          onSubmit={handleSubmitOrder}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={orderData.orderUser.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={orderData.orderUser.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={orderData.orderUser.age}
            onChange={handleInputChange}
            required
          />

          <div className="flex space-x-4 pb-4">
            <label htmlFor="privacy">Confirm privacy</label>
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              checked={orderData.orderUser.privacy}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-forthColor text-tenColor w-1/4 rounded-xl"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
