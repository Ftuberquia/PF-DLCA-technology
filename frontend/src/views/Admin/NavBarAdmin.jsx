import { Link } from "react-router-dom/cjs/react-router-dom.min"

function NavBarAdmin () {

    return(
        <div>
            <Link to="/admin/usuarios">
                usuarios                
            </Link>
            <Link to="/admin/productos">
                productos  
            </Link>
            <Link to="/admin/compras">
                compras               
            </Link>
        </div>
        
    )
}

export default NavBarAdmin