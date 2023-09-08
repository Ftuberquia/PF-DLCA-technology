import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../Loading/Loading";
import { Link } from "react-router-dom";
import style from './profile.module.css';

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userData, setUserData] = useState(null);

  
  const saveUserDataToLocal = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
  }


  const getUserDataFromLocal = () => {
    const userDataFromLocal = localStorage.getItem('userData');
    return userDataFromLocal ? JSON.parse(userDataFromLocal) : null;
  }

  useEffect(() => {
    
    const userDataFromLocal = getUserDataFromLocal();

    if (isAuthenticated) {
      const userData = {
        name: user.name ? user.name : user.nickname,
        email: user.email,
        email_verified: user.email_verified,
        picture: user.picture,
      };


      saveUserDataToLocal(userData);

      setUserData(userData);
    } else if (userDataFromLocal) {
      
      setUserData(userDataFromLocal);
    }
  }, [isAuthenticated, user.name, user.email, user.email_verified, user.picture, user.nickname]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    isAuthenticated && (
      <div>
        <div>
          <Link to={'/userProfile'}>
            <img className={style.img} src={userData?.picture} alt={''} />
          </Link>
        </div>

      </div>
    )
  );
};
