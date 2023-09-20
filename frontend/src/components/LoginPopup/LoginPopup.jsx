import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./LoginPopup.module.css";

function LoginPopup({ children }) { // Si el usuario está autenticado, el componente LoginPopup no se procesará.
  const { loginWithPopup, isAuthenticated, user } = useAuth0(); // Se puede utilizar el hook useAuth0() para comprobar si el usuario está autenticado y obtener la información del perfil del usuario.
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (!isAuthenticated) loginWithPopup();
  };

  if (isAuthenticated) return null; // Si el usuario está autenticado, no se muestra el componente.

  return ReactDOM.createPortal(
    <>
      <div className={style.overlay} />
      <div className={style.popup}>
        <div className={style.i}>
          <i className="fa-solid fa-circle-exclamation"></i>
        </div>
        <div className={style.title}>
          Para acceder a esta página es necesario que inicie sesión
        </div>
        <div className={style.buttons}>
          <button className={style.butt} onClick={login}>
            Iniciar sesión
          </button>
          <button className={style.butt} onClick={() => navigate(-1)}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default LoginPopup;
