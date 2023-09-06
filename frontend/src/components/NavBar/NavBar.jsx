import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
// import logo from "../../img/logo-dlca.png";
import personIcon from "../../img/person.svg";
import heartIcon from "../../img/heart.svg";
import shoppingCartIcon from "../../img/shopping-cart.svg";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { cart } = useSelector((state) => state?.cart || {});

  return (
    <nav className={styles.navbar}>
      <Link to={"/"}>
        {/* <img src={logo} className={styles.logo} alt="Logo" /> */}
      </Link>
      <span>
        <Link className={styles.name} to={"/"}>
          DLCA TECHNOLOGY
        </Link>
      </span>
      <span>
        <Link className={styles.links} to={"/productos"}>
          Productos
        </Link>
      </span>
      <span>
        <Link to={"/about"} className={styles.links}>
          Sobre nosotros
        </Link>
      </span>
      <span>
        <Link to={"/contacto"} className={styles.links}>
          Contáctenos
        </Link>
      </span>
      <div className={styles.buttons}>
        <Link to={"/user/profile"}>
          <img src={personIcon} alt="Person" />
        </Link>
        <Link to={"#"}>
          <img src={heartIcon} alt="Favorites" />
        </Link>
        <Link to={"/cart"} className={styles.cart}>
          <img src={shoppingCartIcon} alt="Shopping Cart" />
          <span>{cart?.total_items ? cart?.total_items : "0"}</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
