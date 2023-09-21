import CantUsuarios from "./Cantidades/Usuarios/CantUsuarios"
import CantProd from "./Cantidades/Productos/CantProd"
import CantCompras from './Cantidades/Compras/CantCompras'
import TopProducts from "./topProducts/topProducts"

import style from "./Dashboard.module.css"

function Dashboard () {

    return(
        <div className={style.Dashboard}>
            
            <div className={style.content1}>
                <CantUsuarios/>
            </div>
            {/* <div className={style.content4}>
                <CantCompras/>
            </div> */}
            <div className={style.content}>
                <TopProducts/>
            </div>
            <div className={style.content2}>
                <CantProd/>
            </div>
            
            
            
        </div>

    )
}

export default Dashboard