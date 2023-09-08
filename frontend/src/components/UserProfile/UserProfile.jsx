import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { putUser } from "../../redux/actions";
import style from "./UserProfile.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import axios from "axios";

const UserProfile = () => {
  const { user } = useAuth0();

  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user);
  // const darkMode = useSelector((state) => state.darkMode); // Agrega esta línea
  // className={darkMode ? style.darkmode : style.lightMode}

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
    picture: dataUser?.picture ? dataUser.picture : user.picture,
    name: dataUser?.name ? dataUser.name : user.name,
    direction: dataUser?.direction ? dataUser.direction : "",
    telefone: dataUser?.telefone ? dataUser.telefone : "",
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
    if (!data.picture) {
      error.picture = "¡Inserte imagen!";
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "ccc0eb65a71efd80b4352eda77e05470"); // Replace with your ImgBB API key

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
      //setImageSrcError(""); // Clear the imageSrc error if any
    } catch (error) {
      // console.error("Error uploading image:", error);
      //setImageSrcError("Failed to upload image. Please try again.");
    }
  };

  const [showForm, setshowForm] = useState(false);

  const handleFormModify = () => {
    if (showForm === false) setshowForm(true);
    if (showForm === true) setshowForm(false);
  };

  return (
    <div className={style.form__C}>
      {/* <div className={darkMode ? style.carddarkmode : style.card}> */}
        {showForm === true ? (
          <div className={style.formImg}>
            {data.picture && (
              <img
                src={data.picture}
                alt="Producto"
                className={style.imgModify}
              />
            )}
            <label className={style.label}>Eliga nueva imagen: </label>
            <input
              type="file" // Cambia el tipo de entrada a "file" para permitir la selección de imágenes
              onChange={(e) => handleImageUpload(e)} // Llama a la función handleImageUpload cuando cambie la imagen
              name="picture"
              accept="image/*" // Restringe la selección de archivos a imágenes solamente
            />
          </div>
        ) : null}
        {error.picture && <strong>{error.picture}</strong>}

        {showForm === false ? (
          <div className={style.img}>
            <img
              className={style.img}
              src={dataUser?.picture ? dataUser?.picture : user.picture}
              alt=""
            />
          </div>
        ) : null}
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
            {/* <p className={style.label}>
              Email: demostracionNoVerificado@gmail.com ❌
            </p>
            <p className={style.noVerificado}>
              ¡Verifique su email en su casilla de entrada!
            </p> */}
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
        <Link to="/userPurchases">
          <button className={style.btnForm}>Mis Compras</button>
        </Link>
      {/* </div> */}
      <div>
        <Link to="/products">
          <button className={style.btnReturn}>Return</button>
        </Link>
      </div>
    </div>
  );
};


export default UserProfile;
