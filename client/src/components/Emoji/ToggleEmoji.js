import React from "react";
import emojiArray from "../Emoji/emoji.array";

const ToggleEmoji = ({ showEmoji, setMessage, message }) => {
  if (showEmoji) {
    return <ListEmoji setMessage={setMessage} message={message} />;
  } else return null;
};

const ListEmoji = ({ setMessage, message }) => {
  return (
    <div className="contents">
      {emojiArray.map((Emoji) => {
        return (
          <button
            className="emoji"
            key={Emoji}
            onClick={(e) => {
              e.preventDefault();
              setMessage({ ...message, text: message.text + Emoji });
            }}
          >
            {Emoji}
          </button>
        );
      })}
    </div>
  );
};

export default ToggleEmoji;
