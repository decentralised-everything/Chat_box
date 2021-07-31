import React, { lazy, useState, Suspense } from "react";
import Emojifier from "./emojify";

import "./Input.css";

import SendIcon from "@material-ui/icons/Send";
import SentimentSatisfiedSharpIcon from "@material-ui/icons/SentimentSatisfiedSharp";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";

const ToggleEmoji = lazy(() => import("../Emoji/ToggleEmoji"));

const Input = ({ setMessage, sendMessage, message }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [imgData, setImgData] = useState(null);

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      setMessage(message + " " + toString(imgData));
    }
  };

  let files;

  const fileUploadHandler = () => {
    setFileUpload(!fileUpload);
  };

  if (fileUpload) {
    files = (
      <div className="fileUpload">
        <input
          type="file"
          accept="image/*"
          id="imageFile"
          onChange={onChangePicture}
        />
        <img src={imgData} className="imgPreview" />
      </div>
    );
  }

  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(Emojifier(value))}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />

      <div>{files}</div>

      <button
        className="uploadButton"
        onClick={(e) => {
          fileUploadHandler();
          e.preventDefault();
        }}
      >
        <PublishRoundedIcon fontSize="medium" />
      </button>

      <button
        className="EmojiButton"
        onClick={(e) => {
          setShowEmoji(!showEmoji);
          e.preventDefault();
        }}
      >
        <SentimentSatisfiedSharpIcon fontSize="medium" />
      </button>

      <button
        className="sendButton"
        onClick={(e) => {
          sendMessage(e);
          setImgData(null);
          setFileUpload(false);
        }}
      >
        <SendIcon fontSize="medium" />
      </button>

      <div>
        <Suspense fallback={null}>
          <div class="listEmoji">
            <ToggleEmoji
              showEmoji={showEmoji}
              setMessage={setMessage}
              message={message}
            />
          </div>
        </Suspense>
      </div>
    </form>
  );
};

export default Input;
