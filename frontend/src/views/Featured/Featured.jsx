import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import getdbProducts from "../../../redux/actions/index";
import "./Featured.css";
// import { useNavigate } from 'react-router-dom';

function Featured() {
  // const { AllProducts } = useSelector((state) => state);

  // const dispatch = useDispatch();

  //     const navigate = useNavigate()
  //     const click = ()=>{
  //         navigate('/products/featured')
  //     }

    return (
      <div className="contAccesorios">
        <div className="containerAcc mt-100">
          <div className="titleAcce">
            <h2>
              <span className="spanTitleAcc">💚</span> ¡OFERTAS
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
                <div className="card-body text-center">
                  <h4 className="card-title">Notebooks y Laptops</h4>
                  <p className="text-muted">A partir de $145</p>
                  <Link to="/home">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      data-abc="true"
                      // onClick={() => sortByCategory("Laptops")}
                    >
                      Ver Productos
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-30">
                <img
                  src="https://i.ibb.co/DtxVgrx/img299.png"
                  alt="Periféricos"
                />
                <div className="card-body text-center">
                  <h4 className="card-title">Periféricos</h4>
                  <p className="text-muted">A partir de $29</p>
                  <Link to="/home">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      data-abc="true"
                      // onClick={() => sortByCategory("perifericos")}
                    >
                      Ver Productos
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-30">
                <img
                  src="https://i.ibb.co/djrfxBd/img69.png"
                  alt="Componentes PC"
                />
                <div className="card-body text-center">
                  <h4 className="card-title">Componentes PC</h4>
                  <p className="text-muted">A partir de $289.99</p>
                  <Link to="/home">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      data-abc="true"
                      // onClick={() => sortByCategory("componentes")}
                    >
                      Ver Productos
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-30">
                <img
                  src="https://i.ibb.co/hRSLRDX/img273.jpg"
                  alt="Accesorios"
                />
                <div className="card-body text-center">
                  <h4 className="card-title">Accesorios</h4>
                  <p className="text-muted">A partir de $9.99</p>
                  <Link to="/home">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      data-abc="true"
                      // onClick={() => sortByCategory("Accesorios")}
                    >
                      Ver Productos
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Featured;