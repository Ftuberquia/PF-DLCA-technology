import CantUsuarios from "./Cantidades/Usuarios/CantUsuarios"
import CantProd from "./Cantidades/Productos/CantProd"
import CantReviews from './Cantidades/Reviews/CantReviews'
import CantCompras from './Cantidades/Compras/CantCompras'

import style from "./Dashboard.module.css"

function Dashboard () {

    return(
        <div className={style.Dashboard}>
            <div className={style.content}>Top products?</div>
            <div className={style.content1}>
                <CantUsuarios/>
            </div>
            <div className={style.content2}>
                <CantProd/>
            </div>
            <div className={style.content3}>
                <CantReviews/>
            </div>
            <div className={style.content4}>
                <CantCompras/>
            </div>
            <div className={style.content5}>
                algo
            </div>
            
            
        </div>

    )
}

export default Dashboard