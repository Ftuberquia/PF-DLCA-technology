import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import getdbProducts from "../../../redux/actions/index";
import "./Ofertas.css";
// import { useNavigate } from 'react-router-dom';

function Ofertas() {
  // const { AllProducts } = useSelector((state) => state);

  // const dispatch = useDispatch();

      // const navigate = useNavigate()
      // const click = ()=>{
      //     navigate('/Ofertas')
      // }
  return (
          
    <div className="contAccesorios">
      <div className="containerAcc mt-100">
        <div className="titleAcce">
          <h2>
            <span className="spanTitleAcc">💚</span> ¡OFERTAS
            <span className="spanTitleAcc"> GAMER</span>!
          </h2>
        </div>
        <div className="rowAcc">
          <div className="col-md-4 col-sm-6">
            <div className="card mb-30">
              <span className="card-img-tiles" data-abc="true">
                <div className="inner">
                  <div className="main-img">
                    <Link to="/detail/23">
                      <img
                        src="https://i.ibb.co/zxp1fjm/img23.jpg"
                        alt="Category"
                      />
                    </Link>
                  </div>
                  <div className="thumblist">
                    <Link to="/detail/21">
                      <img
                        src="https://i.ibb.co/233dn6t/img21.jpg"
                        alt="Category"
                      />
                    </Link>
                    <Link to="/detail/22">
                      <img
                        src="https://i.ibb.co/8nyvYnt/img22.jpg"
                        alt="Category"
                      />
                    </Link>
                  </div>
                </div>
              </span>
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
          <div className="col-md-4 col-sm-6">
            <div className="card mb-30">
              <span className="card-img-tiles" data-abc="true">
                <div className="inner">
                  <div className="main-img">
                    <Link to="/detail/299">
                      <img
                        src="https://i.ibb.co/DtxVgrx/img299.png"
                        alt="Category"
                      />
                    </Link>
                  </div>
                  <div className="thumblist">
                    <Link to="/detail/161">
                      <img
                        src="https://i.ibb.co/z6Mz6T2/img161.jpg"
                        alt="Category"
                      />
                    </Link>
                    <Link to="/detail/199">
                      <img
                        src="https://i.ibb.co/4JFY0wb/img199.jpg"
                        alt="Category"
                      />
                    </Link>
                  </div>
                </div>
              </span>
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
          <div className="col-md-4 col-sm-6">
            <div className="card mb-30">
              <span className="card-img-tiles" data-abc="true">
                <div className="inner">
                  <div className="main-img">
                    <Link to="/detail/69">
                      <img
                        src="https://i.ibb.co/djrfxBd/img69.jpg"
                        alt="Category"
                      />
                    </Link>
                  </div>
                  <div className="thumblist">
                    <Link to="/detail/103">
                      <img
                        src="https://i.ibb.co/HhnWFHs/img103.jpg"
                        alt="Category"
                      />
                    </Link>
                    <Link to="/detail/66">
                      <img
                        src="https://i.ibb.co/BTFjc7Q/img66.jpg"
                        alt="Category"
                      />
                    </Link>
                  </div>
                </div>
              </span>
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
        </div>
      </div>
    </div>
  );
};

export default Ofertas;