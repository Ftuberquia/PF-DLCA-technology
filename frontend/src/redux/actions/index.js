import axios from 'axios';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCTS_BYNAME = 'GET_PRODUCTS_BYNAME';
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export const GET_BRANDS = 'GET_BRANDS';
export const GET_TAGS = 'GET_TAGS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const OPEN_MODAL = 'OPEN_MODAL';
export const LOGOUT = 'LOGOUT';
export const GET_SUBCATEGORIES = 'GET_SUBCATEGORIES';
export const CLEAN_DETAIL = 'CLEAN_DETAIL'
export const PUT_USER = 'PUT_USER';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAN_CART = 'CLEAN_CART';
export const FILTER_COMPLEX= "FILTER_COMPLEX";
export const FILTER_FRONT = "FILTER_FRONT";
export const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS';
export const GET_CART_ITEMS = 'GET_CART_ITEMS';

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

//modifica los datos del usuario en la db
export function putUser(email, user) { 
    return async function (dispatch) {
        const json = await axios.put(`/modifyUser/${email}`, user);
        const data = json.data;
        dispatch({
            type: PUT_USER,
            payload: data
        })
    }
}

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

export function cleanDetail() {
    return {
        type: CLEAN_DETAIL,
    };
}

//Cart
export function addToCart(product) {
    return {
        type: ADD_TO_CART,
        payload: product
    }
};
    
export function removeFromCart(product) {
    return {
        type: REMOVE_FROM_CART,
        payload: product
    }
};
    
export function clearCart() {
    return {
        type: CLEAN_CART
    }
};
export function filterFront(payload){
    return {
        type: FILTER_FRONT,
        payload
    }   
}

export const updateCartItems = (cartItems) => ({
    type: UPDATE_CART_ITEMS,
    payload: cartItems,
  });

  export const getCartItems = () => async dispatch => {
    try {
      // Obtener los datos de cartItems desde el localStorage
      const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
      
      // Despachar la acción con los datos de cartItems
      dispatch({
        type: GET_CART_ITEMS,
        payload: cartItems,
      });
    } catch (error) {
      // Manejar errores si hay algún problema al obtener los datos
      console.error("Error al obtener cartItems desde el localStorage:", error);
    }
  };
