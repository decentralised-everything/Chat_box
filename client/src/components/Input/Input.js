import React, { lazy, useState, Suspense } from "react";
import Emojifier from "./emojify";

import "../../../styles/Input.css";

import SendIcon from "@material-ui/icons/Send";
import SentimentSatisfiedSharpIcon from "@material-ui/icons/SentimentSatisfiedSharp";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";

const ToggleEmoji = lazy(() => import("../Emoji/ToggleEmoji"));

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

  const Example = ({ imgData }) =>
    imgData ? <img src={`data:image/jpeg;base64,${imgData}`} /> : null;

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
        <img src={message.image} className="imgPreview" />
      </div>
    );
  }

  return (
    <form className="form">
      <input
        className="input"
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

      <div>{files}</div>
      <Example imgData={message.image} />

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
          setMessage({ text: "", image: null });
          setFileUpload(false);
          e.preventDefault();
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
