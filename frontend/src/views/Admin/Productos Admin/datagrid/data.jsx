import React, {useState,useEffect} from 'react';
import axios from 'axios'

import styles from './data.module.css'

function DataProducts () {
    const [datos, setDatos]=useState([])
    const [paginaActual, setPaginaActual] = useState(1);
    const [elementosPorPagina] = useState(5);

    useEffect(()=>{
        const obtenerDatos = async () => {
            try {
                const response = await axios.get('/prod');
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
        <div className={styles.productos}>
            <table className={styles.tabla}>
                    <thead className={styles.columnas}>
                        <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Rating</th>
                        <th>Estado</th>  
                        <th>Acción</th>
                    </tr></thead>
        <tbody className={styles.filas}>
          {elementosPaginaActual.map((dato) => (
            <tr key={dato.id}>
              <td><img className={styles.avatarimg} src={dato.imageSrc} alt={dato.name}/></td>
              <td><p className={styles.name}>{dato.name}</p></td>
              <td>${dato.price}</td>
              <td>{dato.stock}</td>
              <td>🌟 {dato.rating}</td>
              <td>{dato.isActive===true?(<p>Activo</p>):(<p>Desactivado</p>)}</td>
              <td>
                <button>Editar</button>
                <button>Deshabilitar</button>
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

export default DataProducts