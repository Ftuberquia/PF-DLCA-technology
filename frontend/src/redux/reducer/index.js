import { GET_ALL_PRODUCTS } from "../actions/index.js";
import { GET_PRODUCTS_BYNAME } from "../actions/index.js";
import { GET_PRODUCT_DETAIL } from "../actions/index.js";
import { GET_TAGS } from "../actions/index.js";
import { GET_BRANDS } from "../actions/index.js";
import { CREATE_PRODUCT } from "../actions/index.js";
import { DELETE_PRODUCT } from "../actions/index.js";
import { GET_CATEGORIES } from "../actions/index.js";
import { OPEN_MODAL } from "../actions/index.js";
import { LOGOUT } from "../actions/index.js";
import { GET_SUBCATEGORIES } from "../actions/index.js";
import { ADD_TO_CART } from "../actions/index.js";
import { REMOVE_FROM_CART } from "../actions/index.js";
import { CLEAN_CART } from "../actions/index.js";
import { CLEAN_DETAIL } from "../actions/index.js";
import { UPDATE_CART_ITEMS } from "../actions/index.js";
import { GET_CART_ITEMS } from "../actions/index.js";
import { SAVE_CART_SUCCESS } from "../actions/index.js";
import { SAVE_CART_ERROR } from "../actions/index.js";
import { SAVE_PRODUCT_IN_CART_SERVER } from "../actions/index.js";
import { SAVE_PRODUCT_IN_CART_ERROR } from "../actions/index.js";
import { GET_PURCHASED_PRODUCTS } from "../actions/index.js";
import { SAVE_USER } from "../actions/index.js";
import { CLEAN_USER } from "../actions/index.js";


const initialState = {
  products: [],
  order: [],
  brands: [],
  categories: [],
  subcategories: [], //pendiente
  productDetail: {},
  tags: [],
  loader: false,
  error: {},
  modal: "",
  reviewsFromUser: [],
  cart: [],
  productsCopy: [], // copia Estado para emergencias
  cartItems: JSON.parse(localStorage.getItem("cartProducts")) || [],
  purchasedProducts: [], // Nuevo estado para los productos comprados!!!!!!
  user: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filtered: action.payload,
        productsCopy: action.payload, // copia estado
        loader: true,
      };
    case GET_PURCHASED_PRODUCTS:
      return {
        ...state,
        purchasedProducts: action.payload,
      };
    case UPDATE_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case GET_PRODUCTS_BYNAME:
      return {
        ...state,
        products: action.payload, // cambio uwu
        loader: true,
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
    case GET_TAGS:
      return {
        ...state,
        types: action.payload,
      };
    case GET_SUBCATEGORIES:
      return {
        ...state,
        subcategories: action.payload,
      };
    case CREATE_PRODUCT:
      if (action.payload.status === 200) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          error: action.payload.data,
        };
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        productDetail: {},
      };
    case OPEN_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        reviewsFromUser: [],
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        productDetail: {},
      };
    case ADD_TO_CART:
      const productToAdd = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === productToAdd.id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += 1;

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...productToAdd, quantity: 1 }],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case CLEAN_CART:
      return {
        ...state,
        cart: [],
      };

    case SAVE_PRODUCT_IN_CART_SERVER:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SAVE_PRODUCT_IN_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SAVE_USER:
      return {
        ...state,
        user: action.payload,
      }
    case CLEAN_USER:
      return{
        ...state,
        user: {}
      }
    default:
      return { ...state };
  }
};

export { rootReducer };
