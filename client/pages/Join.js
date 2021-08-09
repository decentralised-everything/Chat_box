import { useState } from "react";
import Link from "next/link";
import Particles from "react-tsparticles";

import styles from "../styles/Join.module.css";

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
        <div className={styles["joinOuterContainer"]}>
            <div className={styles["particles"]}>{particlesJSXJoin}</div>
            <div className={styles["joinInnerContainer"]}>
                <h1 className={styles["heading"]}>Join</h1>
                <div>
                    <input
                        placeholder="Name"
                        className={styles["joinInput"]}
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder="Room"
                        className={styles["joinInput"]}
                        type="text"
                        onChange={(event) => setRoom(event.target.value)}
                    />
                </div>
                <Link
                    href={{
                        pathname: "/Chat",
                        query: {
                            name: name,
                            room: room,
                        },
                    }}
                >
                    <div
                        className={styles["button"]}
                        type="submit"
                        onClick={(e) =>
                            !name || !room ? e.preventDefault() : null
                        }
                    >
                        Sign In
                    </div>
                </Link>
                <div
                    className={styles["toggleParticleButtonJoin"]}
                    onClick={(e) => {
                        particlesHandlerJoin();
                        e.preventDefault();
                    }}
                >
                    Toggle Particles
                </div>
            </div>
        </div>
    );
}
