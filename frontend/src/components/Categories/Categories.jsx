import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import styles from './Categories.module.css';
import { useSelector } from 'react-redux';

function Categories() {
  // const dm = useSelector(state => state.darkMode)

  return (
    <div className={styles.categoriesPage}>
        <NavBar />
        <section className={styles.categories}>
            <Link to='/category/Accesorios'><div>Accesorios</div></Link>
            <Link to='/category/Audifonos'><div>Audífonos</div></Link>
            <Link to='/category/Consolas'><div>Consolas</div></Link>
            <Link to='/category/Laptop'><div>Laptop</div></Link>
            <Link to='/category/Fuentes%20Tarjetas%20y%20Reguladores'><div>Fuentes Tarjetas y Reguladores</div></Link>
            <Link to='/category/Mobiliario%20y%20Sillas'><div>Mobiliario y Sillas</div></Link>
            <Link to='/category/Monitores'><div>Monitores</div></Link>
            <Link to='/category/Perifericos%20e%20Impresoras'><div>Periféricos e Impresoras</div></Link>
            <Link to='/category/Procesadores%20y%20CPU'><div>Procesadores y CPU</div></Link>
            <Link to='/category/Seguridad'><div>Seguridad</div></Link>
            <Link to='/category/Teclados'><div>Teclados</div></Link>
        </section>
        <Footer />
    </div>
  )
}

export default Categories;