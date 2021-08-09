import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";

import styles from "../../../styles/Messages.module.css";

const Messages = ({ messages, name }) => (
  <ScrollToBottom className={styles.messages}>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
