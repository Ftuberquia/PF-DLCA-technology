import axios from "axios";
import {
    GET_PRODUCTS,
  GET_PRODUCT_NAME
} from "./action-types";


// Obtener los productos desde la API
export const getProducts = () => {
    return async function (dispatch) {
      const json = await axios.get("/productos");
      return dispatch({
        type: GET_PRODUCTS,
        payload: json.data,
      });
    };
  };

  //Buscar producto por nombre
export function getProductName(name) {
    return async function (dispatch) {
      try {
        const json = await axios.get(
          `/productos?name=${name}`
        );
        return dispatch({
          type: GET_PRODUCT_NAME,
          payload: json.data,
        });
      } catch (error) {
        alert("Product not found");
      }
    };
  }

  // Para postear el producto
export function postProduct(payload) {
    return async function (dispatch) {
      const response = await axios.post(
        "/productos",
        payload
      );
      return response;
    };
  }

 