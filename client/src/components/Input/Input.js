import React from "react";
import { Editor } from "@tinymce/tinymce-react";

import "./Input.css";

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />

    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

function App() {
  return (
    <Editor
      apiKey="no-api-key"
      init={{
        plugins: "emoticons",
        toolbar: "emoticons",
        toolbar_location: "bottom",
        menubar: true,
      }}
    />
  );
}
/* 

* addEmoji function for adding emoji in chats
* isTyping function to display the name of person typing

*/

export default App;
export default Input;
