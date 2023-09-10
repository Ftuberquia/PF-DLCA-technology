import { Link } from "react-router-dom";
import style from "./Footer.module.css";
import instagramIcon from "../../img/instagram.svg";
import twitterIcon from "../../img/twitter.svg";
import pinIcon from "../../img/pin.svg";
import mailIcon from "../../img/mail.svg";
import phoneIcon from "../../img/phone.svg";

const Footer = () => {
  return (
    <footer>
      <div className={style.topFooter}>
        <div>
          <div className={style.socialIcons}>
            <a href="#">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="#">
              <img src={twitterIcon} alt="Twitter" />
            </a>
          </div>
        </div>
        <div>
          <h3>Menu</h3>
          <ul>
            <li>
              <Link to={"/productos"}>Nuestros Productos</Link>
            </li>
            <li>
              <Link to={"/faq"}>FAQ</Link>
            </li>
            <li>
              <Link to={"/aboutUs"}>Sobre Nosotros</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>DLCA</h3>
          <ul>
            <li>
              <Link to={"#"}>Información de la empresa</Link>
            </li>
            <li>
              <Link to={"#"}>Términos y Condiciones</Link>
            </li>
            <li>
              <Link to={"#"}>Política de Privacidad</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Contacto</h3>
          <ul className={style.contact}>
            <li>
              <img src={pinIcon} alt="Dirección" />
              <a href="#" className={style.address}>
                Caracas - Venezuela
              </a>
            </li>
            <li>
              <img src={mailIcon} alt="E-Mail" />
              <a href="mailto:example@gmail.com" className={style.email}>
                dunluq@gmail.com
              </a>
            </li>
            <li>
              <img src={phoneIcon} alt="E-Mail" />
              <a href="tel:*2108" className={style.phone}>
                *58 555-55-55
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.bottomFooter}>
        <p> &copy; Proyecto Team #12 Cohorte 40a.</p>
        <div className={style.rightPart}>
          <Link to={"#"}>¡Descubre la tecnología en su máxima expresión!</Link>
          <Link to={"#"}>© 2014 TODOS LOS DERECHOS RESERVADOS</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
