import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

import "../../../styles/Infobar.css";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="LeftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>

      <div className="RightInnerContainer">
        <a href="/">
          <img src={closeIcon} alt="close icon" />
        </a>
      </div>
    </div>
  </div>
);

export default InfoBar;
