import React, {useState,useEffect} from 'react';
import axios from "axios";

import styles from './topProducts.module.css';

function TopProducts(){
    const [datos, setDatos]=useState([])

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

    const sortedData = datos.sort((a, b) => b.rating - a.rating);
    const topProducts = sortedData.slice(0, 5);

    return(
        <div className={styles.topproductos}>
            <h1 className={styles.titulo}>Top Productos</h1>
            
            <table className={styles.tabla}>
                <tbody className={styles.filas}>
                    {topProducts.map((dato,index)=>(
                        <tr key={dato.id}>
                            <td><h1 className={styles.numero}>#{index+1}</h1></td>
                            <td><img className={styles.avatarimg} src={dato.imageSrc} alt={dato.name}/></td>
                            <td><p className={styles.name}>{dato.name}</p></td>
                            <td><h1 className={styles.rating}>🌟{dato.rating}</h1></td>
                        </tr>
                    ))}                 
                </tbody>
            </table>
        </div>   
    )

}

export default TopProducts;