import React, {useState,useEffect} from 'react';
import axios from 'axios'

import styles from './data.module.css'

function DataProducts () {
    const [datos, setDatos]=useState([])
    const [paginaActual, setPaginaActual] = useState(1);
    const [elementosPorPagina] = useState(5);
    const [editingProductId, seteditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});

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

    const editHandler = (id) => {
      seteditingProductId(id);
    };
    
    const saveHandler = async(id)=>{
        try {
            const response = await axios.put(`/products/${id}`, editedProduct);
            seteditingProductId(null);
            window.location.reload();
        } catch (error) {
           console.log(error)
        }
    }
    
    const desactivarHandler = async(id, isActive) =>{
        try {
            if(isActive === true){
                const response = await axios.put(`/products/${id}`, {isActive: false})
            }else{
                const response = await axios.put(`/products/${id}`, {isActive: true})
        }
        window.location.reload()
    }catch (error) {
        console.log(error)
        }
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
              <td>
                {editingProductId===dato.id ? (
                <input      //ver como cambiar en el form
                      type="text"
                      value={editedProduct.imageSrc}
                      onChange={(e) =>setEditedProduct({
                        ...editedProduct,
                        imageSrc: e.target.value,
                      })}/>)
                    : (<img className={styles.avatarimg} src={dato.imageSrc} alt={dato.name}/>)}
              </td>
              <td>
                  {editingProductId===dato.id ? (
                      <input
                        type="text"
                        value={editedProduct.name}
                        onChange={(e) => setEditedProduct({
                            ...editedProduct,
                            name: e.target.value,
                        })
                        }
                      />
                ) : (<p className={styles.name}>{dato.name}</p>)}
              </td>
              <td>
                {editingProductId===dato.id ? (
                <input
                    type="text"
                    value={editedProduct.price}
                    onChange={(e) =>
                    setEditedProduct({
                    ...editedProduct,
                    price: e.target.value,
                    })}/>) : 
                    (<span>${dato.price}</span>)}
                </td>
                <td>
                {editingProductId===dato.id ? (
                <input
                type="text"
                value={editedProduct.stock}
                onChange={(e) =>
                setEditedProduct({
                ...editedProduct,
                stock: e.target.value,
            })}/>) 
            : (<span>{dato.stock}</span>)}
                </td>
              {/* UwU */}
              <td>🌟 {dato.rating}</td>
              <td>{dato.isActive===true?(<p>Activo</p>):(<p>Desactivado</p>)}</td>
              <td>
                {editingProductId === dato.id ? (
                <button onClick={() => saveHandler(dato.id)}>Guardar</button>
                ) : (
                <button onClick={() => editHandler(dato.id)}>Editar</button>
                )}
                {dato.isActive ===true? <button onClick={() => desactivarHandler(dato.id, dato.isActive)}>Deshabilitar</button> : <button onClick={() => desactivarHandler(dato.id, dato.isActive)}>Habilitar</button>}
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