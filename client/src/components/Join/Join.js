import React, { useState } from "react";
import { Link } from "react-router-dom";
import Particles from "react-particles-js";

import "./Join.css";

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [particlesAnimationJoin, setParticlesAnimationJoin] = useState(true);

  const particlesHandlerJoin = () => {
    if (particlesAnimationJoin) {
      setParticlesAnimationJoin(false);
    } else {
      setParticlesAnimationJoin(true);
    }
  };

  let particlesJSXJoin;

  if (particlesAnimationJoin) {
    particlesJSXJoin = (
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

  return (
    <div className="joinOuterContainer">
      <div className="particles">{particlesJSXJoin}</div>
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput mt-5 px-5 py-5 border rounded bg-gray-200 text-gray-700 focus:bg-white shadow-lg"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-5 mb-10 px-5 py-5 border rounded bg-gray-200 text-gray-700 focus:bg-white shadow-lg"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button
            className={
              "button bg-black hover:bg-transparent text-white border rounded shadow-md"
            }
            type="submit"
          >
            Sign In
          </button>
          <button
            className={
              "toggleParticleButtonJoin bg-black hover:bg-transparent text-white border rounded shadow-md"
            }
            onClick={(e) => {
              particlesHandlerJoin();
              e.preventDefault();
            }}
          >
            Toggle Particles
          </button>
        </Link>
      </div>
    </div>
  );
}
