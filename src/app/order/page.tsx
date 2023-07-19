"use client";
import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";

import { BsTrash3 } from "react-icons/bs";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [orderCompleted, setOrderCompleted] = useState(false);

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

  useEffect(() => {
    if (currentStep === 3) {
      const timeoutId = setTimeout(() => {
        window.location.href = "/store";
      }, 15000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [currentStep]);

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
    setOrderCompleted(true);
  };

  return (
    <div className="bg-firstColor p-4 lg:p-12">
      <div className="flex items-center mb-6 place-content-center">
        <div className=" flex justify-between items-center space-x-4">
          <div className="flex flex-col items-center">
            <div
              className={`flex justify-center items-center h-8 w-8  rounded-full ${
                currentStep === 1 ? "bg-eightColor" : "bg-forthColor"
              }`}
            >
              <p>1</p>
            </div>
            <p>Order</p>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`flex justify-center items-center h-8 w-8 text-center rounded-full ${
                currentStep === 2 ? "bg-eightColor" : "bg-forthColor"
              }`}
            >
              <p>2</p>
            </div>
            <p>Information </p>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`flex justify-center items-center h-8 w-8  text-center rounded-full ${
                currentStep === 3 ? "bg-eightColor" : "bg-forthColor"
              }`}
            >
              <p>3</p>
            </div>
            <p>Finish</p>
          </div>
        </div>
      </div>
      <div>
        <div className={` ${currentStep === 1 ? "block" : "hidden "}`}>
          <div className="p-2">
            {orderItems.length === 0 ? (
              <div className="text-center pt-10">
                <p>No items added until now</p>
              </div>
            ) : (
              <div className=" space-y-4">
                <h2 className="text-fiveColor mx-auto text-center">
                  Ordered items
                </h2>
                <hr />
                {orderItems.map((item) => (
                  <div key={item.id} className="bg-forthColor bg-opacity-20  ">
                    <div className="flex ">
                      <img
                        src={item.image}
                        alt={item.image}
                        className=" object-cover w-1/3 h-1/3 lg:w-1/3 lg:h-1/3 my-auto"
                      />
                      <div className="w-full pl-2 text-eightColor">
                        <p className="my-2">{item.title}</p>

                        <p className="pb-2">Quantity: {item.quantity}</p>
                      </div>
                      <div className="flex flex-col pl-2 text-right text-eightColor">
                        <button className="flex mx-auto my-2">
                          <BsTrash3 />
                        </button>
                        <p className="mt-auto mb-2">
                          ${item.sale ? item.sale.price : item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-eightColor text-lg font-medium text-end pr-2">
                  Total: ${getTotal()}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={` ${currentStep === 2 ? "block" : "hidden "}`}>
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
            <div className="flex justify-between mx-4">
              <button
                className="bg-forthColor text-tenColor w-1/6 rounded-xl"
                onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-forthColor text-tenColor w-1/4 rounded-xl"
                onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
              >
                Finish
              </button>
            </div>
          </form>
        </div>
        <div className={` ${currentStep === 3 ? "block" : "hidden "}`}>
          <div className="text-center">
            <h2 className="text-fiveColor mx-auto text-center">
              Congratulations!
            </h2>
            <p className="text-eightColor mx-auto text-center">
              Your order has been successfully submitted.
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          {currentStep === 1 && (
            <button
              className="bg-forthColor text-tenColor w-1/4 rounded-xl "
              onClick={() => setCurrentStep((prevStep) => prevStep + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
