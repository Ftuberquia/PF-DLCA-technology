import React, {useState, useEffect} from "react";
import axios from "axios";

import CardProducto from "./ProductoCard/CardProducto";

import style from "./ContenedorProductos.module.css";

export default function ProdCarrito(props){
    const {userId, productsCart, deleteProd, increaseQuantity, decreaseQuantity, getLocalStorage}=props

    const [cart, setCart]=useState([])

    async function infoProductos(){
        if(userId!==null){
            try {
                const requests = productsCart.map((product) =>
                    axios.get(`/products/${product.productId}`)
                    );
                const responses = await Promise.all(requests);
                const data = responses.map((response) => response.data);
    
                setCart(data);
            } catch (error) {
                console.log(error)
            }
        }else{
            const updatedCart = productsCart.map((producto) => ({
                ...producto,
                priceT: producto.quantity * producto.price,
            }));
            setCart(updatedCart)
        }
    }

    useEffect(() => {
      infoProductos();
    }, [productsCart]);

    return(
        <div>
        {userId!==null?
        (<div className={style.cont}>
            <CardProducto 
                productos={cart?.map((producto, index) => ({
                    key:index,
                    id: producto.id,
                    imagen: producto.imageSrc,
                    nombre: producto.name,
                    precio: producto.precio,
                    stock: producto.stock,
                    priceT: productsCart.find((item) => item.productId === producto.id)?.priceT||0,
                    quantity: productsCart.find((item) => item.productId === producto.id)?.quantity||0,
                }))}
                userId={userId} 
                deleteProd={deleteProd}
                increaseQuantity={increaseQuantity} 
                decreaseQuantity={decreaseQuantity}
            />
        </div>
            ):(
            <div className={style.cont}>
                <CardProducto
                    productos={cart?.map((producto, index) => ({
                        key:index,
                        id: producto.id,
                        imagen: producto.imageSrc,
                        nombre: producto.name,
                        precio: producto.precio,
                        stock: producto.stock,
                        priceT: producto.priceT,
                        quantity: producto.quantity,
                    }))}
                    userId={userId} 
                    deleteProd={deleteProd}
                    increaseQuantity={increaseQuantity} 
                    decreaseQuantity={decreaseQuantity}
                    getLocalStorage={getLocalStorage}
                />
            </div>
            )}
        </div>
    )
}