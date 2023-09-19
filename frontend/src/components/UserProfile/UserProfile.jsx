import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { putUser } from "../../redux/actions/index.js";
import { Link } from "react-router-dom";
import style from "./UserProfile.module.css";
import Loading from "../Loading/Loading";


const UserProfile = () => {
  const { user } = useAuth0();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Comprueba si los datos del usuario están disponibles en localStorage
    const localStorageData = localStorage.getItem("dataUser");

    if (localStorageData) {
      //Envíe la acción putUser con el correo electrónico y localStorageData analizado
      dispatch(putUser(email, JSON.parse(localStorageData)));
    }
  }, [userData]);

  const email = user?.email;

  const handleModifyUserData = () => {
    // Actualizar datos de usuario en estado
    // Guarda los datos del usuario en localStorage
    dispatch(putUser(email, data));
    console.log(userData);
  };

  const [data, setData] = useState({
    picture: userData?.picture ? userData.picture : user.picture,
    name: userData?.name ? userData.name : user.name,
    address: userData?.address ? userData.address : "",
    phone: userData?.phone ? userData.phone : "",
  });

  const [error, setError] = useState({
    name: "¡Se requiere el nombre!",
    address: "¡Se requiere la dirección!",
    phone: "¡Se requiere el teléfono!",
  });

  const validate = (data) => {
    const error = {};
    if (data.name.length < 1) {
      error.name = "¡Ingrese un nombre!";
    }
    if (data.address.length < 1) {
      error.address = "¡Inserte una dirección!";
    }
    if (isNaN(data.phone) === true || data.phone < 1) {
      error.phone = "¡Se requiere un teléfono válido!";
    }
    if (!data.picture) {
      error.picture = "¡Inserte imagen!";
    }
    return error;
  };

  const inputOnChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    setError(
      validate({
        ...data,
        [event.target.name]: event.target.value,
      })
    );
  };


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "a3bb92510110e7900867b1fac5cb8924"); // ImgBB API key
    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );
      const imageUrl = response.data.data.url;
      console.log(imageUrl);
      setData({
        ...data,
        picture: imageUrl,
      });
      setError(
        validate({
          ...data,
          picture: imageUrl,
        })
      );
      // setImageSrcError(""); // Borra el error imageSrc si lo hay
    } catch (error) {
      // console.error("Error subiendo imagen:", error);
      // setImageSrcError("No se pudo cargar la imagen. Inténtalo de nuevo.");
    }
  };

  const [showForm, setshowForm] = useState(false);

  const handleFormModify = () => {
    if (showForm === false) setshowForm(true);
    if (showForm === true) setshowForm(false);
  };

  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Establecer isLoading en falso después de 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={style.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <div className={style.form__C}>
          {showForm === true ? (
            <div className={style.formImg}>
               {data.picture && (
              <img
                src={data.picture}
                alt="Producto"
                className={style.imgModify}
              />
            )}
              <label className={style.label}>Eliga una nueva imagen: </label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e)}
                name="picture"
                accept="image/*"
              />
            </div>
          ) : null}
          {error.picture && <strong>{error.picture}</strong>}

          {showForm === false ? (
            <div className={style.img}>
              <img
                className={style.img}
                src={userData?.picture ? userData?.picture : user.picture}
                alt=""
              />
            </div>
          ) : null}
          <div>
            <h1>Mi Perfil</h1>
            <div>
              <h2>Mis Datos:</h2>

              <p className={style.label}>
                Email: {userData?.email ? userData?.email : user.email}{" "}
                {user?.email_verified === true ? "✅" : "❌"}
              </p>
              {user?.email_verified === true ? null : (
                <p className={style.noVerificado}>¡Verifique su email!</p>
              )}
            </div>

            {showForm === false ? (
              <div>
                <h2>Datos personales:</h2>
                <p className={style.label}>
                  Usuario: {userData?.name ? userData?.name : user.name}
                </p>
                <p className={style.label}>
                  Dirección:{" "}
                  {userData?.address
                    ? userData.address
                    : "Todavía no tiene una dirección registrada..."}
                </p>
                <p className={style.label}>
                  Teléfono:{" "}
                  {userData?.phone
                    ? userData.phone
                    : "Todavía no tiene número de teléfono registrado..."}
                </p>
              </div>
            ) : null}

            {showForm === true ? (
              <div>
                <h2>Modifica tus datos:</h2>
                <form className={style.form}>
                  <label className={style.label}>Nuevo Nombre:</label>
                  <input
                    className={style.input}
                    type="text"
                    value={data.name}
                    name="name"
                    onChange={inputOnChange}
                    placeholder="Escriba un nuevo nombre..."
                  />
                  {error.name && (
                    <strong className={style.error}>{error.name}</strong>
                  )}

                  <label className={style.label}>Nueva Dirección:</label>
                  <input
                    className={style.input}
                    type="text"
                    value={data.address}
                    name="address"
                    onChange={inputOnChange}
                    placeholder="Escriba una nueva dirección..."
                  />
                  {error.address && (
                    <strong className={style.error}>{error.address}</strong>
                  )}

                  <label className={style.label}>
                    Nuevo Número de Teléfono:
                  </label>
                  <input
                    className={style.input}
                    type="text"
                    value={data.phone}
                    name="phone"
                    onChange={inputOnChange}
                    placeholder="Escriba un nuevo número de teléfono..."
                  />
                  {error.phone && (
                    <strong className={style.error}>{error.phone}</strong>
                  )}

                  {error.name || error.address || error.phone ? null : (
                    <button
                      className={style.btnForm}
                      onClick={handleModifyUserData}
                    >
                      Modificar mis Datos
                    </button>
                  )}
                </form>
              </div>
            ) : null}

            <button className={style.btnEdit} onClick={handleFormModify}>
              {showForm === false ? "Editar Datos" : "Cancelar"}
            </button>
          </div>
          <div>
            <Link to="/misCompras">
              <button className={style.btnForm}>Mis Compras</button>
            </Link>
          </div>
          <div>
            <Link to="/favorites">
              <button className={style.btnForm}>Mis Favoritos</button>
            </Link>
          </div>
          <div>
            <Link to="/productos">
              <button className={style.btnReturn}>Regresar</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
