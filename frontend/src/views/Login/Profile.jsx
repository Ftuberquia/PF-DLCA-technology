import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading/Loading";
import style from "./Profile.module.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set isLoading to false after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={style.loadingContainer}>
          <Loading />
        </div>
      ) : (
        isAuthenticated && (
          <div className={style.containerprofile}>
            <div className="row">
              <div className="col-12 text-center">
              <h1 className={style.message}>Bienvenido/a, {user?.name}!</h1>
                <div className={style.pictureprofile}>
                <img
                  src={user.picture}
                  alt={user.name}
                  className="img-fluid rounded-circle"
                />
                </div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
              <div>
            <Link to="/users">
              <button className={style.btnprofile}>Mi Perfil</button>
            </Link>
          </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Profile;
