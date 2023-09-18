import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./NavBar.module.css";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className={style.logoutButton} onClick={() => logout({ returnTo: window.location.origin })}>
      
    </button>
  );
};