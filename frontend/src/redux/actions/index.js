import axios from 'axios';
export const  GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const  GET_PRODUCTS_BYNAME = 'GET_PRODUCTS_BYNAME';
export const  GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export const  GET_BRANDS = 'GET_BRANDS';
export const  GET_TAGS = 'GET_TAGS';
export const  CREATE_PRODUCT = 'CREATE_PRODUCT';
export const  DELETE_PRODUCT = 'DELETE_PRODUCT';
export const  FILTER_BY_TAG = 'FILTER_BY_TAG';
export const  FILTER_BY_BRANDS = 'FILTER_BY_TAG';
export const  FILTER_BY_CREATED = 'FILTER_BY_TAG';
export const  ORDER_BY_NAME = 'FILTER_BY_TAG';


export const getAllProducts = () => async dispatch => {
    try {
        const getProducts = await axios.get('/products');
            return dispatch({
                type: GET_ALL_PRODUCTS,
                payload: getProducts.data
            });    
    } catch (error) { 
        console.error('Error Products:', error);
    }
};

export const getProductsByName = (name) => async dispatch => {
    try {
        const getProductsByName = await axios.get(`/products?name${name}`);
            return dispatch({
                type: GET_PRODUCTS_BYNAME,
                payload: getProductsByName.data
            });      
    } catch (error) { 
        console.error('Error Name:', error);
    }
};

export const getProductDetail = (id) => async dispatch => {
    try {
        const details = await axios.get(`/products/${id}`);
        return dispatch({
            type: GET_PRODUCT_DETAIL,
            payload: details.data
        });
    } catch (error) {
        console.error('Error Product detail:', error);
    }
};

export const getBrands = () => async dispatch => {
    try { 
        const getBrand = await axios.get('/brands');
        return dispatch({
            type: GET_BRANDS,
            payload: getBrand.data
        });
    } catch (error) {
        console.error('Error Brands:', error);
    }
};

export const getTags = () => async dispatch => {
    try { 
        const getTag = await axios.get('/tags');
        return dispatch({
            type: GET_TAGS,
            payload: getTag.data
        });
    } catch (error) {
        console.error('Error Tags:', error);
    }
};

export const createProduct = (form) => async (dispatch) => {
    try {
      const response = await axios.post('/products', form);
      
      // Verificar la respuesta del servidor antes de despachar la acción
      return dispatch({
        type: CREATE_PRODUCT,
        payload: {
            data: response.data,
            status: response.status
            }
        });

    } catch (error) {
      console.error('Error creating Product:', error);
    }
  };

  export const deleteProduct = (id) => async dispatch => {
    try {
        await axios.delete(`/products/${id}`);
        return dispatch({
            type: DELETE_PRODUCT
        })
    } catch (error) {
        console.error('Error Delete Product:', error);
    }
};

export const filterByBrand = (payload) => dispatch => {
    return dispatch({
        type: FILTER_BY_BRANDS,
        payload
    })
};

export const filterByCreated = (payload) => dispatch => {
    return dispatch({
        type: FILTER_BY_CREATED,
        payload
    })
};

export const orderByName = (payload) => dispatch => {
    return dispatch({
        type: ORDER_BY_NAME,
        payload
    })
};