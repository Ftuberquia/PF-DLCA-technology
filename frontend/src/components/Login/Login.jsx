import React from "react";
//import ReactDOM from "react-dom";
//import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const Login = () => {
    const {loginWithPopup} = useAuth0();
    
    return(  <button onClick={()  => loginWithPopup()}> 
    log In</button>
    )

  };

export default Login;