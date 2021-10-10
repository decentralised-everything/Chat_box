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

const ENDPOINT = "https://genesis-chat-box.herokuapp.com/";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState({ text: "", image: null });
  const [messages, setMessages] = useState([]);
  const [particlesAnimationChat, setParticlesAnimationChat] = useState(true);
  const [rightContainerState, setRightContainerState] = useState(true);

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
      socket.emit("sendMessage", message, () =>
        setMessage({ text: "", image: null })
      );
    }
  };

  ////
  //
  const particlesHandlerChat = () => {
    if (particlesAnimationChat) {
      setParticlesAnimationChat(false);
    } else {
      setParticlesAnimationChat(true);
    }
  };

  let particlesJSXChat;

  if (particlesAnimationChat) {
    particlesJSXChat = (
      <Particles
        params={{
          particles: {
            number: {
              value: 1000,
              density: {
                enable: true,
                value_area: 3000,
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
    );
  }
  //
  ////

  ////
  //
  const rightContainerContentHandler = () => {
    setRightContainerState(!rightContainerState);
  };

  let rightContainerContent;

  if (rightContainerState) {
    rightContainerContent = (
      <div>
        <TextContainer users={users} />
        <div className="buttonContainer">
          <button
            className={"toggleParticleButtonChat"}
            onClick={(e) => {
              particlesHandlerChat();
              e.preventDefault();
            }}
          >
            Toggle Particles
          </button>
        </div>
      </div>
    );
  }
  //
  ////

  ////
  //
  return (
    <div className="outerContainer">
      <div className="particles">{particlesJSXChat}</div>
      <div className="navbar">
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <YouTubeIcon />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
        </a>
        <a
          href="https://www.spotify.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MusicNoteTwoToneIcon />
        </a>
        <a
          href="https://mail.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MailSharpIcon />
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
      <div className="rightContainer">{rightContainerContent}</div>
    </div>
  );
  //
  ////
};

export default Chat;
