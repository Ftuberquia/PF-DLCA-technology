import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./NavBar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>
        Home
      </Link>
      <Link to="/productos" className={styles.link}>
        Productos
      </Link>
      <Link to="/about" className={styles.link}>
        About
      </Link>
      <div className={styles.icons}>
        <Link to="/carrito" className={styles.iconLink}>
          <FontAwesomeIcon icon={faShoppingCart} className={styles.icon} />
        </Link>
        <Link to="/favoritos" className={styles.iconLink}>
          <FontAwesomeIcon icon={faHeart} className={styles.icon} />
        </Link>
        <Link to="/login" className={styles.link}>
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;