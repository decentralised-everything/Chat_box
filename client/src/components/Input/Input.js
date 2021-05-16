import React, { useState } from "react";
import Emojifier from "./emojify";

import "./Input.css";
import emojiArray from "./emoji.array";

import SendIcon from "@material-ui/icons/Send";
import SentimentSatisfiedSharpIcon from '@material-ui/icons/SentimentSatisfiedSharp';

const [showEmoji, setShowEmoji] = useState(false);

const Input = ({ setMessage, sendMessage, message }) => (
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
      {
        if(showEmoji) {
          return (
            <ListEmoji className="listEmoji"/>
          );
        }
      }
     <button className="EmojiButton" onClick={() => setShowEmoji(!showEmoji)}>
      // emoji icon from material ui
    </button>
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      <SendIcon fontSize="medium" />
    </button>
  </form>
);

// z-index = 1
const ListEmoji = () => {
    emojiArray.map((Emoji) => {
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
    });
};

export default Input;
