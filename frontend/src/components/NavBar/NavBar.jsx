import { Link, NavLink } from "react-router-dom";
import personIcon from "../../img/person.svg";
import heartIcon from "../../img/heart.svg";
import shoppingCartIcon from "../../img/shopping-cart.svg";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LocalStorageCache } from "@auth0/auth0-react";
import style from "./NavBar.module.css";
import TotalItems from "../../views/Cart/TotalItems";
import useLocalStorage from "./hooks/useLocalStorage";

export const cache = new LocalStorageCache();

const NavBar = () => {
  const { cart } = useSelector((state) => state?.cart || {});
  const { loginWithPopup, isAuthenticated, user } = useAuth0();
  // Utiliza el hook personalizado para obtener el valor actualizado desde LocalStorage
  const cartItemCount = useLocalStorage("cartProducts");

  useEffect(() => {
    // Cuando el usuario esté autenticado, envía los datos al servidor
    if (isAuthenticated && user) {
      const userData = {
        id: user.sub,
        first_name: user.given_name,
        last_name: user.family_name,
        username: user.nickname,
        email: user.email,
        // Otros campos de datos que quieras enviar
      };

      // Realiza la solicitud al servidor para guardar los datos del usuario
      axios
        .post("http://localhost:3001/users/", userData)
        .then((response) => {
          if (response.status === 200 || 201) {
            console.log("Usuario creado con éxito en el servidor");
            // Realizar acciones adicionales si es necesario
          } else {
            console.error("Error al crear el usuario en el servidor");
          }
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud al servidor:", error);
        });
      cache.set("userId", user.sub);
    }
  }, [isAuthenticated, user]);

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
      <div className={style.buyContainer}>
        <NavLink to={"/compra"} className={style.buy}>
          Comprar
        </NavLink>
      </div>
      <div className={style.buttons}>
        <NavLink to={"login"}>
          <img src={personIcon} alt="Login" onClick={() => loginWithPopup()} />
        </NavLink>
        <Link to={"/favorites"}>
          <img src={heartIcon} alt="Favorites" />
        </Link>
        <Link to={"/cart"} className={style.cart}>
          <img src={shoppingCartIcon} alt="Shopping Cart" />
          <TotalItems />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
