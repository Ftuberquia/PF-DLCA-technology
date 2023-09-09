import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserProfileView = () => {
  const { logout, user, isAuthenticated, isLoading } = useAuth0();

  const handleSaveUserData = async () => {
    if (isAuthenticated) {
      try {
        const userData = {
          // Aquí debes incluir los datos que deseas enviar al servidor
          // Puedes tomar estos datos de 'user' u otras fuentes según tu aplicación
          first_name: user.given_name,
          last_name: user.family_name,
          username: user.nickname,
          email: user.email,

          // Otros campos de datos que quieras enviar
        };

        const response = await axios.post("http://localhost:3001/users/", userData);

        if (response.status === 200) {
          console.log("Usuario creado con éxito");
          // Realizar acciones adicionales si es necesario
        } else {
          console.error("Error al crear el usuario");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
    <h1>ESTE SERIA LA VIEW DE PERFIL DEL USUARIO RECIEN INGRESADO</h1>

      {isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.nickname}</p>
        </div>
      )}
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    </>
  );
};

export default UserProfileView;