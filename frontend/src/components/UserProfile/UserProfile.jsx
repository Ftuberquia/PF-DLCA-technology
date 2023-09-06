import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { putUser } from "../../redux/actions";
import style from "./userProfile.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const UserProfile = () => {
  const { user } = useAuth0();

  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user);

  useEffect(() => {
    if (dataUser) {
      localStorage.setItem("userData", JSON.stringify(dataUser));
    }
  }, [dataUser]);

  const email = user?.email;

  const handleModifyUserData = () => {
    dispatch(putUser(email, data));
  };

  const [data, setData] = useState({
    name: dataUser?.name ? dataUser.name : user.name,
    direction: dataUser?.direction ? dataUser.direction : "",
    telefone: dataUser?.telefone ? dataUser.telefone : "",
    //picture: dataUser.picture ? dataUser.picture : ''
  });

  const [error, setError] = useState({
    name: "¡Se requiere el nombre!",
    direction: "¡Se requiere la direccion!",
    telefone: "¡Se requiere el telefono!",
  });

  function validate(data) {
    const error = {};
    if (data.name.length < 1) {
      error.name = "¡Ingrese un nombre!";
    }
    if (data.direction.length < 1) {
      error.direction = "¡Inserte una direccion!";
    }
    if (isNaN(data.telefone) === true || data.telefone < 1) {
      error.telefone = "¡Se requiere telefono valido!";
    }
    return error;
  }

  const inputOnChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    //
    setError(
      validate({
        ...data,
        [event.target.name]: event.target.value,
      })
    );
  };

  const [showForm, setshowForm] = useState(false);

  const handleFormModify = () => {
    if (showForm === false) setshowForm(true);
    if (showForm === true) setshowForm(false);
  };

  return (
    <div className={style.form__C}>
      <div className={style.card}>
        <div className={style.img}>
          <img
            className={style.img}
            src={dataUser?.picture ? dataUser?.picture : user.picture}
            alt=""
          />
        </div>
        <div>
          <h1>Mis Datos</h1>
          <div>
            <h2>Datos de Cuenta:</h2>

            <p className={style.label}>
              Email: {dataUser?.email ? dataUser?.email : user.email}{" "}
              {user?.email_verified === true ? "✅" : "❌"}
            </p>
            {user?.email_verified === true ? null : (
              <p className={style.noVerificado}>
                ¡Verifique su email en su casilla de entrada!
              </p>
            )}
          </div>
          <div>
            <p className={style.label}>
              Email: demostracionNoVerificado@gmail.com ❌
            </p>
            <p className={style.noVerificado}>
              ¡Verifique su email en su casilla de entrada!
            </p>
          </div>

          {showForm === false ? (
            <div>
              <h2>Datos personales:</h2>
              <p className={style.label}>
                Usuario: {dataUser?.name ? dataUser?.name : user.name}
              </p>
              <p className={style.label}>
                Direccion:{" "}
                {dataUser?.direction
                  ? dataUser.direction
                  : "Todavia no tiene direccion personal..."}
              </p>
              <p className={style.label}>
                Telefono:{" "}
                {dataUser?.telefone
                  ? dataUser.telefone
                  : "Todavia no tiene numero de linea..."}
              </p>
            </div>
          ) : null}

          {showForm === true ? (
            <div>
              <h2>Modifica tus datos personales:</h2>
              <form className={style.form}>
                {/* <label className={style.label}>Imagen:</label>
                                <input type="text" value={data.picture} name="picture" onChange={inputOnChange} placeholder="Escribe el precio del producto..." /> */}

                <label className={style.label}>Nuevo Nombre:</label>
                <input
                  className={style.input}
                  type="text"
                  value={data.name}
                  name="name"
                  onChange={inputOnChange}
                  placeholder="Escriba nuevo nombre..."
                />
                {error.name && (
                  <strong className={style.error}>{error.name}</strong>
                )}

                <label className={style.label}>Nueva Direccion:</label>
                <input
                  className={style.input}
                  type="text"
                  value={data.direction}
                  name="direction"
                  onChange={inputOnChange}
                  placeholder="Escriba nueva direccion..."
                />
                {error.direction && (
                  <strong className={style.error}>{error.direction}</strong>
                )}

                <label className={style.label}>Nuevo Telefono:</label>
                <input
                  className={style.input}
                  type="text"
                  value={data.telefone}
                  name="telefone"
                  onChange={inputOnChange}
                  placeholder="Escriba nuevo telefono..."
                />
                {error.telefone && (
                  <strong className={style.error}>{error.telefone}</strong>
                )}

                {error.name || error.direction || error.telefone ? null : (
                  <button
                    className={style.btnForm}
                    onClick={handleModifyUserData}
                  >
                    Modificar Datos
                  </button>
                )}
              </form>
            </div>
          ) : null}

          <button className={style.btnForm} onClick={handleFormModify}>
            {" "}
            {showForm === false ? "Editar Datos" : "Cancelar"}
          </button>
        </div>
      </div>
      <div>
        <Link to="/products">
          <button className={style.btnReturn}>Return</button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
