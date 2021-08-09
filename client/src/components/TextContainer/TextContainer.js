import React from "react";
import styles from "../../../styles/TextContainer.module.css";

const TextContainer = ({ users }) => (
  <div className={styles["textContainer"]}>
    {users ? (
      <div>
        <h1>People currently chatting:</h1>
        <div className={styles["activeContainer"]}>
          <h2>
            {users.map(({ name }) => (
              <div key={name} className={styles["activeItem"]}>
                {name}
                <Image alt="Online Icon" src="/icons/onlineIcon.png" layout="fill"/>
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
