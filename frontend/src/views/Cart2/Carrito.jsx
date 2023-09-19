import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2"; // Importa SweetAlert
import axios from "axios";

import ProdCarrito from "./Contenedor/ContenedorProductos";

import styles from './Carrito.module.css'

export default function Carrito() {

  const { user, isAuthenticated } = useAuth0();

  const [ productsIdinCart, setProductsIdinCart ] = useState([]);
  const [ userId, setUserId ] = useState(null);
  const [ total, setTotal ]=useState(0)
  const [ cantidad, setCantidad ]=useState(0)

  useEffect(()=>{
    getLocalStorage()
    getProductsInCart()
  },[])

  //COMO ENVIO LO QUE ESTA EN EL LOCAL STORAGE A LA DB?

  function getLocalStorage(){
    const initialCartData = JSON.parse(localStorage.getItem("cartProducts"));
    setProductsIdinCart(initialCartData)
    let total = initialCartData.reduce((acc, el) => acc + el.price * el.quantity, 0);
    let cantidad=initialCartData.reduce((acc, el)=>acc+el.quantity,0)
    console.log('productos',productsIdinCart)
    setTotal(total)
    setCantidad(cantidad)
  }

  //Para obtener el id del usuario
  useEffect(() => {
    if (isAuthenticated && user) {
      const userIdLogin = user.sub;
      setUserId(userIdLogin);
    }
  }, [isAuthenticated, user]);

  //Chequear si hay productos en el carrito y traer su id
  const getProductsInCart=()=>{
    if (userId!==null) {
        axios.get(`carts/${userId}`)
        .then((res)=>{
          setProductsIdinCart(res.data[1].map((item)=>{
            return {productId:item.productId, quantity:item.quantity_prod, priceT:item.total_price_product}
          }))
          setTotal(res.data[0].total_precio)
          setCantidad(res.data[0].quantity)
        })
      }else{
        getLocalStorage()
      }
  }

  function deleteProd(idProd){
    if(userId!==null){
        setProductsIdinCart(productsIdinCart.filter(e=>e.productId!==idProd))
        getProductsInCart()
    }else{
        setProductsIdinCart(productsIdinCart.filter(e=>e.id!==idProd))
        //PROBLEMAS CON EL PRECIO TOTAL
        setTotal(
            productsIdinCart.reduce(
                (acc, el) => acc + el.price * el.quantity + 1,
                0
            )
            );
            setCantidad(
                productsIdinCart.reduce((acc, el) => acc + el.quantity, 1)
            );
        localStorage.setItem("cartProducts", JSON.stringify(productsIdinCart));
    }
  }

  function increaseQuantity(productId) {
    if(userId!==null){setProductsIdinCart((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === productId
            ? {
                ...product,
                quantity: product.quantity + 1,
                price: product.price * (product.quantity + 1),
              }
            : product
        ));
        getProductsInCart()
    }else{
        setProductsIdinCart((prevProducts) =>
        prevProducts.map((product) =>
            product.id === productId
            ? {
                ...product,
                quantity: product.quantity + 1,
                }
            : product
        )
        );
        //PROBLEMAS CON EL PRECIO TOTAL
        setTotal(
        productsIdinCart.reduce(
            (acc, el) => acc + el.price * el.quantity + 1,0)
        );
        setCantidad(
            productsIdinCart.reduce((acc, el) => acc + el.quantity, 1)
        );
        localStorage.setItem("cartProducts", JSON.stringify(productsIdinCart));
        
    }
  }

  function decreaseQuantity(productId) {
    if(userId!==null){setProductsIdinCart((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId && product.quantity > 0
          ? {
              ...product,
              quantity: product.quantity - 1,
              price: product.price * (product.quantity - 1),
            }
          : product
      ))
      getProductsInCart();  
    } else{
        setProductsIdinCart((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId && product.quantity > 0
            ? {
                ...product,
                quantity: product.quantity - 1,
              }
            : product
        ));
        //PROBLEMAS CON EL PRECIO TOTAL
        setTotal(productsIdinCart.reduce((acc, el) => acc + el.price * el.quantity - 1,0));
        setCantidad(productsIdinCart.reduce((acc, el) => acc + el.quantity, -1));
        localStorage.setItem("cartProducts", JSON.stringify(productsIdinCart));
    }
  }

  useEffect(() => {
    getProductsInCart();
  }, [userId]);

  return(
    <>
        {productsIdinCart?(
            <div className={styles.carrito}>
                <div className={styles.contCard}>
                    <ProdCarrito userId={userId} productsCart={productsIdinCart} deleteProd={deleteProd} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} getLocalStorage={getLocalStorage}/>
                </div>
                <div className={styles.resumenCompra}>
                    <h1 className={styles.titulo}>Resumen Compra</h1>
                    <h2 className={styles.cantidad}>Productos: {cantidad}</h2>
                    <h2 className={styles.total}>Total a Pagar: ${total}</h2>
                    {isAuthenticated?(<Link to={'/compras'}><button className={styles.comprar}>Comprar</button></Link>):(<h1>Debes ingresar para poder comprar</h1>)}
                </div>
            </div>
        ) : (
            <div>
                <h2 className="cart-message-center">Tu Carrito Esta Vacio</h2>
                <button
                onClick={() =>
                    Swal.fire({
                    title: "¡El carrito está vacío!",
                    text: "Por favor agregue un producto al carrito",
                    icon: "warning",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#28a745",
                    })
                }
                className="BUY"
                >
                Comprar
                </button>
            </div>
        )}
    </>
  );
}