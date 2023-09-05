import { GET_ALL_PRODUCTS, filterByBrand } from "../actions/index.js";
import { GET_PRODUCTS_BYNAME } from "../actions/index.js";
import { GET_PRODUCT_DETAIL } from "../actions/index.js";
import { GET_TAGS } from "../actions/index.js";
import { GET_BRANDS } from "../actions/index.js";
import { CREATE_PRODUCT } from "../actions/index.js";
import { DELETE_PRODUCT } from "../actions/index.js";
import { FILTER_BY_BRANDS } from "../actions/index.js";
import { FILTER_BY_CREATED } from "../actions/index.js";
import { ORDER_BY_NAME } from "../actions/index.js";
import { FILTER_BY_CATEGORY } from "../actions/index.js";
import { GET_CATEGORIES } from "../actions/index.js";
import { OPEN_MODAL } from "../actions/index.js";
import { LOGOUT } from "../actions/index.js";
import { GET_SUBCATEGORIES } from "../actions/index.js";
import {ORDER_BY_PRICE} from "../actions/index.js";
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
    modal: '',
    reviewsFromUser: [],
    productsCopy: [], // copia Estado para emergencias 
    //para regresar al estado original cuando nesesite
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                filtered: action.payload,
                productsCopy: action.payload, // copia estado
                loader: true
            };

            case GET_PRODUCTS_BYNAME:
            return {
                ...state,
                products: action.payload, // cambio uwu
                loader: true
            };
            case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload
            };
            case GET_CATEGORIES:
                console.log(state.categories)
            return {
                ...state,
                categories: action.payload
            };
            case GET_BRANDS:
                console.log(state.brands)
            return {
                ...state,
                brands: action.payload
            };
            case GET_TAGS:
            return {
                ...state,
                types: action.payload
            };
            case GET_SUBCATEGORIES:
                return {
                    ...state,
                    subcategories: action.payload
                };
            case CREATE_PRODUCT:
                if (action.payload.status === 200) { 
                    return {
                    ...state,
                    }; 
                } else { 
                    return {
                    ...state,
                    error: action.payload.data
                    };
                }
            case DELETE_PRODUCT:
                    return {
                        ...state,
                        productDetail: {},
                    }   
            case FILTER_BY_CATEGORY:
                let categoryToFilter = action.payload;
                let filteredByCategory = [...state.productsCopy]; // Copia de productos originales

                if (categoryToFilter !== 'All') {
                    filteredByCategory = filteredByCategory.filter(
                    (product) => product.category === categoryToFilter
                    );
                if (filteredByCategory.length === 0) {
                        // Muestra una alerta si no se encuentran productos con la categoría seleccionada
                        alert(`No hay productos en la categoría "${categoryToFilter}" con la combinación de filtros.`);
                    }    
                }
                return {
                    ...state,
                    products: filteredByCategory,
                };
            case FILTER_BY_BRANDS:
                let brandToFilter = action.payload;
                let filteredByBrand = [...state.productsCopy]; // Copia de productos originales

                if (brandToFilter !== 'All') {
                    filteredByBrand = filteredByBrand.filter(
                    (product) => product.brand === brandToFilter
                    );
                }
                if (filteredByBrand.length === 0) {
                    // Muestra una alerta si no se encuentran productos con la marca seleccionada
                    alert(`No hay productos de la marca "${brandToFilter}" con la combinación de filtros.`);
                }
                return {
                    ...state,
                    products: filteredByBrand,
                };
            case ORDER_BY_NAME:
                let sortedProducts = [...state.products]; // Clonar la lista de productos

                if (action.payload === 'A-Z') {
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                } else if (action.payload === 'Z-A') {
                    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                }
                return {
                    ...state,
                    products: sortedProducts,
                };
            case ORDER_BY_PRICE:
                const sortedProductsByPrice = [...state.productsCopy]; // Clonamos la lista de productos originales

                if (action.payload === 'min') {
                    sortedProductsByPrice.sort((a, b) => a.price - b.price);
                } else if (action.payload === 'max') {
                    sortedProductsByPrice.sort((a, b) => b.price - a.price);
                }

                return {
                    ...state,
                    products: sortedProductsByPrice,
                };

            case FILTER_BY_CREATED:
                let filtered2 = state.filtered;
                let byCreated = action.payload === 'created' ? filtered2.filter(product =>product.custom === true) : filtered2.filter(product => !product.custom);
                    if (action.payload === 'All') byCreated = filtered2;
                    return {
                        ...state,
                        products: byCreated
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
    
                   
            default:
            return {...state};
        }
    }        

export { rootReducer};


