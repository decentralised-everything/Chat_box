import React from "react";
import Image from "next/image";

import styles from "../../../styles/InfoBar.module.css";

const InfoBar = ({ room }) => (
    <div className={styles["infoBar"]}>
        <div className={styles["LeftInnerContainer"]}>
            <Image
                className={styles["onlineIcon"]}
                src={"/icons/onlineIcon.png"}
                alt="online icon"
                height={5}
                width={5}
            />
            <h3>{room}</h3>

            <div className={styles["RightInnerContainer"]}>
                <a href="/">
                    <Image
                        src="/icons/closeIcon.png"
                        alt="close icon"
                        height={10}
                        width={10}
                    />
                </a>
            </div>
        </div>
    </div>
);

export default InfoBar;
