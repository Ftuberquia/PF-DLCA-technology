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
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-30">
              <img
                src="https://i.ibb.co/zxp1fjm/img23.png"
                alt="Notebooks y Laptops"
              />
              <NavLink to="/products"></NavLink>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-30">
              <img
                src="https://i.ibb.co/DtxVgrx/img299.png"
                alt="Periféricos"
              />
              <NavLink to="/products"></NavLink>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-30">
              <img
                src="https://i.ibb.co/djrfxBd/img69.png"
                alt="Componentes PC"
              />
              <NavLink to="/products"></NavLink>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-30">
              <img src="https://i.ibb.co/hRSLRDX/img273.jpg" alt="Accesorios" />
              <NavLink to="/products"></NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;