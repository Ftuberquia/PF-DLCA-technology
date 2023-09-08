import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
// import logo from "../../img/logo-dlca.png";
import personIcon from "../../img/person.svg";
import heartIcon from "../../img/heart.svg";
import shoppingCartIcon from "../../img/shopping-cart.svg";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const { cart } = useSelector((state) => state?.cart || {});
  const { loginWithPopup} = useAuth0();

  return (
    <nav>
      
      <NavLink to={"/"}>
        <div className={styles.logo} />
      </NavLink>
      <li>
				<NavLink className={styles.name} to={'/'}>DLCA TECHNOLOGY</NavLink >
				</li>
      <li>
				<NavLink className={styles.links} to={'/productos'}>Productos</NavLink >
			</li>
            <li >
              <NavLink
              to={'/about'}
              className={styles.links}
              >
                Sobre nosotros
              </NavLink>
            </li>
            <li >
              <NavLink
              to={'/contacto'}
              className={styles.links}
              >
                Contáctenos
              </NavLink>
            </li>
            <li >
              <NavLink
              to={'/compra'}
              className={styles.links}
              >
                Comprar
              </NavLink>
            </li>
      <div className={styles.buttons}>
        <NavLink to={"login"} >
          <img src={personIcon} alt="Login" onClick={() => loginWithPopup()} />
        </NavLink>
        <NavLink to={"/favorites"}>
          <img src={heartIcon} alt="Favorites" />
        </NavLink>
        <NavLink to={"/cart"} className={styles.cart}>
          <img src={shoppingCartIcon} alt="Shopping Cart" />
          <span>{cart?.total_items ? cart?.total_items : "0"}</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;