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
    productsCopy: [], // copia Estado para emergencias 
    //para regresar al estado original cuando nesesite
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
                products: state.products.filter((product) => product.name === action.payload.name),
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
                   
            default:
            return {...state};
        }
    }        

export { rootReducer};


