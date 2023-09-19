import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Hay que asegurarse de importar useAuth0
import axios from "axios";

import { getProductDetail, cleanDetail, addToCart } from "../../redux/actions/index";
import { addFavorite, deleteFavorite, fetchData } from "../../views/Favorites/funcionesFav";
import { cache } from "../../components/NavBar/NavBar";

import Swal from "sweetalert2";
import style from "./ProductDetail.module.css";
import Loading from "../../components/Loading/Loading";


const ProductDetail = () => {
  const { id } = useParams();

  const product = useSelector((state) => state.productDetail);

  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState(null);
  const [productReviews, setProductReviews] = useState([]);
  const [inCart, setInCart] = useState(false)

  const dispatch = useDispatch();
  const history = useHistory();
  const [cartQuantity, setCartQuantity] = useState(1); // Estado para la cantidad en el carrito

 // STATE
 const [isLoading, setIsLoading] = useState(true);

  // Estado de autenticación
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    dispatch(getProductDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  //Reviews
  useEffect(() => {
    const fetchProductReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/reviews/${id}`);
        setProductReviews(response.data);
      } catch (error) {
        console.error('Error al obtener las reseñas del producto', error);
      }
    };
  
    fetchProductReviews();
  }, [id]);

  //UsuarioId
  useEffect(() => {
    if (isAuthenticated && user) {
      const userIdLogin = user.sub;
      setUserId(userIdLogin);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    checkFavoriteStatus();
    checkCart();
  }, [userId, product.id]);

  //verificar si el producto esta en favoritos
  const checkFavoriteStatus = async () => {
    if(userId!==null){
      try {
        // Llamar a la función fetchData para obtener los productos favoritos del usuario
        const favoriteProducts = await fetchData(userId);
        if(!favoriteProducts.message){
          // Verificar si el producto actual está en la lista de productos favoritos
          const isProductFavorite = favoriteProducts.some((p) => p.id === product.id);
          setIsFavorite(isProductFavorite);
        };
      } catch (error) {
        console.error(error);
      }
    }else{
      setIsFavorite(false)
    }
  };
  
  //verifico si esta en el carrito
  const checkCart = async () => {
    if (userId === null) {
      const storedCartProducts = localStorage.getItem("cartProducts");
      const parsedCartProducts = storedCartProducts
        ? JSON.parse(storedCartProducts)
        : [];
      // Buscar si ya existe un producto con el mismo 'id' en el carrito
      const existingProductIndex = parsedCartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito
        setInCart(existingProductIndex)
      }else setInCart(false)
    }else if(userId!==null){
      try {
        const response = await axios.get(`carts/${userId}`)
        const data= await response.data
        let productInCart=data[1].some((prod)=>prod.productId===product.id)
        if(productInCart){
          setInCart(true)
        }else{
          setInCart(false)
        }
      } catch (error) {
        console.error("Error en el front al revisar el carrito", error);
      }
    }
  }

  const addToFavorites = async () => {
    if (userId===null) {
      alert("Debes iniciar sesión para agregar a favoritos");
    } else {
      try {
        await addFavorite(product.id,userId);
        setIsFavorite(true);
      } catch (error) {
        console.error("Error al agregar a favoritos:", error);
      }
    }
  };

  const removeFromFavorites = async () => {
    try {
      await deleteFavorite(product.id, userId);
      setIsFavorite(false);
      alert('Producto eliminado de favoritos!');
    } catch (error) {
      console.error('Error al eliminar de favoritos:', error);
    }
  };

  function decrementCartQuantity() {
    // disminuye en 1 la cantidad del producto en el carrito, pero solo si la cantidad actual es mayor que 1.
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
    }
  }

  function incrementCartQuantity() {
    // incrementa en 1 la cantidad del producto en el carrito, pero solo si la cantidad actual es menor que el stock del producto.
    if (cartQuantity < product.stock) {
      setCartQuantity(cartQuantity + 1);
    }
  }

  // Agrego el producto al carrito despachando la acción con el producto y su cantidad.
  const addProductToCart=async()=>{
    if (userId === null) {
      // Almacena en el localStorage
      const productToAdd = {
        id:product.id,
        name:product.name,
        imageSrc:product.imageSrc,
        price:product.price,
        rating:product.rating,
        stock:product.stock,
        quantity:cartQuantity};
      const storedCartProducts = localStorage.getItem("cartProducts");
      const parsedCartProducts = storedCartProducts
        ? JSON.parse(storedCartProducts)
        : [];

      // Buscar si ya existe un producto con el mismo 'id' en el carrito
      const existingProductIndex = parsedCartProducts.findIndex(
        (item) => item.id === productToAdd.id
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, suma la cantidad al producto existente
        parsedCartProducts[existingProductIndex].quantity +=
          productToAdd.quantity;
      } else {
        // Si no existe, agrega el producto al carrito
        parsedCartProducts.push(productToAdd);
      }

      localStorage.setItem("cartProducts", JSON.stringify(parsedCartProducts));
      setInCart(true); // Establece el estado como "en el carrito"
    } else {
      try {
        const body={quantity_prod:cartQuantity}
        const response = await axios.post(`carts/${userId}/${product.id}`,body)
        const data= await response.data
        if(data.message==="producto agregado al carrito"){
          setInCart(true)
        }
      } catch (error) {
        console.error("Error en el front al agregar al carrito", error);
      }
    }
  }

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addProductToCart()
      // Si el producto tiene stock, muestra un mensaje de éxito y redirige al usuario a la página del carrito.
      Swal.fire({
        title: "Agregado",
        text: "¡Producto añadido al carrito!",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#28a745",
      });
      history.push("/carrito"); // Redirige a cart para continuar la compra
    } else {
      Swal.fire({
        // En caso contrario, muestra un mensaje de advertencia.
        title: "Lo sentimos",
        text: "No hay stock para este producto",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    }
  };

  // maneja el proceso de compra. Si el usuario está autenticado y el producto tiene stock.
  function handleBuyNow(event) {
    if (isAuthenticated) {
      if (product.stock > 0) {
        //Aqui se envia la informacion de la compra
        history.push(`/compra`); // agrega el producto al carrito y redirige al usuario a la página de pago.
      } else {
        Swal.fire({
          // De lo contrario, muestra un mensaje de advertencia o solicita al usuario que inicie sesión.
          title: "Lo sentimos",
          text: "No hay stock para este producto",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
    } else {
      handleCartLogin(event);
    }
  }

  // muestra un mensaje de inicio de sesión si el usuario no está autenticado e intenta comprar un producto.
  const handleCartLogin = (event) => {
    Swal.fire({
      // Si el usuario inicia sesión, será redirigido automáticamente a la página del carrito.
      title: "Inicie sesión",
      text: "Por favor inicia sesión para comprar.",
      icon: "warning",
      confirmButtonText: "Iniciar sesión",
      confirmButtonColor: "#28a745",
    }).then((result) => {
      if (result.isConfirmed) {
        loginWithRedirect();
      }
    });
    event.preventDefault();
  };

  useEffect(() => {
    // Establecer isLoading en falso después de 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={style.loadingContainer}>
          <Loading />
        </div>
      ) : (
    <div className={style.conteiner}>
      <div className={style.contNavCat}>
        <Link to={"/productos"} className={style.volver}>
          ← Volver al listado
        </Link>
        <p>{product.category}</p>
        <p>{">"}</p>
        <p>{product.subcategory}</p>
      </div>
      <hr />
      <div className={style.contProducto}>
        <div className={style.detalles1}>
          <h1>{product.name}</h1>
          <h3>Marca: {product.brand}</h3>
          {isFavorite ? (
            <button className={style.fav} onClick={removeFromFavorites}>
              ❤️
            </button>
          ) : (
            <button className={style.fav} onClick={addToFavorites}>
              🤍
            </button>
          )}
          <img src={product.imageSrc} alt={product.imageAlt} />
          <hr />
          <div className={style.detalles2}>
            <h2>Descripción:</h2>
            <p>{product.description}</p>
            <h2>Reseñas de los usuarios</h2>
            <ul className={style.productreviewslist}>
              {productReviews.map((review) => (
                <li key={review.id}>
                  <p>Comentario: {review.comment}</p>
                  <p>Calificación: {review.rating}</p>
                  <p>Usuario: {review.userEmail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={style.infoCompra}>
          <h2>${product.price}</h2>

          {inCart?(<p>producto en carrito</p>):(
            <div className={style.cantidad}>
              <button onClick={decrementCartQuantity}>-</button>
              <p>{cartQuantity}</p>
              <button onClick={incrementCartQuantity}>+</button>
            </div>
          )}

          {inCart?(<Link to={'/carrito'}><button>Ir a carrito</button></Link>):(
            <button className={style.agregarCarrito} onClick={handleAddToCart}>
              Agregar al carrito
            </button>)}

          {isAuthenticated ? (
            <Link to={`/compra`}>
              <button className={style.comprar} onClick={handleBuyNow}>Comprar Ahora</button>
            </Link>
          ) : (
            <button className={style.comprar} onClick={handleCartLogin}>
            Comprar ahora
            </button>
          )}
         
            </div>
          </div>
        </div>
            // <form>
            //     <label htmlFor="comment">Comentario:</label>
            //     <textarea id="comment" name="comment" />
            //     <button type="submit">Enviar comentario</button>
            // </form>
            // <div className="rating">
            //     <span className="star">&#9733;</span>
            //     <span className="star">&#9733;</span>
            //     <span className="star">&#9733;</span>
            //     <span className="star">&#9734;</span>
            //     <span className="star">&#9734;</span>
            //     <p>Calificación promedio: 3 estrellas</p>
            // </div>
          )}
      </>
    );
  };


export default ProductDetail;