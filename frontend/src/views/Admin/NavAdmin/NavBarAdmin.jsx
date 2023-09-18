import { Link } from "react-router-dom"

import styles from './NavBarAdmin.module.css'

function NavBarAdmin () {

    return(
        <div className={styles.menu}>
            <div className={styles.item}>
                <span className={styles.title}>MAIN</span>
                <Link to="/admin" className={styles.listItem}>
                    <span className={styles.itemTitle} >INICIO</span>
                </Link>

                <Link to="/admin/usuarios" className={styles.listItem}>
                    <span className={styles.itemTitle}>Usuarios</span>
                    
                </Link>
                <Link to="/admin/productos" className={styles.listItem}>
                    <span className={styles.itemTitle} >Productos</span>
                </Link>
                <Link to="/admin/compras" className={styles.listItem}>
                    <span className={styles.itemTitle} >Compras</span>
                </Link>
            </div>
        </div> 
    )
}

export default NavBarAdmin