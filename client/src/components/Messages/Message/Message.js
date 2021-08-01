import React from "react";

import "./Message.css";

import ReactEmoji from "react-emoji";

const Message = ({ message: { data: {text, image}, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="pr-10 sentText">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}{`\nimage: ${image}`}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}{`\nimage: ${image}`}</p>
      </div>
      <p className="pl-10 sentText ">{user}</p>
    </div>
  );
};

export default Message;
