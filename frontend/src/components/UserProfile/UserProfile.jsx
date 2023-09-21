import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { putUser } from "../../redux/actions/index.js";
import { Link } from "react-router-dom";
import style from "./UserProfile.module.css";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

const UserProfile = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const [isUserDataUpdated, setIsUserDataUpdated] = useState(false);
  const [prevUserData, setPrevUserData] = useState(userData);

  useEffect(() => {
    const localStorageData = localStorage.getItem("dataUser");

    if (localStorageData) {
      dispatch(putUser(JSON.parse(localStorageData)));
      setIsUserDataUpdated(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && isUserDataUpdated) {
      updateUserInDatabase(user.sub);
    }
  }, [user, isUserDataUpdated]);

  useEffect(() => {
    if (user && userData && userData !== prevUserData) {
      updateUserInDatabase(user.sub);
      setPrevUserData(userData);
    }
  }, [user, userData, prevUserData]);

  //Función para actualizar los datos del usuario en la base de datos.
  const updateUserInDatabase = useCallback(
    async (id) => {
      try {
        const response = await axios.put(`/users/${id}`);
        setIsUserDataUpdated(false);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },[]
  );

  const email = user?.email;

  // Estado para entradas y datos de formulario
  const [data, setData] = useState({
    id: userData.data?.id,
    first_name: userData.data?.first_name || user?.given_name || "",
    last_name: userData.data?.last_name || user?.family_name || "",
    address: userData.data?.direction || "",
    phone: userData.data?.phone || "",
    picture: userData?.avatar_img
      ? userData?.avatar_img
      : "https://i.ibb.co/9byM8Fk/avatar-user.png",
    username: userData?.username ? userData.username : user?.username,
  });

  // Estado para manejar errores de validación de formulario
  const [error, setError] = useState({
    first_name: "¡Se requiere el nombre!",
    address: "¡Se requiere la dirección!",
    phone: "¡Se requiere el teléfono!",
  });

  // Función para validar entradas de formulario.
  const validate = (data) => {
    const errors = {};
    if (!data.first_name) {
      errors.first_name = "¡Se requiere el nombre!";
    }
    if (!data.address) {
      errors.address = "¡Se requiere la dirección!";
    }
    if (isNaN(data.phone) || data.phone.length < 1) {
      errors.phone = "¡Se requiere un teléfono válido!";
    }
    return errors;
  };

  // Función para manejar cambios de entrada de formulario
  const changeHandler = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    setError(
      validate({
        ...data,
        [event.target.name]: event.target.value,
      })
    );
  };

  // Función para manejar la carga de imágenes.
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "1492e57d06d94a35b2f3124b4c2b79a2"); // Reemplace con su clave API ImgBB

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );
      const imageUrl = response.data.data.url;
      setData({
        ...data,
        avatar_img: imageUrl,
      });
      setError(
        validate({
          ...data,
          avatar_img: imageUrl,
        })
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Función para manejar la modificación de datos del usuario.
  const handleModifyUserData = async () => {
    const { username, avatar_img, address, phone } = data;
    const updates = {};

    if (username !== undefined || username === "") {
      updates.username = username;
    }
    if (avatar_img !== undefined || avatar_img === "") {
      updates.avatar_img = avatar_img;
    }
    if (address !== undefined || address === "") {
      updates.address = address;
    }
    if (phone !== undefined || phone === "") {
      updates.phone = phone;
    }

    try {
      await axios.post("/api/users/update", updates);
      dispatch(putUser(updates));

      Swal.fire({
        title: "¡Usuario actualizado correctamente!",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error updating user:", error);

      Swal.fire({
        title: "¡No se pudo modificar al usuario!",
        text: "Por favor llene las casillas vacias o revise sus errores",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  };

  const [showForm, setShowForm] = useState(false);

  const isLoading = useSelector((state) => state.isLoading);

  if (!user || !user.sub) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className={style.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <div className={style.formperfil}>
          {/* Información del perfil de usuario */}
          <div className={style.img}>
            <img
              className={style.img}
              src={userData?.picture ? userData?.picture : user.picture}
              alt=""
            />
          </div>
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

            {/* Formulario para modificar datos de usuario */}
            {showForm && (
              <div>
                <h2>Modifica tus datos:</h2>
                <form className={style.formperfil}>
                  <label className={style.label}>Nuevo Nombre:</label>
                  <input
                    className={style.input}
                    type="text"
                    value={data.first_name}
                    name="first_name"
                    onChange={changeHandler}
                    placeholder="Escriba un nuevo nombre..."
                  />
                  {error.first_name && (
                    <strong className={style.error}>{error.first_name}</strong>
                  )}

                  <label className={style.label}>Nueva Dirección:</label>
                  <input
                    className={style.input}
                    type="text"
                    value={data.address}
                    name="address"
                    onChange={changeHandler}
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
                    onChange={changeHandler}
                    placeholder="Escriba un nuevo número de teléfono..."
                  />
                  {error.phone && (
                    <strong className={style.error}>{error.phone}</strong>
                  )}

                  {/* Botón para modificar datos del usuario */}
                  {error.first_name || error.address || error.phone ? null : (
                    <button
                      className={style.btnForm}
                      onClick={handleModifyUserData}
                    >
                      <span>Modificar mis Datos</span>
                    </button>
                  )}
                </form>
              </div>
            )}

            {/* Botón para alternar la visibilidad del formulario */}
            <button
              className={style.btnEdit}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm === false ? "Editar Datos" : "Cancelar"}
            </button>
          </div>

          {/* Botones para la navegación */}
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