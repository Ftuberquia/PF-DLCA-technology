import axios from 'axios'

export const filterBack = (params) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/products', { params });
      const data = response.data;
      // Actualiza el estado con los datos filtrados recibidos del back-end
      dispatch(updateProducts(data));
    } catch (error) {
      console.log('error en el front', error);
    }
  };
};