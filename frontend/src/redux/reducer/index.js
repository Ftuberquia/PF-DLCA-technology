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
import { GET_CATEGORIES } from "../actions/index.js";
import { GET_SUBCATEGORIES } from "../actions/index.js";
import { CLEAN_CATEGORIES } from "../actions/index.js";
import { OPEN_MODAL } from "../actions/index.js";
import { LOGOUT } from "../actions/index.js";

  const initialState = {
    products: [],
    filtered: [],
    brands: [],
    categories: [],
    subcategories: [],
    productDetail: {},
    tags: [],
    loader: false,
    error: {},
    types: [],
    modal: '',
    reviewsFromUser: [],
    productsCopy: [], // copia Estado para emergencias 
    //para regresar al estado original cuando necesite
}

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
                products: action.payload,
                loader: true
            };
            case GET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.payload
            };
            case GET_BRANDS:
            return {
                ...state,
                brands: action.payload
            };
            case GET_TAGS:
            return {
                ...state,
                types: action.payload
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
            case FILTER_BY_BRANDS:                
                let filtered = state.filtered;
                let byBrand = filtered?.filter((product) => product.brands.includes(action.payload))
                if (action.payload === 'All') byBrand = filtered;
                    return {
                        ...state,
                        products: byBrand
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
            const byName = action.payload === 'A-Z' ? state.products.sort((a,b) => {
                if(a.name > b.name) return 1
                if(a.name < b.name) return -1
                return 0
            }) : state.products.sort((a,b) => {
                if(a.name < b.name) return 1
                if(a.name > b.name) return -1
                return 0
            });
            return {
                ...state,
                products: byName
            };

            case GET_CATEGORIES: // acción que recupera la lista de categorías del servidor y actualiza el estado.
                return {
                ...state,
                categories: {
                [action.payload.id]: action.payload.name,
                },
            };

            case GET_SUBCATEGORIES: // acción que ecupera la lista de subcategorías para una categoría determinada y actualiza el estado.
                return {
                ...state,
                subcategories: {
                [action.payload.id]: action.payload.name,
                },
            };
            
            case CLEAN_CATEGORIES: //  acción que elimina todas las categorías y subcategorías del estado.
                return { ...state, categories: {}, subcategories: {} };

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
                return state;
            }
    }        

export { rootReducer};


