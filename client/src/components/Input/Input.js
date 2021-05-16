import React, { useState } from "react";
import Emojifier from "./emojify";

import "./Input.css";
import emojiArray from "./emoji.array";

import SendIcon from "@material-ui/icons/Send";
import SentimentSatisfiedSharpIcon from "@material-ui/icons/SentimentSatisfiedSharp";

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
        <div class="listEmoji">
          <ToggleEmoji showEmoji={showEmoji} setMessage={setMessage} />
        </div>
      </div>
    </form>
  );
};

const ToggleEmoji = ({ showEmoji, setMessage }) => {
  if (showEmoji) {
    return <ListEmoji setMessage={setMessage} />;
  } else return null;
};

const ListEmoji = ({ setMessage }) => {
  return (
    <>
      {emojiArray.map((Emoji) => {
        return (
          <button className="emoji" onClick={(e) => e.preventDefault()}>
            {Emoji}
          </button>
        );
      })}
    </>
  );
};

export default Input;
