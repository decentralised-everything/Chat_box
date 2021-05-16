import React, { lazy, useState, Suspense } from "react";
import Emojifier from "./emojify";

import "./Input.css";

import SendIcon from "@material-ui/icons/Send";
import SentimentSatisfiedSharpIcon from "@material-ui/icons/SentimentSatisfiedSharp";

const ToggleEmoji = lazy(() => import("../Emoji/ToggleEmoji"));

const Input = ({ setMessage, sendMessage, message }) => {
  const [showEmoji, setShowEmoji] = useState(false);
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

      <button
        className="EmojiButton"
        onClick={(e) => {
          setShowEmoji(!showEmoji);
          e.preventDefault();
        }}
      >
        <SentimentSatisfiedSharpIcon fontSize="medium" />
      </button>

      <button className="sendButton" onClick={(e) => sendMessage(e)}>
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
