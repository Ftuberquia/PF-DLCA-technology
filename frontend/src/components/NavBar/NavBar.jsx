import { Link, NavLink } from "react-router-dom";
import personIcon from "../../img/person.svg";
import heartIcon from "../../img/heart.svg";
import shoppingCartIcon from "../../img/shopping-cart.svg";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import style from "./NavBar.module.css";
=======
>>>>>>> 75edfb517535600d789d7355803e570256188087
import axios from "axios";
import emailjs from '@emailjs/browser';
import { LocalStorageCache } from "@auth0/auth0-react";
import TotalItems from "../../views/Cart/TotalItems";
import useLocalStorage from "./hooks/useLocalStorage";
import style from "./NavBar.module.css";


export const cache = new LocalStorageCache();


const NavBar = () => {
  const { cart } = useSelector((state) => state?.cart || {});
  const { loginWithPopup, logout, isAuthenticated, user} = useAuth0();
  const [open, setOpen]= useState(false);
  // Utiliza el hook personalizado para obtener el valor actualizado desde LocalStorage
  const cartItemCount = useLocalStorage("cartProducts");

  const [welcomeEmailSent, setWelcomeEmailSent] = useState(false);


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

          // Verifica si el correo de bienvenida ya se ha enviado
          if (!welcomeEmailSent) {
            // Datos de configuración de EmailJS
            const serviceId = "service_u05znjz"; // Reemplaza con tu ID de servicio
            const templateId = "template_ech9g6n"; // Reemplaza con tu ID de plantilla
            const userId = "dl6sI5xgzMzAmHsFV"; // Reemplaza con tu ID de usuario

            // Datos para rellenar la plantilla de correo
            const emailParams = {
              from_email: "dlcatech01@gmail.com",
              to_name: user.given_name,
              to_email: user.email, // Incluye el correo electrónico del usuario
              // Agrega otros campos de datos si es necesario
            };

            // Envía el correo utilizando EmailJS
            emailjs
              .send(serviceId, templateId, emailParams, userId)
              .then((response) => {
                console.log("Correo de bienvenida enviado con éxito", response);
                // Marcar el estado para evitar enviar el correo nuevamente
                setWelcomeEmailSent(true);
              })
              .catch((error) => {
                console.error("Error al enviar el correo de bienvenida", error);
              });
          }
            
          } else {
            console.error("Error al crear el usuario en el servidor");
          }
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud al servidor:", error);
        });
      cache.set("userId", user.sub);
    }
  }, [isAuthenticated, user, welcomeEmailSent]);

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


        <div>
        <div className={style.buttons}>
          <img src={personIcon} alt="Users" onClick={() => setOpen(!open)} className=" h-20 w-20 object-cover border-4 border-gray-400 rounded-full cursor-pointer" />
        {
open &&(
  <div className="bg-white p-4 w-52 shadow-lg absolute -left-14 top-24">
  <ul>
  {
    <li><a href="Login" className={style.buy} onClick={() => loginWithPopup()}>Login </a>
    <p><a href="Profile" className={style.buy}>Perfil </a></p>
    <p><a href="Logout" className={style.buy} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout </a></p>   
    </li>      
    }
  </ul>
</div>
)}

          </div> 
    
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
