import { Link, NavLink } from "react-router-dom";
import personIcon from "../../img/person.svg";
import heartIcon from "../../img/heart.svg";
import shoppingCartIcon from "../../img/shopping-cart.svg";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from '@emailjs/browser';
import style from "./NavBar.module.css"
import { LocalStorageCache } from "@auth0/auth0-react";

import TotalItems from "../../views/Cart/TotalItems";
import useLocalStorage from "./hooks/useLocalStorage";
import style from "./NavBar.module.css";

export const cache = new LocalStorageCache()

const NavBar = () => {
  const { cart } = useSelector((state) => state?.cart || {});
  const { loginWithPopup, logout, isAuthenticated, user} = useAuth0();

  const handleLogOut = () =>{
    logout({ logoutParams: {returnTo: window.location.origin }})
  }

  const [open, setOpen]= useState(false);
  // Utiliza el hook personalizado para obtener el valor actualizado desde LocalStorage
  const cartItemCount = useLocalStorage("cartProducts");

  const [welcomeEmailSent, setWelcomeEmailSent] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {

      const userId = user.sub;

      const userData = {

        id: userId,
        first_name: user.given_name,
        last_name: user.family_name,
        username: user.nickname,
        email: user.email,
      };
            // Realiza la solicitud al servidor para guardar los datos del usuario
      axios.post("http://localhost:3001/users/", userData)
        .then((response) => {
          if (response.status === 201) {
     
            console.log("Usuario creado con éxito en el servidor");

            // NO DESCOMENTAR LAS LINEAS ABAJO! ES LA FUNCIONALIDAD DEL CORREO, PARA NO GASTAR LA CUOTA
            // GRATIS DE CORREO QUE TENEMOS!!!!!!

          //   // Datos de configuración de EmailJS
          //   const serviceId = "service_u05znjz"; // Reemplaza con tu ID de servicio
          //   const templateId = "template_ech9g6n"; // Reemplaza con tu ID de plantilla
          //   const userId = "dl6sI5xgzMzAmHsFV"; // Reemplaza con tu ID de usuario

          //   // Datos para rellenar la plantilla de correo
          //   const emailParams = {
          //     from_email: "dlcatech01@gmail.com",
          //     to_name: user.given_name,
          //     to_email: user.email,
          //     // Agrega otros campos de datos si es necesario
          //   };
  
          //  // Envía el correo utilizando EmailJS
          //  emailjs
          //    .send(serviceId, templateId, emailParams, userId)
          //    .then((response) => {
          //      console.log("Correo de bienvenida enviado con éxito", response);
          //    })
          //    .catch((error) => {
          //      console.error("Error al enviar el correo de bienvenida", error);
          //    });
          }
        })
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
         <NavLink to={'/compra'} className={style.buy}>
              Comprar
         </NavLink>

       </div>
      <div className={style.buttons}>
      <NavLink to={"login"} onClick={isAuthenticated ? undefined : () => loginWithPopup()}>
        {isAuthenticated ? (
          <button className={style.userboton2} onClick={handleLogOut}>
            SALIR
          </button>
        ) : (
          "INGRESAR"
        )}
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
