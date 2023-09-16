import React, {useState,useEffect} from 'react';
import axios from 'axios'

import styles from './datagrid.module.css'

function Datagrid () {
    const [datos, setDatos]=useState([])
    const [paginaActual, setPaginaActual] = useState(1);
    const [elementosPorPagina] = useState(10);

    useEffect(()=>{
        const obtenerDatos = async () => {
            try {
                const response = await axios.get('/users');
                setDatos(response.data);
              } catch (error) {
                console.error('Error al obtener los datos:', error);
              }
          };
      
          obtenerDatos();
    }, []);

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const elementosPaginaActual = datos.slice(indicePrimerElemento, indiceUltimoElemento);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const paginacion = [];
    for (let i = 1; i <= Math.ceil(datos.length / elementosPorPagina); i++) {
        paginacion.push(
            <button
                key={i}
                onClick={() => cambiarPagina(i)}
                className={paginaActual === i ? 'active' : ''}
            >
            {i}
            </button>
        );
    }

    return(
      <div className={styles.usuarios}>
        <table className={styles.tabla}>
          <thead className={styles.columnas}>
            <tr>
              <th>Avatar</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Creado</th> 
              <th>Rol</th> 
              <th>Acción</th>
            </tr></thead>
          <tbody className={styles.filas}>
            {elementosPaginaActual.map((dato) => (
              <tr key={dato.id}>
                <td><img className={styles.avatarimg} src={dato.avatar_img} alt={dato.first_name}></img></td>
                <td>{dato.first_name}</td>
                <td>{dato.last_name}</td>
                <td>{dato.email}</td>
                <td>{dato.isActive===true?(<p>Activo</p>):(<p>Desactivado</p>)}</td>
                <td>{dato.createdAt}</td>
                <td>{dato.admin===true?(<p>Administrador</p>):(<p>Usuario</p>)}</td>
                <td>
                  <button>Editar</button>
                  <button>Bloquear</button>
                </td>
              </tr>
            ))}
          </tbody>         
        </table>
        <div className={styles.pagination}>
          {paginacion}
        </div>
      </div>
    )
}

export default Datagrid