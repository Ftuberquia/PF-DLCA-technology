import React from "react";
import { Link } from "react-router-dom";
import style from "./Button.module.css";

const ButtonToProducts = () => {
  return (
    <div className={style.containerBtn}>
      <Link to="/productos">
        <button className={style.btn}>
          <span>Productos</span>
        </button>
      </Link>
    </div>
  );
};

export default ButtonToProducts;
