import Datagrid from "./datagrid/datagrid"

import style from "./UsuariosAdmin.module.css"

function UsuariosAdmin () {

    return(
        <div className={style.usuarios}>
            <div className={style.info}>
                <h1 className={style.titulo}>Usuarios</h1>
            </div>
            <div className={style.table}>
                <Datagrid/>
            </div>
        </div>
    )
}

export default UsuariosAdmin