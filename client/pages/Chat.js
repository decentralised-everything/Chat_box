import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Particles from "react-particles-js";

import TextContainer from "../src/components/TextContainer/TextContainer";
import Messages from "../src/components/Messages/Messages";
import InfoBar from "../src/components/InfoBar/InfoBar";
import Input from "../src/components/Input/Input";

import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import MusicNoteTwoToneIcon from "@material-ui/icons/MusicNoteTwoTone";
import MailSharpIcon from "@material-ui/icons/MailSharp";

import "../styles/Chat.css";

const ENDPOINT = "https://localhost:5000"; //"https://genesis-chat-box.herokuapp.com/";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState({ text: "", image: null });
  const [messages, setMessages] = useState([]);
  const [particlesAnimationChat, setParticlesAnimationChat] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
    );
  }

  let content;

  if (loading) {
    content = <div className="loading">Loading...</div>;
  } else {
    content = (
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
        <div className="rightContainer">
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
      </div>
    );
  }

  return <div className="App">{content}</div>;
};

export default Chat;
