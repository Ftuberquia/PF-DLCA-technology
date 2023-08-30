import {
    GET_PRODUCTS,
    GET_PRODUCT_NAME,
    GET_DETAILS
} from "./action-types";


const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PRODUCTS:
        const uniqueBrands = Array.from(
          new Set(action.payload.map((product) => product.brand))
        );
        const uniqueCategories = Array.from(
          new Set(action.payload.map((product) => product.category))
        );
        return {
          ...state,
          allProductsCopy: action.payload,
          allProducts: action.payload, //esto es para q los filtros siempre empiecen sobre todos y no sobre el filtro aplicado
          filteredProducts: action.payload,
          brands: uniqueBrands,
          categories: uniqueCategories,
        };

        case GET_PRODUCT_NAME:
      return {
        ...state,
        allProducts: action.payload,
      };

      case GET_DETAILS:
      localStorage.setItem("detail", JSON.stringify(action.payload));
      return {
        ...state,
        productDetail: action.payload,
      };

      case GET_PRODUCT_RATINGS:
        return {
          ...state,
          productRatings: action.payload,
        };
     }
 };

 
export default reducer;