import NavBarAdmin from "./NavBarAdmin"

import style from "./Dashboard.module.css"

function Dashboard () {

    return(
        <div className={style.Dashboard}>
            <NavBarAdmin />
            <div>
                HOLA!"#"
            </div>
        </div>

    )
}

export default Dashboard