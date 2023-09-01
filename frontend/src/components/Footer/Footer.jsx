import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.container_foot}>
        <div className={styles.colum1}>
          <p className={styles.colum1_p}>Más información sobre DLCA Technology</p>
          <span className={styles.colum1_spn}>
            ¡Descubre la tecnología en su máxima expresión!
            ¡Bienvenidos a la revolución tecnológica!
          </span>
        </div>
      </div>
      <div className={styles.container_footer}>
      <div className={styles.copy}>
          © 2014 TODOS LOS DERECHOS RESERVADOS 
        </div>
        <div className={styles.info}>
          <a href="">Nuestras Redes Sociales</a> 
          {/* <a href="">Política de Privacidad</a>  */}
          {/* <a href="">Términos y Condiciones</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
