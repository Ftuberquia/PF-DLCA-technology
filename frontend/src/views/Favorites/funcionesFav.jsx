import axios from "axios";

export const fetchData = async (userId) => {
    try {
      const response = await axios.get(`/favorites/${userId}`);
      return response.data; // Actualiza el estado con los productos favoritos recibidos del backend
    } catch (error) {
      // Manejar el error en caso de que la solicitud falle
      console.error(error);
    }
  };

export const addFavorite = async (productId,userId) => {
    try {
      const response = await axios.post(`/favorites/addFav/${userId}/${productId}`);
      return response.data;
    } catch (error) {
      // Manejar el error en caso de que la solicitud falle
      console.error(error);
      throw error;
    }
}

export const deleteFavorite = async (productId,userId) => {
    try {
      const response = await axios.delete(`/favorites/delFav/${userId}/${productId}`);
      return response.data;
    } catch (error) {
      // Manejar el error en caso de que la solicitud falle
      console.error(error);
      throw error;
    }
}