import { useState, useRef, useEffect } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHeart, faCartShopping, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import styles from './Responsive.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const Responsive = () => { // menú desplegable

  const [show, setShow] = useState(false) //  declara una variable de estado llamada show y la inicializa en falso
  const parent = useRef(null) // declara una variable de referencia llamada padre y la inicializa como nula
  const dispatch = useDispatch()

  const loggedUser = useSelector((state) => state.loggedUser);

  useEffect(() => { // Comprueba si la referencia principal no es nula y le aplica una animación utilizando la función autoAnimate 
    parent.current && autoAnimate(parent.current)
  }, [parent]) // declara un efecto que se ejecuta cuando se monta el componente y siempre que cambia la referencia principal. 

  const reveal = () => setShow(!show)
    // Para saber cuantos elementos se agregaron a favoritos
    const favs = useSelector(state => state.favorites)
    const cart = useSelector(state => state.cart)
    

  return <div ref={parent} className={styles.dropdown}>
    <div className={styles.menu} onClick={reveal}>
        <FontAwesomeIcon className={styles.menuIcon} name='menu' icon={faBars} />
    </div>
    { show && 
    <div className={`dropdown-content`} >
        <div className={styles.userItems}>
            {/* <button onClick={()=> dispatch(toggleDarkMode())} ><FontAwesomeIcon icon={dm ? faSun : faMoon} /></button> */}
            <Link to='/favorites'><span><FontAwesomeIcon icon={faHeart} />&nbsp;&nbsp; {favs.length}</span></Link>
            <Link to='/cart'><span><FontAwesomeIcon name='cart' icon={faCartShopping} />&nbsp;&nbsp; {cart.length}</span></Link>
        </div>
        <div className={styles.menuItems}>
            <Link to='/home' ><p>HOME</p></Link>
            <Link to='/about' ><p>SOBRE DLCA TECHNOLOGY</p></Link>
            <Link to='/categories' ><p>CATEGORIAS</p></Link>
            <Link to='/products' ><p>PRODUCTOS</p></Link>
            <Link to='/favorites' ><p>FAVORITOS</p></Link>
            <Link to='/cart' ><p>CARRITO</p></Link>
            <Link to='/compras'><p>VER ESTADO DE PEDIDO</p></Link> 
        </div>


        {!Object.keys(loggedUser).length ? ( // si el estado loggedUser en la tienda Redux está vacío o no. Si está vacío, muestra enlaces a las páginas de inicio de sesión y registro. 
        <div className={styles.session} > 
            <Link to='/login'><p>Inicar Sesión</p></Link>
            <Link to='/register'><p>Registrarse</p></Link> 
        </div>
        ) : (
         <div className={styles.session} >
            <Link to='*'><p>Mi perfil</p></Link>
            {/* <Link to='/login'><p onClick={() => logoutUser()}>Cerrar sesión</p></Link> */}
         </div>
            )}
    </div> 
    }
  </div>
};

export default Responsive;