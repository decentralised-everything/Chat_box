import React from "react";
import Emojifier from "./emojify";
import "./Input.css";
import SendIcon from "@material-ui/icons/Send";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

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

/* 

* addEmoji function for adding emoji in chats
* isTyping function to display the name of person typing

*/

export default Input;
