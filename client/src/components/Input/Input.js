import React, { useState } from "react";
import Emojifier from "./emojify";

import styles from "../../../styles/Input.module.css";

import SendIcon from "@material-ui/icons/Send";
import SentimentSatisfiedSharpIcon from "@material-ui/icons/SentimentSatisfiedSharp";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";

import ToggleEmoji from "../Emoji/ToggleEmoji";

const Input = ({ setMessage, sendMessage, message }) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [fileUpload, setFileUpload] = useState(false);

    const onChangePicture = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setMessage({ ...message, image: reader.result });
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const Example = ({ imgData }) => {
        if (!imgData || imgData === "") return null;
        return <img src={`${imgData}`} />;
    };
    let Files = () => null;

    const fileUploadHandler = () => {
        setFileUpload(!fileUpload);
    };

    if (fileUpload) {
        Files = () => (
            <div className={styles["fileUpload"]}>
                <input
                    type="file"
                    accept="image/*"
                    id="imageFile"
                    onChange={onChangePicture}
                />
                <img src={message.image} className={styles["imgPreview"]} />
            </div>
        );
    }

    return (
        <form className={styles["form"]}>
            <input
                className={styles["input"]}
                type="text"
                placeholder="Type a message..."
                value={message.text}
                onChange={({ target: { value } }) =>
                    setMessage({ ...message, text: Emojifier(value) })
                }
                onKeyPress={(event) =>
                    event.key === "Enter" ? sendMessage(event) : null
                }
            />

            <div>
                <Files />
            </div>
            <Example imgData={message.image} />

            <button
                className={styles["uploadButton"]}
                onClick={(e) => {
                    fileUploadHandler();
                    e.preventDefault();
                }}
            >
                <PublishRoundedIcon fontSize="medium" />
            </button>
            <button
                className={styles["EmojiButton"]}
                onClick={(e) => {
                    setShowEmoji(!showEmoji);
                    e.preventDefault();
                }}
            >
                <SentimentSatisfiedSharpIcon fontSize="medium" />
            </button>

            <button
                className={styles["sendButton"]}
                onClick={(e) => {
                    sendMessage(e);
                    setMessage({ text: "", image: null });
                    setFileUpload(false);
                    e.preventDefault();
                }}
            >
                <SendIcon fontSize="medium" />
            </button>

            <div>
                <div className={styles["listEmoji"]}>
                    <ToggleEmoji
                        showEmoji={showEmoji}
                        setMessage={setMessage}
                        message={message}
                    />
                </div>
            </div>
        </form>
    );
};

export default Input;
