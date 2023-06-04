"use client";

import React, { useState } from "react";
import * as Realm from "realm-web";

export default function Ticket() {
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    problem: "",
  });

  const pushTicket = async () => {
    const REALM_APP_ID = "games-oodpu";
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      if (user !== null && app.currentUser !== null) {
        const mongodb = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongodb.db("Products").collection("contactUs");
        await collection.insertOne(ticketData);
        console.log("Ticket inserted successfully!");
      }
    } catch (error) {
      console.error("Error inserting ticket:", error);
      return [];
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Here, you can implement the logic to submit the ticket data to your backend or perform any necessary actions.
    // You can access the ticket data using the ticketData state variable.
    console.log(ticketData);
    await pushTicket();
    // Reset the form after submission
    setTicketData({
      name: "",
      email: "",
      problem: "",
    });
  };

  return (
    <div className="bg-[#10002B] pt-24 pb-28">
      <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-2xl shadow-[#5A189A] text-white">
        <h2 className="text-2xl font-bold mb-4">Submit a Ticket</h2>
        <p className="mb-6">
          If you are experiencing any issues or need assistance, please submit a
          ticket by providing the details below.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={ticketData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5A189A] text-lg text-[#5A189A] "
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={ticketData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5A189A] text-lg text-[#5A189A] "
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="problem" className="block font-semibold mb-1">
              Problem Description
            </label>
            <textarea
              id="problem"
              name="problem"
              value={ticketData.problem}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#5A189A] text-lg text-[#5A189A] "
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#5A189A] text-white px-6 py-2 rounded-md hover:bg-[#9d4edd] focus:outline-none focus:bg-[#9d4edd]"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
