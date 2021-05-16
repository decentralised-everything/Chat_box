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
      <ListEmoji showEmoji={showEmoji} setMessage={setMessage} />

      <button className="EmojiButton" onClick={() => setShowEmoji(!showEmoji)}>
        <SentimentSatisfiedSharpIcon fontSize="medium" />
      </button>
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        <SendIcon fontSize="medium" />
      </button>
    </form>
  );
};
const ToggleEmoji = ({ showEmoji, setMessage }) => {
  if (showEmoji) {
    return <ListEmoji setMessage={setMessage} className="listEmoji" />;
  } else return null;
};

// z-index = 1
const ListEmoji = ({ setMessage }) => {
  return (
    <>
      {emojiArray.map((Emoji) => {
        return (
          <button
            className="emoji"
            onClick={({ target: { value } }) =>
              setMessage(Emojifier(value) + Emoji)
            }
          >
            {Emoji}{" "}
          </button>
        );
      })}
    </>
  );
};

export default Input;
