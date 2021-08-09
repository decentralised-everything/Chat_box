import React from "react";

import "../../../../styles/Message.module.css";

import ReactEmoji from "react-emoji";

const Message = ({
    message: {
        data: { image, text },
        user,
    },
    name,
}) => {
    let isSentByCurrentUser = false;
    let img = null;
    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    if (image !== "") {
        // make an image element fom a base64 string
        img = <img src={image} />;
    }

    return isSentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
            <p className="pr-10 sentText">{trimmedName}</p>
            <div className="messageBox backgroundBlue">
                {img}
                <p className="messageText colorWhite">
                    {ReactEmoji.emojify(text)}
                </p>
            </div>
        </div>
    ) : (
        <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
                {img}
                <p className="messageText colorDark">
                    {ReactEmoji.emojify(text)}
                </p>
            </div>
            <p className="pl-10 sentText ">{user}</p>
        </div>
    );
};

export default Message;
