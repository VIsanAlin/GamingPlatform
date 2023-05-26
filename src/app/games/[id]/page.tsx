"use client";
import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";

export default function Game() {
  const [game, setGame] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const REALM_APP_ID = "games-oodpu";
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const theGame = await user.functions.getAGame();
        setGame(theGame);
        console.log(theGame);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGames();
  }, []);
  return (
    <div>
      <div>Thegame</div>
    </div>
  );
}
