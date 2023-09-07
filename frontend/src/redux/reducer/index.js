import { GET_ALL_PRODUCTS } from "../actions/index.js";
import { GET_PRODUCTS_BYNAME } from "../actions/index.js";
import { GET_PRODUCT_DETAIL } from "../actions/index.js";
import { GET_TAGS } from "../actions/index.js";
import { GET_BRANDS } from "../actions/index.js";
import { CREATE_PRODUCT } from "../actions/index.js";
import { DELETE_PRODUCT } from "../actions/index.js";
// import { FILTER_BY_CREATED } from "../actions/index.js";
import { GET_CATEGORIES } from "../actions/index.js";
import { OPEN_MODAL } from "../actions/index.js";
import { LOGOUT } from "../actions/index.js";
import { GET_SUBCATEGORIES } from "../actions/index.js";
import { ADD_TO_CART } from "../actions/index.js";
import { REMOVE_FROM_CART } from "../actions/index.js";
import { CLEAN_CART } from "../actions/index.js";
import { CLEAN_DETAIL} from "../actions/index.js";
import { FILTER_FRONT } from "../actions/index.js";

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
    cart: [],
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
            // este debe ser filtro para ver si el producto esta activo o no (cambiar)
            // case FILTER_BY_CREATED:
            //     let filtered2 = state.filtered;
            //     let byCreated = action.payload === 'created' ? filtered2.filter(product =>product.custom === true) : filtered2.filter(product => !product.custom);
            //         if (action.payload === 'All') byCreated = filtered2;
            //         return {
            //             ...state,
            //             products: byCreated
            //             };           

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
                return{
                    ...state,
                    productDetail: {}
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
                case FILTER_FRONT:
                    const {brand, category, order, price } = action.payload
                    let productosConFiltros = state.productsCopy.filter((el) =>{
                        let matchesBrand = true
                        let matchesCategory = true
                        if(brand !== "All"){
                            matchesBrand = el.brand === brand
                        } console.log('esta es la amrca',brand)
                        if(category !== "All"){
                            matchesCategory = el.category === category
                        } 
                        return matchesBrand && matchesCategory
                    })
                    if(price === "min"){
                        productosConFiltros.sort((a, b) => a.price - b.price);
                    } else if(price === "max"){
                        productosConFiltros.sort((a, b) => b.price - a.price);
                    }else if(order === "A-Z"){
                        productosConFiltros.sort((a, b) => a.name.localeCompare(b.name));
                    } else if(order === "Z-A"){
                        productosConFiltros.sort((a, b) => b.name.localeCompare(a.name));
                    }
                    console.log('estos son los productos filtrados',productosConFiltros)
                    return{
                    ...state,
                    products: productosConFiltros
                    }
            default:
            return {...state};
        }
    }    
    
    

export { rootReducer};


