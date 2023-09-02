import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./NavBar.module.css";
import "./NavBar.css";
import Logo from "../../img/logo-dlca.png";
import {
  faMoon,
  faHeart,
  faCartShopping,
  faUser,
  faCaretDown,
  faRightToBracket,
  faUserPlus,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import Responsive from "./Responsive";


function NavBar() {
  // Para saber cuantos elementos se agregaron a favoritos
  // const favs = useSelector((state) => state.favorites);
  // const cart = useSelector((state) => state.cart);

  //para manejar el dropdown
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(true);
  const [openCat, setOpenCat] = useState(false);
  const [closedCat, setClosedCat] = useState(true);

  let menuRef = useRef();
  // let favsChange = useRef(favs);
  // let [prueba, setPrueba] = useState(0);
  
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        setClosed(false);
        setOpenCat(false);
        setClosedCat(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const dispatch = useDispatch();
 
  return (
    <div className={styles.navBar}>
      <section className={styles.navResponsive}>
        <h4>DLCA TECHNOLOGY</h4>
        <Responsive />
      </section>
      <section className={styles.one}>
        <div>
          <h1>
            <a href="/home">DLCA Technology</a>
          </h1>
          <img src={Logo} alt="logo" className="logo" />
          <div className={styles.navDetail}>
            {/* <Link to={loggedUser.user_id? "/cart" : "/login"}> */}
              <span className={styles.iconsbtn}>
                <FontAwesomeIcon name="cart" icon={faCartShopping} />
                {/* &nbsp;&nbsp; {loggedUser.user_id? cart.length : 0} */}
              </span>
            {/* </Link> */}
            {/* {!Object.keys(loggedUser).length ? ( */}
              <span
                className={styles.iconsbtn}
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <FontAwesomeIcon icon={faUser} />
                &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            {/* ) : ( */}
              <span
                className={styles.iconsbtn}
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {/* <img
                  className={styles.profilePicture}
                  // src={loggedUser.profilePicture}
                  alt=""
                />{" "} */}
              </span>
            {/* ); */}
          </div>
        </div>
      </section>
      <section className={styles.two}> 
        <div>
          <NavLink to="/home">
            <p>HOME</p>
          </NavLink>
          <NavLink to="/about">
            <p>SOBRE NOSOTROS</p>
          </NavLink>
          <NavLink to="/products">
            <p>PRODUCTOS</p>
          </NavLink>
          <p
            onMouseOver={() => {
              setOpenCat(!openCat);
            }}
            onMouseOut={() => {
              setOpenCat(!closedCat);
            }}
          >
            CATEGORIAS
          </p>
          <NavLink to="/compras">
            <p>VER ESTADO DEL PEDIDO</p>
          </NavLink>
        </div>
      </section>
      {/* CATEGORIA DROPDOWN */}
      <div
        className={`dropdown-menu-cat ${openCat ? "active" : "inactive"}`}
        onMouseEnter={() => {
          setOpenCat(!open);
        }}
        onMouseLeave={() => {
          setOpenCat(!closedCat);
        }}
      >
        <ul>
          <Link to="/category/Accesorios">
            {" "}
            <DropdownItemCat text={"Accesorios"} />
          </Link>
          <Link to="/category/Audifonos">
            {" "}
            <DropdownItemCat text={"Audífonos"} />
          </Link>
          <Link to="/category/Consolas">
            {" "}
            <DropdownItemCat text={"Consolas"} />
          </Link>
          <Link to="/category/Laptop">
            {" "}
            <DropdownItemCat text={"Laptop"} />
          </Link>
          <Link to="/category/Fuentes%20Tarjetas%20y%20Reguladores">
            {" "}
            <DropdownItemCat text={"Fuentes Tarjetas y Reguladores"} />
          </Link>
          <Link to="/category/Mobiliario%20y%20Sillas">
            {" "}
            <DropdownItemCat text={"Mobiliario y Sillas"} />
          </Link>
          <Link to="/category/Monitores">
            {" "}
            <DropdownItemCat text={"Monitores"} />
          </Link>
          <Link to="/category/Perifericos%20e%20Impresoras">
            {" "}
            <DropdownItemCat text={"Periféricos e Impresoras"} />
          </Link>
        </ul>
        <ul>
          <Link to="/category/Procesadores%20y%20CPU">
            {" "}
            <DropdownItemCat text={"Procesadores y CPU"} />
          </Link>
          <Link to="/category/Seguridad">
            {" "}
            <DropdownItemCat text={"Seguridad"} />
          </Link>
          <Link to="/category/Teclados">
            {" "}
            <DropdownItemCat text={"Teclados"} />
          </Link>
        </ul>
      </div>

      {/* USUARIO REGISTRADO */}
      <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
        <h3>USUARIO</h3>
        <span>Bienvenido/a a DLCA Technology</span>
          <ul>
            <DropdownItem icon = {faUser} text={"My Profile"}/>
            {/* <DropdownItem icon = {faRightFromBracket} text={"Log Out"}/> */}
          </ul>
        </div>

      {/* INVITADO */}
      {/* {!Object.keys(loggedUser).length ? ( */}
        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <h3>INICIAR SESIÓN</h3>
          <span>Mejora tu experiencia</span>
          <ul>
            <Link to="/login">
              <DropdownItem icon={faRightToBracket} text={"Log In"} />
            </Link>

            <Link to="/register">
              <DropdownItem icon={faUserPlus} text={"Check In"} />
            </Link>
          </ul>
        </div>
      {/* ) : ( */}
        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          {/* <h3>BIENVENIDO {loggedUser.username}</h3> */}
          <span>Gracias por confiar en DLCA Technology</span>
          <ul>
            <Link to="/profile">
              <DropdownItem icon={faRightToBracket} text={"Mi perfil"} />
            </Link>
            {/* <Link to="/login" onClick={() => logoutUser()}>
                <DropdownItem
                  icon={faRightToBracket}
                  text={"Log Out"}
                />
            </Link> */}
           </ul> 
       </div>
     {/* );  */}
     </div>
 );
 }

function DropdownItem(props) {
  return (
    <li className={styles.dropdownItem}> 
      {/* <img src={props.img}></img> */}
      <FontAwesomeIcon icon={props.icon} />
      {/* <a>{props.text}</a> */}
    </li>
  );
}

function DropdownItemCat(props) {
  return (
    <li className={styles.dropdownItem}>
      {/* <a>{props.text}</a> */}
    </li>
  );
}

export default NavBar;