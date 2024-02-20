import css from ".././styles/FirstTimeFormToggleCss.module.css";

import React from "react";

const FirstTimeFormToggle = ({ img, onClick, BtnText, MiddleText }) => {
  return (
    <div className={css.emptyData}>
      <div>
        <div className={css.emptyDataImgDiv}>
          <img src={img} alt="" />
        </div>
        <p>{MiddleText}</p>
        <button onClick={onClick}>{BtnText}</button>
      </div>
    </div>
  );
};

export default FirstTimeFormToggle;