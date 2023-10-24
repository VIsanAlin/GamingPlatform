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
      news: false,
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
        news: false,
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
              <div className="space-y-4">
                <h2 className="text-fiveColor text-center">Ordered items</h2>

                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-forthColor border-b border-eightColor bg-opacity-20 rounded-lg p-2"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.image}
                        className="object-cover w-16 h-16 lg:w-1/4 lg:h-1/4 rounded-lg lg:rounded-r-2xl"
                      />
                      <div className="flex-grow p-2 mb-6">
                        <p className="text-base lg:text-lg lg:font-semibold  mb-2 my-2  text-eightColor">
                          {item.title}
                        </p>
                        <p className="text-sm mb-2 pb-2 text-eightColor">
                          Quantity: 1
                        </p>
                      </div>
                      <div className="text-right flex flex-col text-eightColor">
                        <button className="pl-24 md:pl-48 pb-10">
                          <BsTrash3 />
                        </button>
                        <p className="mt-2 md:text-lg md:font-semibold">
                          Price: ${item.sale ? item.sale.price : item.price}
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
            className="max-w-md mx-auto space-y-4 text-eightColor"
            onSubmit={handleSubmitOrder}
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={orderData.orderUser.name}
                onChange={handleInputChange}
                required
                className="rounded-md px-3 py-2 border border-eightColor focus:outline-none focus:ring focus:ring-eightColor"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={orderData.orderUser.email}
                onChange={handleInputChange}
                required
                className="rounded-md px-3 py-2 border border-eightColor focus:outline-none focus:ring focus:ring-eightColor"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="age" className="font-medium">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={orderData.orderUser.age}
                onChange={handleInputChange}
                required
                className="rounded-md px-3 py-2 border border-eightColor focus:outline-none focus:ring focus:ring-eightColor"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                checked={orderData.orderUser.privacy}
                onChange={handleInputChange}
                required
                className="text-eightColor"
              />
              <label htmlFor="privacy" className="font-medium">
                Confirm Privacy
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="news"
                name="news"
                checked={orderData.orderUser.news}
                onChange={handleInputChange}
                required
                className="text-eightColor"
              />
              <label htmlFor="news" className="font-medium">
                Confirm Newsletter
              </label>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-forthColor text-tenColor w-1/2 py-2 rounded-xl"
                onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-forthColor text-tenColor w-1/2 py-2 rounded-xl"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default form submission
                  if (
                    orderData.orderUser.name &&
                    orderData.orderUser.email &&
                    orderData.orderUser.age &&
                    orderData.orderUser.privacy
                  ) {
                    // If name, email, age, and privacy are completed
                    setCurrentStep((prevStep) => prevStep + 1); // Proceed to the next step
                  } else {
                    alert("Please complete all required fields.");
                  }
                }}
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
