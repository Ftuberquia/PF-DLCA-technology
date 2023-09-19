import React, { useState, useEffect } from "react";
import { Link, NavLink} from "react-router-dom";
import { useDispatch } from "react-redux";
import personIcon from "../../img/person-circle.svg";
import heartIcon from "../../img/heart.svg";
import shoppingCartIcon from "../../img/shopping-cart.svg";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import style from "./NavBar.module.css";
import { LocalStorageCache } from "@auth0/auth0-react";
import { saveUser } from "../../redux/actions";
import TotalItems from "../../views/Cart/TotalItems";
import useLocalStorage from "./hooks/useLocalStorage";
import { Dropdown, toggleDropdown } from "react-bootstrap";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export const cache = new LocalStorageCache();

const NavBar = () => {
  const {loginWithPopup, logout, isAuthenticated, user} = useAuth0();
  const dispatch = useDispatch()
  const handleLogin = () => {
    loginWithPopup();
  };

  const handleLogOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const [open, setOpen] = useState(false);
  // Utiliza el hook personalizado para obtener el valor actualizado desde LocalStorage
  const cartItemCount = useLocalStorage("cartProducts");

  const [welcomeEmailSent, setWelcomeEmailSent] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated && user) {
      const userId = user.sub;
      let userData={}
      if(user.email === "dlcareact@gmail.com"){
        userData = {
          id: userId,
          first_name: user.given_name,
          last_name: user.family_name,
          username: user.nickname,
          avatar_img: user.picture,
          email: user.email,
          admin: true
        };
        cache.set("userEmail", user.email )
      }else{
        userData = {
          id: userId,
          avatar_img: user.picture,
          first_name: user.given_name,
          last_name: user.family_name,
          username: user.nickname,
          email: user.email,
          address: user.direction,
          phone: user.phone,
      };
        cache.set("userEmail", user.email)
      }
      // Realiza la solicitud al servidor para guardar los datos del usuario
      axios.post("http://localhost:3001/users/", userData).then((response) => {
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
      });
      cargaDeCartDB(userId)
    }
  }, [isAuthenticated, user]);

  //carga de datos del localStorage a la base de datos
  async function cargaDeCartDB(userId){
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

    if (cartProducts && cartProducts.length > 0) {
      try {
        for (const product of cartProducts) {
          const { id, quantity } = product;
          const body = { quantity_prod: quantity };
  
          await axios.post(`carts/${userId}/${id}`, body);
          console.log(`Producto con ID ${id} cargado exitosamente en la base de datos`);
        }
        localStorage.removeItem("cartProducts");
        console.log("Productos eliminados del localStorage después de la carga exitosa a la base de datos");
      } catch (error) {
        console.error("Error al cargar los datos en la base de datos:", error);
      }
    }
  }


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
          Sobre DLCA
        </Link>
      </span>
      <span>
        <Link to={"/contacto"} className={style.links}>
          Contáctenos
        </Link>
      </span>
      {/* <div className={style.buyContainer}>
         <NavLink to={'/compra'} className={style.buy}>
              Comprar
         </NavLink>

       </div> */}
      {/* <div className={style.buttons}>
      <NavLink to={"login"} onClick={isAuthenticated ? undefined : () => loginWithPopup()}>
        {isAuthenticated ? (
          <button className={style.userboton2} onClick={handleLogout}>
            SALIR
          </button>
        ) : (
          ""
        )}
      </NavLink>
      </div> */}
      <div className={style.icons}>
        <Link to={"/favorites"}>
          <img src={heartIcon} alt="Favorites" />
        </Link>
        <Link to={"/carrito"} className={style.cart}>
          <img src={shoppingCartIcon} alt="Shopping Cart" />
          <div className={style.totals}></div>
          <TotalItems/>
        </Link>
        <br></br>
      </div>
      <div className={style.iconuser}>
        <div className={style.dropdown}>
          <button className={style.dropdownToggle} onClick={toggleDropdown}>
            <img src={personIcon} alt="Person" />
          </button>
          {dropdownOpen && (
            <div className={style.dropdownMenu}>
              <NavLink
                to={"login"}
                onClick={isAuthenticated ? undefined : handleLogin}
              >
                {isAuthenticated ? (
                  <button className={style.dropdownMenu} onClick={handleLogOut}>
                    Cerrar sesión
                  </button>
                ) : (
                  <button className={style.dropdownMenu} onClick={handleLogin}>
                    Iniciar sesión
                  </button>
                )}
              </NavLink>
            
              {/* <NavLink to="/" 
            //   className={style.dropdownItem}
            //   onClick={isAuthenticated ? undefined : () => loginWithRedirect()}>
            //    Cerrar sesión
            // </NavLink> */}
              <NavLink to="/login" className={style.dropdownItem}>
                Mi Perfil
              </NavLink>
              <NavLink
                to="/admin"
                className={style.dropdownItem}
              >
                Admin
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
