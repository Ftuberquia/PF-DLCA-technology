import { Link, NavLink } from "react-router-dom";
// import logo from "../../img/logo-dlca.png";
import personIcon from "../../img/person.svg";
import heartIcon from "../../img/heart.svg";
import shoppingCartIcon from "../../img/shopping-cart.svg";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import emailjs from '@emailjs/browser';
import { LocalStorageCache } from "@auth0/auth0-react";
export const cache = new LocalStorageCache()

import style from "./NavBar.module.css";

const NavBar = () => {
  const { cart } = useSelector((state) => state?.cart || {});
  const { loginWithPopup, isAuthenticated, user} = useAuth0();
  
  const [welcomeEmailSent, setWelcomeEmailSent] = useState(false);

  useEffect(() => {
    // Cuando el usuario esté autenticado, envía los datos al servidor
    if (isAuthenticated && user) {
      const userData = {
        id:user.sub,
        first_name: user.given_name,
        last_name: user.family_name,
        username: user.nickname,
        email: user.email,
        // Otros campos de datos que quieras enviar
      };
      
      // Realiza la solicitud al servidor para guardar los datos del usuario
      axios.post("http://localhost:3001/users/", userData)
        .then((response) => {
          if (response.status === 200|| 201) {
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
        cache.set("userId", user.sub)
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
