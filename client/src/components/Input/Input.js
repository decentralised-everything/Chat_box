import React from "react";
import Emojifier from "./emojify";
import "./Input.css";

import SendIcon from "@material-ui/icons/Send";

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

    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      <SendIcon fontSize="medium" />
    </button>
  </form>
);

export default Input;
