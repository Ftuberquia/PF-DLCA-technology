import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfileView = () => {
  const { logout, user, isAuthenticated, isLoading } = useAuth0();

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
        </div>
      )}
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    </>
  );
};

export default UserProfileView;