import React, { useEffect, useState } from 'react';
import "./Landing.css";
import BrandCarousel from "./BrandCarousel/BrandCarousel";
import Carousel from "../Carousel/Carousel";
import Featured from "../../views/Featured/Featured";
import { Link } from "react-router-dom";
import Logo from "../../img/logo-dlca.png";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import AssociatedBrands from '../AssociatedBrands/AssociatedBrands';

function Landing() {
  // const [products, setProducts] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // datos de axios de bd y setProducts con la respuesta
  }, []);
  

  return (
    <div className="containerLanding">
      <NavBar />
      <SearchBar />
      <Carousel />
      <div className="card1">
      <AssociatedBrands />
      </div>
      <div className="contImgCompra">
        <div className="imgCompra">
          <Link to="/products">
            <img
              src="https://i.ibb.co/4P9PR6x/laptop-promo-banner.jpg"
              alt=""
            />
          </Link>
        </div>
      </div>
      <Featured />
      <div className="contPcMarcas">
        <div className="imgArmaPC">
          <Link to="/products">
            <img
              src="https://i.ibb.co/8BWqRFY/carousel-img3.jpg"
              alt=""
            />
          </Link>
        </div>
        <div>
          <Cards />
        </div>
      <div>
          <h2 className="titleMarcas">
            ¡Las mejores marcas las encuentras en
            <span className="spanTitle">DLCA TECHNOLOGY!</span>
          </h2>
        </div>
        <BrandCarousel />
        <br />
        <br />
      </div>
      <div className="logoPartners">
        <img src={Logo} alt="" />
        <h3 className="titlePartners">
          Somos distribuidores certificados de las principales marcas de tecnología del país.
        </h3>
      </div>
    </div>
  );
}

export default Landing;