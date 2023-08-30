const initialState = {
    dbProducts: [],
    Products: [],
    productsBackUp: [] // productsBackUp variable de estado para almacenar una copia de la dbProducts. Esto permitirá restaurar la db a su estado anterior si algo sale mal.
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'GET_DBPRODUCTS':
        return {
          ...state,
          dbProducts: action.payload,
          Products: action.payload,
          productsBackUp: state.Products
        };
      default:
        return state;
    }
  };