import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search); //storing the parameters, name and room

    socket = io(ENDPOINT);

    setName(name); //setting/storing name of user as
    setRoom(room); //setting/storing name of room as

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
    //passing endpoint and search url ignores redundancy
  }, [ENDPOINT, location.search]);

  return <h1>CHAT</h1>;
};

export default Chat;
