// import React, { useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import style from "./UserProfileView.module.css";
// import axios from "axios";
// import Loading from "../../components/Loading/Loading";
// import { Link } from "react-router-dom";


// const UserProfileView = () => {
//   const { logout, user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
//   const [newUsername, setNewUsername] = useState("");
//   const [newAvatar, setNewAvatar] = useState("");
//   const [isUpdating, setIsUpdating] = useState(false);

//   useEffect(() => {
//     if (isAuthenticated) {
//       setNewUsername(user?.username || "");
//       setNewAvatar(user?.avatar_img || "");
//     }
//   }, [isAuthenticated, user]);

//   // if (isLoading) {
//   //   return <div>Loading ...</div>;
//   // }

//   const handleLogOut = () => {
//     logout({ logoutParams: { returnTo: window.location.origin } });
//   };

//   const handleUpdateProfile = async () => {
//     setIsUpdating(true);

//     try {
//       const tokenClaims = await getIdTokenClaims();
//       const userId = tokenClaims.sub;

//       // Enviar la información actualizada al backend
//       await axios.put(`/api/users/${userId}`, {
//         username: newUsername,
//         avatar_img: newAvatar,
//       });

//       // Actualizar la información del usuario localmente
//       user.username = newUsername;
//       user.avatar_img = newAvatar;
//       setIsUpdating(false);
//     } catch (error) {
//       console.error("Error al actualizar el perfil:", error);
//       setIsUpdating(false);
//     }
//   };

//   const [isLoadingTimeout, setIsLoadingTimeout] = useState(true);

//   useEffect(() => {
//     // Establecer isLoadingTimeout en falso después de 2 segundos
//     const timer = setTimeout(() => {
//       setIsLoadingTimeout(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div>
//       {isLoadingTimeout ? (
//         <div className={style.loadingContainer}>
//           <Loading />
//         </div>
//       ) : (
//         <>
//           <div className={style.usercontainer}>
//             {/* <h1>VISTA DE PERFIL DEL USUARIO</h1> */}
//             <p className={style.cartmessagecenter}>Bienvenido, {user?.name}!</p>
//             {/* <img src={user.avatar_url} alt="User avatar" /> */}
//             <br />
//             {isAuthenticated && (
//               <div className={style.avatar}>
//                 <img src={newAvatar || user?.avatar_img} alt={user?.name} />
//                 <br />
//                 <form className={style.form}>
//                   <input
//                     type="text"
//                     value={newUsername}
//                     onChange={(e) => setNewUsername(e.target.value)}
//                     placeholder="Nuevo nombre de usuario"
//                   />
//                   <br />
//                   {isUpdating && <p>Actualizando perfil...</p>}
//                   <h2>{user?.name}</h2>
//                   <p>{user?.email}</p>
//                   <p>{newUsername || user?.username}</p>
//                   <input
//                     type="text"
//                     value={newAvatar}
//                     onChange={(e) => setNewAvatar(e.target.value)}
//                     placeholder="Nueva URL de avatar"
//                   />
//                   <Link to="/misCompras">
//                     <button
//                       className={style.btn}
//                       onClick={handleUpdateProfile}
//                       disabled={isUpdating}
//                     >
//                       Guardar Cambios
//                     </button>
//                   </Link>
//                   <div>
//                   <Link to="/products">
//                     <button className={style.btnReturn}>Regresar</button>
//                 </Link>
//                </div>
//                 </form>
//               </div>
//             )}
//             <button className={style.btn} onClick={handleLogOut}>Volver</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default UserProfileView;