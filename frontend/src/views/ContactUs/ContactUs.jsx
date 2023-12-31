import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactUs.module.css';
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export const ContactUs = () => {

    const refForm = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        const serviceId = 'service_u05znjz';
        const templateId = 'template_c9zye1k';
        const apikey = 'dl6sI5xgzMzAmHsFV';
        
        emailjs.sendForm(serviceId, templateId, refForm.current, apikey)
        .then(result => {
            console.log(result.text);
            window.alert('¡El correo se ha enviado con éxito!');
        })
        .catch(error => {
            console.error(error);
            window.alert('Hubo un error al enviar el correo. Por favor, inténtalo de nuevo.');
        });
    }
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Establecer isLoading en falso después de 2 segundos
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    return (
        <>
        {isLoading ? (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <div className={styles.container}>
            <div className={styles.title}>
        <h2>Contáctenos</h2>
        <form ref={refForm} action="" onSubmit={handleSubmit} className={styles.form}>
            <fieldset className={styles.fieldset}>
                <label htmlFor="" className={styles.label}>Nombre: </label>
                <input name='from_name' type="text" placeholder='Escribe tu nombre' required/>
            </fieldset>
            <fieldset className={styles.fieldset}>
                <label htmlFor="" className={styles.label}>Email: </label>
                <input name='from_email' type="email" placeholder='Escribe tu email' required/>
            </fieldset>
            <fieldset className={styles.fieldset}>
                <label htmlFor="" className={styles.label}>Mensaje: </label>
                <textarea maxLength="500" placeholder="Escribe tu mensaje" name="message" id="" cols="30" rows="10"></textarea>
            </fieldset>
            <button className={styles.button}>Enviar</button>
        </form>
        <Link to="/">
            <button className={styles.button2}>Volver</button>
        </Link>
        </div>
        </div>
      )}
    </>
  )
};