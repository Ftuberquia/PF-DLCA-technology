import axios from 'axios';
export const  GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const  GET_PRODUCTS_BYNAME = 'GET_PRODUCTS_BYNAME';
export const  GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export const  GET_BRANDS = 'GET_BRANDS';
export const  GET_TAGS = 'GET_TAGS';
export const  CREATE_PRODUCT = 'CREATE_PRODUCT';
export const  DELETE_PRODUCT = 'DELETE_PRODUCT';
export const  FILTER_BY_TAG = 'FILTER_BY_TAG';
export const  FILTER_BY_BRANDS = 'FILTER_BY_BRANDS';
export const  FILTER_BY_CREATED = 'FILTER_BY_CREATED';
export const  ORDER_BY_NAME = 'ORDER_BY_NAME';
export const  FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
export const  GET_CATEGORIES = 'GET_CATEGORIES';
export const  OPEN_MODAL = 'OPEN_MODAL';
export const  LOGOUT = 'LOGOUT';
export const  GET_SUBCATEGORIES = 'GET_SUBCATEGORIES';


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

export function getProductByName (name){
    let alertTimeOut = null
    return async function (dispatch){
        try{
            clearTimeout(alertTimeOut)
            let {data} = await axios.get(`/products?name=${name}`)
            let product = Array.isArray(data)? data : [data]
            if(product.length === 0){
                setTimeout(()=>{
                    alertTimeOut = alert("No se encontro ningun producto con ese nombre.")
                },0)
                return;
            }
            return dispatch({
                type: GET_PRODUCTS_BYNAME,
                payload: data
            })
        }catch(error){
            setTimeout(() =>{
                alertTimeOut = alert("No se encontro ningun producto con ese nombre")
            },0);
        }
    }
}

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

export const getCategories = () => async dispatch => {
    try { 
        const getCateory = await axios.get('/categories');
        return dispatch({
            type: GET_CATEGORIES,
            payload: getCateory.data
        });
    } catch (error) {
        console.error('Error Brands:', error);
    }
};

export const getSubCategories = () => async dispatch => {
    try { 
        const getSubCategory = await axios.get('/subcategoria');
        return dispatch({
            type: GET_SUBCATEGORIES,
            payload: getSubCategory.data
        });
    } catch (error) {
        console.error('Error Subcategorias:', error);
    }
};

export const getBrands = () => async dispatch => {
    try { 
        const getBrand = await axios.get('/brands');
        console.log('Brands:', getBrand);
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

export const filterByCategory = (payload) => dispatch => {
    return dispatch({
        type: FILTER_BY_CATEGORY,
        payload
    })
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

export function openModal(payload) {
	return { 
        type: OPEN_MODAL, 
        payload, 
    };
};

export function logout() {
	return {
		type: LOGOUT,
	};
};