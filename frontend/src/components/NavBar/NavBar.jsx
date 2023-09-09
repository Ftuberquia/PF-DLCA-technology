import { Link, NavLink } from "react-router-dom";
// import logo from "../../img/logo-dlca.png";
import personIcon from "../../img/person.svg";
import heartIcon from "../../img/heart.svg";
import shoppingCartIcon from "../../img/shopping-cart.svg";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";

const NavBar = () => {
  const { cart } = useSelector((state) => state?.cart || {});
  const { loginWithPopup} = useAuth0();

  return (
    <nav className={style.navbar}>
      <Link to={"/"}>
        {/* <img src={logo} className={styles.logo} alt="Logo" /> */}
      </Link>
      <span>
        <Link className={style.name} to={"/"}>
          DLCA TECHNOLOGY
        </Link>
      </span>
      <span className={style.searchbar}>
      <SearchBar />
      </span>
      <span>
        <Link className={style.links} to={"/productos"}>
          Productos
        </Link>
      </span>
      <span>
        <Link to={"/about"} className={style.links}>
          Sobre nosotros
        </Link>
      </span>
      <span>
        <Link to={"/contacto"} className={style.links}>
          Contáctenos
        </Link>
      </span>
       <li>
         <NavLink to={'/compra'} className={style.links}>
              Comprar
         </NavLink>
       </li>
      <div className={style.buttons}>
        <NavLink to={"login"} >
          <img src={personIcon} alt="Login" onClick={() => loginWithPopup()} />
        </NavLink>
        <Link to={"/favorites"}>
          <img src={heartIcon} alt="Favorites" />
        </Link>
        <Link to={"/cart"} className={style.cart}>
          <img src={shoppingCartIcon} alt="Shopping Cart" />
          <span>{cart?.total_items ? cart?.total_items : "0"}</span>
        </Link>
      </div>
    </nav>
  );
};


export default NavBar;