import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import Spinner from "../Loading/Loading";
import { Link } from "react-router-dom";
import style from "./UserPurchases.module.css";
import axios from "axios";
import StarRating from '../starRating/starRating';
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const UserPurchases = () => {
  const { user } = useAuth0();
  const email = user?.email;

  const [userData, setUserData] = useState(null);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    // Check if user data and ratings are available in localStorage
    const userDataFromLocal = localStorage.getItem("userData");
    const ratingsFromLocal = localStorage.getItem("ratings");

    if (userDataFromLocal) {
      setUserData(JSON.parse(userDataFromLocal));
    }

    if (ratingsFromLocal) {
      setRatings(JSON.parse(ratingsFromLocal));
    }

    // Fetch user ratings from the server
    fetchUserRatings();
  }, []);

  const fetchUserRatings = async () => {
    try {
      const response = await axios.get(`/getUserRatings/?email=${email}`);
      const userRatings = response.data;
      //console.log(userRatings);
      setRatings(userRatings);

      // Save user ratings to localStorage
      localStorage.setItem("ratings", JSON.stringify(userRatings));
    } catch (error) {
      console.error(error);
    }
  };

  // Rest of your component remains the same
  // Make sure to update the code related to ratings to use the 'ratings' state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Establecer isLoading en falso después de 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
    {isLoading ? (
        <div className={style.loadingContainer}>
          <Loading />
        </div>
      ) : (
    <div className={style.container}>
      {/* Rest of your component remains the same */}
    </div>
 )}
 </div>
);
};

export default UserPurchases;
