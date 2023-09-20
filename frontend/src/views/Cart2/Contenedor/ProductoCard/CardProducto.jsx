import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Loading from "../../../../components/Loading/Loading";

import style from './CardProducto.module.css'
const CardProducto = (props) => {
    const {productos, userId, deleteProd, increaseQuantity, decreaseQuantity, getLocalStorage} = props

    const [productosLocal, setProductosLocal] = useState([]);

    useEffect(() => {
        if(productos){
            setProductosLocal(productos)
        }      
    },[productos])

    if(productosLocal.length===0){
        return <Loading/>
    }

    function updateQuantityInLocalStorage(productId, quantity) {
      const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    
      const updatedCartProducts = cartProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: quantity,
          };
        }
        return product;
      });
    
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
    }
    
    async function agregarHandler(productId,quantity){
        if(userId){try {
            const body = {
                quantity_prod: quantity + 1,
              };
              await axios.put(`carts/${userId}/${productId}`, body);
              const updatedProductos = productosLocal.map((producto) => {
                if (producto.id === productId) {
                  return {
                    ...producto,
                    quantity: quantity + 1,
                  };
                }
                return producto;
              });
              setProductosLocal(updatedProductos);
              increaseQuantity(productId)
        } catch (error) {
            console.log(error)
        }}else{
            const updatedQuantity = quantity + 1;
            const updatedProductos = productosLocal.map((producto) => {
                if (producto.id === productId) {
                  
                  return {
                    ...producto,
                    quantity: updatedQuantity,
                  };
                }
                return producto;
            });
            updateQuantityInLocalStorage(productId,updatedQuantity)
            setProductosLocal(updatedProductos);
            increaseQuantity(productId);
        }
    }

    async function quitarHandler(productId,quantity){
        if(userId){try {
            const body = { quantity_prod: quantity - 1,};
            await axios.put(`carts/${userId}/${productId}`, body);
            const updatedProductos = productosLocal.map((producto) => {
                if (producto.id === productId) {
                  return {
                    ...producto,
                    quantity: quantity - 1,
                  };
                }
                return producto;
            });
            setProductosLocal(updatedProductos);
            decreaseQuantity(productId)
        } catch (error) {
            console.log(error)
        }}else{
            const updatedQuantity = quantity - 1;
            const updatedProductos = productosLocal.map((producto) => {
                if (producto.id === productId) {
                  return {
                    ...producto,
                    quantity: updatedQuantity,
                  };
                }
                return producto;
            });
            updateQuantityInLocalStorage(productId,updatedQuantity)
            setProductosLocal(updatedProductos);
            decreaseQuantity(productId)
        }
    }
    function deleteFromLocalStorage(productId) {
        const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
      
        const updatedCartProducts = cartProducts.filter(
          (product) => product.id !== productId
        );
      
        localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
      }

    async function eliminarHandler(productId){
        if(userId){try {
            await axios.delete(`carts/${productId}/${userId}`)
            setProductosLocal(productosLocal.filter(e=>e.id!==productId))
            deleteProd(productId)
        } catch (error) {
            console.log(error);
        }}else{
            setProductosLocal(productosLocal.filter(e=>e.id!==productId))
            deleteFromLocalStorage(productId)
            deleteProd(productId)
        }
    }

    return (
        <div className={style.product}>
            {productosLocal.map((producto) => (
                <div key={producto.id} className={style.card}>
                    <img className={style.imagen} src={producto.imagen} alt={producto.name}/>
                    <h3 className={style.nombre}>{producto.nombre}</h3>
                    <p className={style.precio}>${producto.priceT}</p>
                    <div className={style.cantidad}>
                        {producto.quantity===1?(<button disabled>-</button>):(<button onClick={()=>quitarHandler(producto.id,producto.quantity)}>-</button>)}
                        <p>{producto.quantity}</p>
                        {producto.quantity===producto.stock?(<p>No mas stock</p>):(<button onClick={()=>agregarHandler(producto.id,producto.quantity)}>+</button>)}
                    </div>
                    <button onClick={()=>eliminarHandler(producto.id)}>🗑️</button>
                </div>
            ))}
        </div>
    );
};

export default CardProducto;