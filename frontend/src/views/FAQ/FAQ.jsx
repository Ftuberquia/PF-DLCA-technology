import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './FAQ.module.css';

const FAQsData = [
  {
    pregunta: '¿Cuánto tiempo tardará en llegar mi pedido?',
    respuesta:'El tiempo de entrega varía según la ubicación y el producto seleccionado. Normalmente, nuestros envíos nacionales suelen demorar de 3 a 7 días hábiles, mientras que los envíos internacionales pueden tomar entre 7 y 20 días hábiles.',
  },
  {
    pregunta:'¿Cómo puedo hacer un seguimiento de mi pedido?',
    respuesta:'Una vez que tu pedido sea enviado, recibirás un correo electrónico con un enlace de seguimiento que te permitirá rastrear el paquete en tiempo real.'
  },
  {
    pregunta: '¿Cuáles son las opciones de pago disponibles?',
    respuesta:'Aceptamos tarjetas de crédito y débito (Visa, MasterCard, American Express), PayPal y transferencias bancarias como formas de pago seguras',
  },
  {
    pregunta:  '¿Cuál es la política de devoluciones y reembolsos?',
    respuesta: 'Si no estás satisfecho con tu compra, ofrecemos una política de devoluciones dentro de los 30 días posteriores a la recepción del pedido. Puedes solicitar un reembolso completo o un cambio por otro producto. Es importante que el producto esté en su estado original y sin usar.'
  },
  {
    pregunta:'¿Cuál es la política de privacidad de la compañía?',
    respuesta:'Respetamos tu privacidad y protegemos tus datos personales. Nuestra política de privacidad detalla cómo recopilamos, utilizamos y protegemos tu información. Puedes revisarla en la sección "Política de Privacidad" en nuestro sitio web.'
  },
  {
    pregunta:'¿Ofrecen descuentos para compras al por mayor?',
    respuesta:'Sí, ofrecemos descuentos para compras al por mayor. Si estás interesado en realizar una compra de grandes cantidades, comunícate con nuestro equipo de atención al cliente o envíanos un correo electrónico a dunluq@gmail.com para obtener más información sobre nuestros precios al mayor.'
  }
];

const FAQ = () => {
  const [showFullAnswer, setShowFullAnswer] = useState(-1);

  const toggleAnswer = (index) => {
    setShowFullAnswer((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div className={styles.faq}>
      <div className={styles.questionsContainer}>
        {FAQsData.map((item, index) => (
          <div
            key={index}
            className={`${styles.question} ${
              showFullAnswer === index ? styles.expanded : ""
            }`}
            onClick={() => toggleAnswer(index)}
          >
            <p>
              <strong>{item.pregunta}</strong>
            </p>
            <div className={styles.answer}>{item.respuesta}</div>
          </div>
        ))}
      </div>
      
      <div className={styles.imageContainer}>
        <img src="https://i.ibb.co/2h9QvfM/faqsection-jpg.jpg" alt="" />
      </div>
      <div className={styles.contactContainerWrapper}>
        <div className={styles.contactContainer}>
        <p>¿Aún tienes dudas sin resolver?</p>
        <p>¡Contáctanos!</p>
        <Link to={"/contacto"} >
        <button className={styles.button}>Submit</button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default FAQ;