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
            onClick={(e) => {
              e.preventDefault();
              setMessage(message + Emoji);
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
