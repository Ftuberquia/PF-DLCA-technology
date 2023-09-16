import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Featured.module.css";

function Featured() {
  return (
    <div className={style.contAccesorios}>
      <div className={style.containerAccmt100}>
        <div className={style.titulo}>
          <h2>
            <span className={style.spanTitleAcc1}>💚</span> ¡DESTACADOS
            <span className={style.spanTitleAcc}> GAMER</span>!
          </h2>
        </div>
        <div className={style.cardcontainer}>
          <div className={style.cardmb30}>
            <NavLink to="/productos/22">
              <img
                src="https://i.ibb.co/zxp1fjm/img23.png"
                alt="Notebooks y Laptops"
              />
            </NavLink>
          </div>
          <div className={style.cardmb30}>
            <NavLink to="/productos/36">
              <img
                src="https://i.ibb.co/DtxVgrx/img299.png"
                alt="Periféricos"
              />
            </NavLink>
          </div>
          <div className={style.cardmb30}>
            <NavLink to="/productos/42">
              <img
                src="https://i.ibb.co/djrfxBd/img69.png"
                alt="Componentes PC"
              />
            </NavLink>
          </div>
          <div className={style.cardmb30}>
            <NavLink to="/productos/96">
              <img src="https://i.ibb.co/hRSLRDX/img273.jpg" alt="Accesorios" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
