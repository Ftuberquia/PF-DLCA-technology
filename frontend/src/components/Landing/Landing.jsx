import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import "./Landing.css";
import CarouselMarcas from "./CarouselMarcas/CarouselMarcas";
import Carousel from "../Carousel/Carousel";
import Ofertas from "../../views/Ofertas/Ofertas";
import { Link } from "react-router-dom";
import Logo from "../../img/logo-dlca.png";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";

function Landing() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // datos de axios de bd y setProducts con la respuesta
  }, []);

  return (
    <div className="containerLanding">
      <NavBar />
      <SearchBar />
      <Carousel />
      <div className="contImgCompra">
        <div className="imgCompra">
          <Link to="/ofertas">
            <img
              src="https://i.ibb.co/4P9PR6x/laptop-promo-banner.jpg"
              alt=""
            />
          </Link>
        </div>
      </div>
      <Ofertas />
      <div className="contPcMarcas">
        <div className="imgArmaPC">
          <Link to="/">
            <img
              src="https://i.ibb.co/8BWqRFY/carousel-img3.jpg"
              alt=""
            />
          </Link>
        </div>
        <div>
          <Cards />
        </div>
        <div className="card">
          {products.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
      <div>
          <h2 className="titleMarcas">
            ¡Las mejores marcas las encuentras en
            <span className="spanTitle">DLCA TECHNOLOGY!</span>
          </h2>
        </div>
        <CarouselMarcas />
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