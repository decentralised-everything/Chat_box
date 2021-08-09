import { useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import Particles from "react-tsparticles";

import TextContainer from "../src/components/TextContainer/TextContainer";
import Messages from "../src/components/Messages/Messages";
import InfoBar from "../src/components/InfoBar/InfoBar";
import Input from "../src/components/Input/Input";

import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import MusicNoteTwoToneIcon from "@material-ui/icons/MusicNoteTwoTone";
import MailSharpIcon from "@material-ui/icons/MailSharp";

import styles from "../styles/Chat.module.css";

const ENDPOINT = "http://192.168.100.150:5000"; //"https://genesis-chat-box.herokuapp.com/";

let socket;

const Chat = () => {
    console.log("heyy")
    const [users, setUsers] = useState("");
    const [message, setMessage] = useState({ text: "", image: null });
    const [messages, setMessages] = useState([]);
    const [particlesAnimationChat, setParticlesAnimationChat] = useState(true);
    const router = useRouter();
    const { name, room } = router.query;
    socket = io(ENDPOINT);

    socket.emit("join", { name, room }, (error) => {
        if (error) {
            // alert(error);
        }
        socket.on("message", (message) => {
            setMessages((messages) => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    });

    // useEffect(() => {
    //     return () => {
    //         socket.off("message", () => {});
    //         socket.off("roomData", () => {});
    //         socket.disconnect();
    //     };
    // }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit("sendMessage", message, () =>
                setMessage({ text: "", image: null })
            );
        }
    };

    const particlesHandlerChat = () => {
        setParticlesAnimationChat(!particlesAnimationChat);
    };

    let ParticlesJSXChat = () => null;

    if (particlesAnimationChat) {
        ParticlesJSXChat = () => (
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
        <div className={styles["App"]}>
            <div className={styles["outerContainer"]}>
                <div className={styles["particles"]}>
                    <ParticlesJSXChat />
                </div>
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
                <div className={styles["container"]}>
                    <InfoBar room={room} />
                    <Messages messages={messages} name={name} />
                    <Input
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />
                </div>
                <div className={styles["rightContainer"]}>
                    <TextContainer users={users} />
                    <div className={styles["buttonContainer"]}>
                        <button
                            className={styles["toggleParticleButtonChat"]}
                            onClick={(e) => {
                                e.preventDefault();
                                particlesHandlerChat();
                            }}
                        >
                            Toggle Particles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
