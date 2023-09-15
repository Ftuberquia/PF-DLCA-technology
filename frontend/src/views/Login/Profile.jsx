import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.css";
import Loading from "../../components/Loading/Loading";

const Profile = () => {
    const { logout, user, isAuthenticated, isLoading } = useAuth0();
  
    // if (isLoading) {
    //   return <div>Loading ...</div>;
    // }
    const [isLoadingTimeout, setIsLoadingTimeout] = useState(true);

    useEffect(() => {
      // Establecer isLoadingTimeout en falso después de 2 segundos
      const timer = setTimeout(() => {
        setIsLoadingTimeout(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <>
      {isLoadingTimeout ? (
        <div className="loadingContainer">
          <Loading />
        </div>
      ) : (
       isAuthenticated && (
        <div>
          <h1 className="cart-message-center"> MI PERFIL</h1>
           <p className="cart-message-center">Bienvenido, {user.name}!</p>
           <p></p>
          <img src= {user.picture} alt={user.name}/>
          <h2 >Usuario: {user.name}</h2>
          <h5 >Correo: {user.email}</h5>  
        </div>
        )
        )}
      </>
    );
  };
     
export default Profile;