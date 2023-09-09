import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../Landing/Landing";
import { Link } from "react-router-dom";
import style from "./UserProfile.module.css";


const UserProfile = () => {
  const { user } = useAuth0();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if user data is available in localStorage
    const userDataFromLocal = localStorage.getItem("userData");

    if (userDataFromLocal) {
      setUserData(JSON.parse(userDataFromLocal));
    }
  }, []);

  const email = user?.email;

  const handleModifyUserData = () => {
    // Update user data in state
    setUserData((prevUserData) => ({
      ...prevUserData,
      picture: data.picture,
      name: data.name,
      direction: data.direction,
      telefone: data.telefone,
    }));

    // Save user data to localStorage
    localStorage.setItem("userData", JSON.stringify(data));

    // Dispatch the action to update the user data in Redux (if needed)
    // dispatch(putUser(email, data));
  };

  const [data, setData] = useState({
    picture: userData?.picture ? userData.picture : user.picture,
    name: userData?.name ? userData.name : user.name,
    direction: userData?.direction ? userData.direction : "",
    telefone: userData?.telefone ? userData.telefone : "",
  });

  const [error, setError] = useState({
    name: "¡Se requiere el nombre!",
    direction: "¡Se requiere la direccion!",
    telefone: "¡Se requiere el telefono!",
  });

  // Rest of your component remains the same

  return (
    <div className={style.form__C}>
      {/* Rest of your component remains the same */}
    </div>
  );
};

export default UserProfile;
