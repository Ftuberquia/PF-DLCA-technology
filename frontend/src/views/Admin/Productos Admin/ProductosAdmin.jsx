import {Link} from 'react-router-dom'
import DataProducts from './datagrid/data'

import styles from './ProductosAdmin.module.css'

function ProductosAdmin () {

    return(
        <div className={styles.productos}>
            <div className={styles.info}>
                <h1 className={styles.titulo}>Productos</h1>
                <Link to='/admin/form'>
                    <button>Agregar Producto</button>
                </Link>
            </div>
            <DataProducts />
        </div>
    )
}

export default ProductosAdmin