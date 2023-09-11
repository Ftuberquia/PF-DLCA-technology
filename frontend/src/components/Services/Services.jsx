import style from "./Services.module.css";
import box from "../../img/box.svg";
import creditCard from "../../img/card.svg";
import medalStar from "../../img/medal.svg";

const Services = () => {
  return (
    <div className={style.services}>
      <div className={style.service}>
        <img src={box} alt="Box" />
        <h3>Envíos</h3>
        <p>Servicio de envíos a todo el país</p>
      </div>
      <div className={style.service}>
        <img src={creditCard} alt="Credit Card" />
        <h3>Pagos</h3>
        <p>Facilidades de pago</p>
      </div>
      <div className={style.service}>
        <img src={medalStar} alt="Medal Star" />
        <h3>Certificados</h3>
        <p>Nuestros productos son certificados por nuestros proveedores</p>
      </div>
    </div>
  );
};

export default Services;

