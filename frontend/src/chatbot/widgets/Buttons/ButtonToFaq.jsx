import React from "react";
import { Link } from "react-router-dom";
import style from "./Button.module.css";

const ButtonToFaq = () => {
  const handleClick = () => {
    setTimeout(() => {
      const element = document.getElementById("faq");
      if (element) element.scrollIntoView();
    }, 100);
  };
  return (
    <div className={style.containerBtn}>
      <Link to="/faq">
        <button className={style.btn} onClick={handleClick}>
          <span>Faq</span>
        </button>
      </Link>
    </div>
  );
};

export default ButtonToFaq;
