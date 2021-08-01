import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Particles from "react-particles-js";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import MusicNoteTwoToneIcon from "@material-ui/icons/MusicNoteTwoTone";
import MailSharpIcon from "@material-ui/icons/MailSharp";

import "./Chat.css";

const ENDPOINT = "http://192.168.100.150:5000" // "https://genesis-chat-box.herokuapp.com/";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [particlesAnimation, setParticlesAnimation] = useState(true);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setRoom(room);
    setName(name);

    socket = io(ENDPOINT);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.off("message", () => {});
      socket.off("roomData", () => {});
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const particlesHandler = ()=> {
    if(particlesAnimation){setParticlesAnimation(false)}
    else {setParticlesAnimation(true)}
  }

  let particlesJSX;

  if(particlesAnimation){
    particlesJSX = <Particles
    params={{
      particles: {
        number: {
          value: 500,
          density: {
            enable: true,
            value_area: 2000,
          },
        },
        line_linked: {
          enable: true,
          opacity: 0.1,
        },
        move: {
          direction: "random",
          speed: 0.2,
        },
        size: {
          value: 3,
        },
        opacity: {
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.05,
          },
        },
      },
      interactivity: {
        events: {
          onclick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          push: {
            particles_nb: 1,
          },
        },
      },
      retina_detect: true,
    }}
  />
  }

  return (
    <div className="outerContainer">
      <div className="particles">
        {particlesJSX}
      </div>
      <div className="navbar">
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <YouTubeIcon fontSize="medium" />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FacebookIcon fontSize="medium" />
        </a>
        <a href="https://www.spotify.com/" target="_blank" rel="noopener noreferrer">
          <MusicNoteTwoToneIcon fontSize="medium" />
        </a>
        <a href="https://mail.google.com/" target="_blank" rel="noopener noreferrer">
          <MailSharpIcon fontSize="medium" />
        </a>
      </div>
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
      <button className={"button mt-20"} onKeyPress={particlesHandler}>
            Toggle Particles
          </button>
    </div>
  );
};

export default Chat;
