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

  return (
    <div className="flex justify-center text-center h-full items-center bg-{#5858e3} relative">
      <div className="z-10 absolute h-full w-full">{particlesJSXJoin}</div>
      <div className="w-1/3 z-50">
        <h1 className="heading text-white text-4xl pb-4 border-b-2 border-solid border-white uppercase">
          Join
        </h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput mt-5 px-5 py-5 border rounded bg-gray-200 text-gray-700 w-full border-none text-base focus:bg-white shadow-lg "
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-5 mb-10 px-5 py-5 border rounded bg-gray-200 text-gray-700 w-full border-none text-base focus:bg-white shadow-lg"
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
              "button bg-black uppercase p-4 w-full border-black text-lg duration-200 hover:bg-transparent"
            }
            type="submit"
          >
            Sign In
          </button>
        </Link>
        <button
          className={
            "toggleParticleButtonJoin w-3/5 bg-black uppercase p-3 border-black duration-200 text-sm hover:bg-transparent"
          }
          onClick={(e) => {
            particlesHandlerJoin();
            e.preventDefault();
          }}
        >
          Toggle Particles
        </button>
      </div>
    </div>
  );
}
