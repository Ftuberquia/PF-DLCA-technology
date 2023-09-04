import { GET_ALL_PRODUCTS } from "../actions/index.js";
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


  const initialState = {
    products: [],
    filtered: [],
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
                const categoryToFilter = action.payload; 
                const allProducts = [...state.products]; 
                let filteredProducts = [];
                if (categoryToFilter === 'All') {
                    filteredProducts = allProducts;
                } else {
                    filteredProducts = state.productsCopy.filter((product) =>
                    product.category=== categoryToFilter
                    );
                }
                return {
                    ...state,
                    products: filteredProducts,
                };
                case FILTER_BY_BRANDS:
                    let filtered = [...state.products]; // Asegura que state.filtered sea un arreglo
                    let byBrand = [];
                
                    if (action.payload === 'All') {
                        byBrand = filtered; // Clona el arreglo si se selecciona 'All'
                    } else {
                        byBrand = state.productsCopy.filter((product) =>
                            product.brand === action.payload
                        );
                    }
                    console.log(byBrand);
                    return {
                        ...state,
                        products: byBrand,
                    };
            case FILTER_BY_CREATED:
                let filtered2 = state.filtered;
                let byCreated = action.payload === 'created' ? filtered2.filter(product =>product.custom === true) : filtered2.filter(product => !product.custom);
                if (action.payload === 'All') byCreated = filtered2;
                    return {
                    ...state,
                    products: byCreated
            };           
            
            case ORDER_BY_NAME:
                const sortedProducts = [...state.products]; // Clonamos la lista de productos para no mutarla directamente

                if (action.payload === 'A-Z') {
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                } else if (action.payload === 'Z-A') {
                    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                }

                return {
                    ...state,
                    products: sortedProducts,
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


