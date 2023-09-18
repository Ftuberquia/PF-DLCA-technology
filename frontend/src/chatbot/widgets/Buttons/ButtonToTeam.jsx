import React from "react";
import { Link } from "react-router-dom";
import style from "./Button.module.css";

const ButtonToTeam = (props) => {
  const handleClick = () => {
    setTimeout(() => {
      const element = document.getElementById("team");
      if (element) element.scrollIntoView();
    }, 100);
  };
  return (
    <div className={style.containerBtn}>
      <Link to="/aboutUs">
        <button className={style.btn} onClick={handleClick}>
          <span>Team</span>
        </button>
      </Link>
    </div>
  );
};

export default ButtonToTeam;
