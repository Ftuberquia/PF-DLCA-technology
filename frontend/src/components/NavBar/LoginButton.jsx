import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import style from "./NavBar.module.css";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className={style.LoginButton} onClick={() => loginWithRedirect()}>Login</button>;
};