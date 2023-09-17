import React from "react";
import style from "./Button.module.css";
import mailIcon from "../../../img/correo-icon.png";
import phoneIcon from "../../../img/phone-icon.png";
import wppIcon from "../../../img/wpp-icon.png";

const ButtonContact = () => {
  return (
    <div className={style.containerBtn}>
      <a href="mailto:admin@gmail.com">
        <button className={style.btnEmail}>
          <img src={mailIcon} alt="mail" />
        </button>
      </a>
      <a href="tel:+584141521511">
        <button className={style.btnTel}>
          <img src={phoneIcon} alt="phone" />
        </button>
      </a>
      <a href="https://api.whatsapp.com/send?phone=0123456789" target="_blank" rel="noreferrer">
        <button className={style.btnTel}>
          <img src={wppIcon} alt="wpp" style={{ width: "23px" }} />
        </button>
      </a>
    </div>
  );
};
export default ButtonContact;
