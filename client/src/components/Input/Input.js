import React, { lazy, useState, Suspense } from "react";
import Emojifier from "./emojify";
import Resizer from "react-image-file-resizer";

import "./Input.css";

import SendIcon from "@material-ui/icons/Send";
import SentimentSatisfiedSharpIcon from "@material-ui/icons/SentimentSatisfiedSharp";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";

const ToggleEmoji = lazy(() => import("../Emoji/ToggleEmoji"));

const Input = ({ setMessage, sendMessage, message }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);

  ////
  //
  const onChangePicture = async (e) => {
    Resizer.imageFileResizer(
      e.target.files[0],
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        setMessage({ ...message, image: uri });
      },
      "base64",
      100,
      100
    );
  };
  //
  ////

  ////
  //
  let files;
  const fileUploadHandler = () => {
    setFileUpload(!fileUpload);
  };

  if (fileUpload) {
    files = (
      <div className="fileUpload">
        <label for="imageFile">Choose Image</label>
        <button
          className="cancelButton"
          onClick={(e) => {
            ////
            setFileUpload(false);
            e.preventDefault();
            setMessage({ text: message.text, image: null });
            ////
          }}
        >
          Cancel
        </button>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          id="imageFile"
          onChange={onChangePicture}
        />
        <img src={message.image} className="imgPreview" />
      </div>
    );
  }
  //
  ////

  ////
  //
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

      <button
        className="uploadButton"
        onClick={(e) => {
          ////
          fileUploadHandler();
          setShowEmoji(false);
          e.preventDefault();
          ////
        }}
      >
        <PublishRoundedIcon />
      </button>

      <button
        className="EmojiButton"
        onClick={(e) => {
          ////
          setShowEmoji(!showEmoji);
          setFileUpload(false);
          e.preventDefault();
          ////
        }}
      >
        <SentimentSatisfiedSharpIcon />
      </button>

      <button
        className="sendButton"
        onClick={(e) => {
          ////
          if (message.text == "" && message.image == null) {
            console.log("Empty message");
          } else {
            sendMessage(e);
          }
          ////
          setMessage({ text: "", image: null });
          setFileUpload(false);
          setShowEmoji(false);
          e.preventDefault();
          ////
        }}
      >
        <SendIcon />
      </button>

      <div>
        <Suspense fallback={null}>
          <div className="listEmoji">
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
  //
  ////
};

export default Input;
