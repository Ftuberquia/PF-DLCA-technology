import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import style from "./UserProfileView.module.css";

const UserProfileView = () => {
  const { logout, user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
//     <>
//     <h1>ESTE SERIA LA VIEW DE PERFIL DEL USUARIO RECIEN INGRESADO</h1>

//       {isAuthenticated && (
//         <div>
//           <img src={user.picture} alt={user.name} />
//           <h2>{user.name}</h2>
//           <p>{user.email}</p>
//           <p>{user.nickname}</p>
//         </div>
//       )}
//       <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
//         Log Out
//       </button>
//     </>
//   );
// };
      isAuthenticated && (
        <div className={style.usercontainer}>
        <div className={style.profileimage}>
          <img src={user.picture} alt={user.name} />
        </div>
        <form>
          <div className={style.userlabel1}>
            <label htmlFor="name">Name:</label>
            <div className={style.userinput1}>
              <input type="text" id="name" name="name" />
            </div>
        
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
        
            <label htmlFor="nickname">Nickname:</label>
            <input type="nickname" id="nickname" name="nickname" />
          </div>
            <button className={style.userboton1} type="registro">Login</button>
          </form>
          <div>
          <button className={style.userboton2} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
          </button>
          </div>
        </div>
  ));
  };
  
  export default UserProfileView;