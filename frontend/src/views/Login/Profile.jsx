import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Profile = () => {
    const { logout, user, isAuthenticated, isLoading } = useAuth0();
  
    if (isLoading) {
      return <div>Loading ...</div>;
    }
  
    return (
      <>
       {isAuthenticated && (
        <div>
          <h1 className="cart-message-center"> MI PERFIL</h1>
           <p className="cart-message-center">Bienvenid, {user.name}!</p>
           <p></p>
          <img src= {user.picture} alt={user.name}/>
          <h2 >Usuario: {user.name}</h2>
          <h3 >{user.first_name}</h3>
          <h4 >{user.last_name}</h4>
          <h5 >Correo: {user.email}</h5>
          <h6 >{user.address}</h6>
          <h7 >{user.phone}</h7>     
        </div>
      )}
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
      </>
     
    );
    
    
  };
  
  export default Profile;