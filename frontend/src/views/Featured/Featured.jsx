import React from "react";
import { NavLink } from "react-router-dom";
import "./Featured.css";

function Featured() {
  return (
    <div className="contAccesorios">
      <div className="containerAcc mt-100">
        <div className="titleAcce">
          <h2>
            <span className="spanTitleAcc">💚</span> ¡DESTACADOS
            <span className="spanTitleAcc"> GAMER</span>!
          </h2>
        </div>
        <div className="card-container">
          <div className="card mb-30">
            <NavLink to="/productos">
              <img
                src="https://i.ibb.co/zxp1fjm/img23.png"
                alt="Notebooks y Laptops"
              />
              </NavLink>
            </div>
            <div className="card mb-30">
            <NavLink to="/productos">
              <img
                src="https://i.ibb.co/DtxVgrx/img299.png"
                alt="Periféricos"
              />
              </NavLink>
            </div>
            <div className="card mb-30">
            <NavLink to="/productos">
              <img
                src="https://i.ibb.co/djrfxBd/img69.png"
                alt="Componentes PC"
              />
              </NavLink>
            </div>
            <div className="card mb-30">
            <NavLink to="/productos">
              <img
                src="https://i.ibb.co/hRSLRDX/img273.jpg"
                alt="Accesorios"
              />
            </NavLink >
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;