import React from "react";
import "./Landing.css";
import CarouselMarcas from "./CarouselMarcas/CarouselMarcas";
import Promos from "./Promos/Promos";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-dlca.png";

function Landing() {
  

  return (
    <div className="containerLanding">
      <div className="containerCarousel1">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="true"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="4"
              aria-label="Slide 5"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="5"
              aria-label="Slide 6"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="6"
              aria-label="Slide 7"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="7"
              aria-label="Slide 8"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://i.ibb.co/mSb1gMD/xbox-logo.png"
                className="d-block"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://i.ibb.co/S337r9h/intel-logo.png"
                className="d-block"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://i.ibb.co/cyq8m1t/Cooler-Master-Logo.png"
                className="d-block"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://i.ibb.co/gJtSpB1/hiperx-logo.jpg"
                className="d-block"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://i.ibb.co/f1TSvm3/redragon-logo.jpg"
                className="d-block"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://i.ibb.co/2FbJ4qt/samsung-logo.jpg"
                className="d-block"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://i.ibb.co/FmNGB6g/playstation-logo.png"
                className="d-block"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://i.ibb.co/rZT2K6S/razer-logo.jpg"
                className="d-block"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="contImgCompra">
        <div className="imgCompra">
          <Link to="/home">
            <img
              src="https://i.ibb.co/4P9PR6x/laptop-promo-banner.jpg"
              alt=""
            />
          </Link>
        </div>
      </div>
      <Promos></Promos>
      <div className="contPcMarcas">
        <div className="imgArmaPC">
          <Link to="/">
            <img
              src="https://i.ibb.co/YtDPhp2/banner-gaming-1img.jpg"
              alt=""
            />
          </Link>
        </div>
        <div>
          <h2 className="titleMarcas">
            ¡Las mejores marcas las encuentras en
            <span className="spanTitle">DLCA TECHNOLOGY!</span>
          </h2>
        </div>
        <CarouselMarcas></CarouselMarcas>
        <br />
        <br />
      </div>
      <div className="logoPartners">
        <img src={logo} alt="" />
        <h3 className="titlePartners">
          Somos distribuidores certificados de las principales marcas de tecnología del país.
        </h3>
      </div>
    </div>
  );
}

export default Landing;