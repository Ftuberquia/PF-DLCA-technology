import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import style from "./Landing.module.css";
import BrandCarousel from "./BrandCarousel/BrandCarousel";
import Carousel from "../Carousel/Carousel";
import Featured from "../../views/Featured/Featured";
// import Ofertas from "../../views/Ofertas/Ofertas";
import { Link } from "react-router-dom";
import Logo from "../../img/logo-dlca.png";
import Cards from "../Cards/Cards";
import SearchBar from "../SearchBar/SearchBar";
import AssociatedBrands from "../AssociatedBrands/AssociatedBrands";
import Services from "../Services/Services";
import Questions from "../Questions/Questions";


function Landing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // datos de axios de bd y setProducts con la respuesta
  }, []);

  return (
    <div className={style.containerLanding}>
      <SearchBar />
      <Carousel />
      <div className={style.card1}>
        <AssociatedBrands />
      </div>
      <Featured />
      <div className={style.contPcMarcas}>
        <div className={style.imgArmaPC}>
          {/* <Link to="/products">
            <img
              src="https://i.ibb.co/8BWqRFY/carousel-img3.jpg"
              alt=""
            />
          </Link> */}
        </div>
        {/* <div className={style.card}>
          {products.map((product) => (
            <Card
              key={product.id}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          ))}
        </div> */}
        <div>
        <div className={style.globo}>
          <img
            className={style.imgPres}
            src="https://i.ibb.co/GHM1qNZ/clientes-felices.jpg"
            alt=""
          />
          <p className={style.texto}>
            Somos una empresa comprometida con la calidad y excelencia en la
            industria de la tecnología. Ofrecemos una amplia gama de productos
            de alta calidad y a los mejores precios. Contamos con un equipo de 
            profesionales capacitados en brindar un servicio excepcional de 
            atención a nuestros clientes y proveedores. En DLCA Technology, nos
            esforzamos por ser líderes en la industria y proporcionar soluciones
            confiables y eficientes para todos nuestros clientes.
          </p>
        </div>
        </div>
        <div className={style.pcgamer}>
          <Link to="/products">
            <img src="https://i.ibb.co/Xprs2Rs/pc-gamer2.jpg" alt="" />
          </Link>
        </div>
        
        <Questions />
        <section className={style.banners}>
          <div className={style.bannerOne}>
            <Link to="productos/categories">
              <img src="https://i.ibb.co/0Jq8gFp/silla.png" alt="" />
            </Link>
            <Link to="productos/categories">
              <img src="https://i.ibb.co/7Wy35YX/mouse.png" alt="" />
            </Link>
            <Link to="productos/categories">
              <img src="https://i.ibb.co/9vdX4Rc/laptop.png" alt="" />
            </Link>
          </div>
          <div>
            <h2 className={style.title2}>Los mejores productos!!</h2>
          </div>
          <div className={style.bannerTwo}>
            <Link to="productos/categories">
              <img src="https://i.ibb.co/2382ZKh/impresora.png" alt="" />
            </Link>
            <Link to="productos/categories">
              <img src="https://i.ibb.co/BL8s2zv/cooling.png" alt="" />
            </Link>
            <Link to="productos/categories">
              <img src="https://i.ibb.co/dtHLpP3/consola.png" alt="" />
            </Link>
          </div>
        </section>

        <Services />
        <div>
          <h2 className={style.titleMarcas}>
            ¡Las mejores marcas las encuentras en
            <span className={style.spanTitle}>DLCA TECHNOLOGY!</span>
          </h2>
        </div>
        <BrandCarousel />
        <br />
        <br />
      </div>
      <div className={style.logoPartners}>
        <img src={Logo} alt="" />
        <h3 className={style.titlePartners}>
          Somos distribuidores certificados de las principales marcas de
          tecnología del país.
        </h3>
      </div>
    </div>
  );
}

export default Landing;
