import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Cards from "../../components/Cards/Cards";
import { getFavoriteProducts } from "../../redux/actions";

export default function Favorites() {
    const dispatch = useDispatch();
    const favoriteProducts = useSelector(state => state.favs);
    const { user } = useAuth0(); // Obtener la información del usuario actual desde Auth0

    const history=useHistory()

    useEffect(() => {
        if (user) {
            dispatch(getFavoriteProducts(user.sub)); // Pasar el ID de usuario a la acción getFavoriteProducts
            localStorage.setItem("userId", user.sub); // Guardar el userId en el localStorage
        } else{
            alert('Ingresa o registrate para ver tus favoritos!')
            history.goBack()
        }
        // eslint-disable-next-line
    }, [user,history , dispatch]);

    return (
        <div>
            <h1>Favoritos</h1>
            <Cards products={favoriteProducts}/>
        </div>
    );
}