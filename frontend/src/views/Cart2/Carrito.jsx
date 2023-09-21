import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2"; // Importa SweetAlert
import axios from "axios";
import { Link } from "react-router-dom";
import ProdCarrito from "./Contenedor/ContenedorProductos";

import styles from './Carrito.module.css'
import { useDispatch } from "react-redux";
import { saveCompra } from "../../redux/actions";

export default function Carrito() {

  const { user, isAuthenticated } = useAuth0();

  const [ productsIdinCart, setProductsIdinCart ] = useState([]);
  const [ userId, setUserId ] = useState(null);
  const [ total, setTotal ]=useState(0)
  const [ cantidad, setCantidad ]=useState(0)
  const [ stock, setStock]=useState(true)

  const dispatch = useDispatch()

  const historyCarrito = useHistory();

  useEffect(()=>{
    getLocalStorage()
    getProductsInCart()
  },[])

  function getLocalStorage(){
    const initialCartData = JSON.parse(localStorage.getItem("cartProducts"));
    if(initialCartData){setProductsIdinCart(initialCartData)
    let total = initialCartData.reduce((acc, el) => acc + el.price * el.quantity, 0);
    let cantidad=initialCartData.reduce((acc, el)=>acc+el.quantity,0)
    setTotal(total)
    setCantidad(cantidad)}
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

  console.log(productsIdinCart)

  function deleteProd(idProd){
    if(userId!==null){
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el producto de tu carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          setProductsIdinCart(productsIdinCart.filter(e=>e.productId!==idProd))
          getProductsInCart()
          Swal.fire("Eliminado", "El producto ha sido eliminado de tu carrito", "success");
        }
      });
    }else{
      setProductsIdinCart(productsIdinCart.filter(e=>e.id!==idProd))
      getProductsInCart()
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
       getProductsInCart()
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
        getProductsInCart()
    }
  }

  useEffect(() => {
    getProductsInCart();
  }, [userId]);

  function sinStock(stockP){
    if(stockP===false){
      setStock(false)
    }
  }

  function comprarHandler(){
    const info={
      productsIdinCart:productsIdinCart.map((p)=>p.productId),  /// Esto tiene un array con los distintos ID. Ejemplo: [1,8,19]
      quantityProduct:productsIdinCart.map((p)=>p.quantity),   /// Esto tiene un array con las distintas cantidades de c/producto. [1,1,3]
      priceProductTotal:productsIdinCart.map((p)=>p.priceT),   /// Esto tiene un aray con los diferentes precios totales de c/producto. [25,70,120]
      totalQuantityProducts:cantidad, ///Esto tiene la cantidad total de todos los productos dentro del carrito
      totalPriceAllProducts:total ///Esto tiene el precio TOTAL de todos los productos dentro del carrito (PRECIO FINAL) 
    }
    
    dispatch(saveCompra(info))
    historyCarrito.push("/compras")
  }

  return(
    <>
        {productsIdinCart?(
            <div className={styles.carrito}>
                <div className={styles.contCard}>
                    <ProdCarrito userId={userId} productsCart={productsIdinCart} deleteProd={deleteProd} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} getLocalStorage={getLocalStorage} sinStock={sinStock}/>
                </div>
                <div className={styles.resumenCompra}>
                    <h1 className={styles.titulo}>Resumen Compra</h1>
                    <h2 className={styles.cantidad}>Productos: {cantidad}</h2>
                    <h2 className={styles.total}>Total a Pagar: ${total}</h2>
                    {isAuthenticated?(stock===true?(<button className={styles.comprar} onClick={comprarHandler}>Comprar</button>):(<h1>Tienes productos fuera de stock</h1>)):(<h1>Debes ingresar para poder comprar</h1>)}
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
                <div>
            <Link to="/favorites">
              <button className={styles.botones1}>Favoritos</button>
            </Link>
          </div>
          <div>
            <Link to="/productos">
              <button className={styles.botones1}>Volver a Productos</button>
            </Link>
          </div>
            </div>
        )}
    </>
  );
}