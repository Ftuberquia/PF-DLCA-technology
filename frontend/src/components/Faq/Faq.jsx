import React, { useState, useEffect } from "react";
import styles from "./Faq.module.css";
import { useSelector } from "react-redux";

const Faq = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  // const darkMode = useSelector((state) => state.darkMode);

  // useEffect(() => {
  //   // Fetch the dark mode state from the Redux store.
  //   setDarkMode(darkMode);
  // }, []);

  const questionsAndAnswers = [
    {
      question: "¿Cuál es la garantía que ofrecen para sus productos?",
      answer:
        "En DLCA Technology, nos enorgullece ofrecer una garantía sólida en todos nuestros productos. Nuestra garantía cubre defectos de fábrica y mal funcionamiento. Si tienes algún problema, estaremos aquí para respaldarte y proporcionarte la mejor solución posible.",
    },
    {
      question:
        "¿Cómo puedo estar seguro de que estoy comprando productos genuinos y de calidad?",
      answer:
        "Comprendemos la importancia de la autenticidad y la calidad. En DLCA Technology, trabajamos directamente con fabricantes y distribuidores confiables. Todos nuestros productos son originales y pasan por rigurosos controles de calidad antes de llegar a tus manos, brindándote tranquilidad en cada compra.",
    },
    {
      question:
        "¿Ofrecen opciones de financiamiento o planes de pago a plazos?",
      answer:
        "¡Sí, lo hacemos! En DLCA Technology deseamos que tengas acceso sencillo a la tecnología, es por ello, que te ofrecemos opciones de financiamiento flexibles y planes de pago a plazos para adaptarnos a tus necesidades y presupuesto. Siempre nos esforzamos por hacer que tu experiencia de compra sea conveniente y accesible.",
    },
    {
      question: "¿Cómo funciona el proceso de envío y entrega de productos?",
      answer:
        "Nuestro proceso de envío es seguro y confiable. Trabajamos con servicios de mensajería de renombre para garantizar que tus productos lleguen de manera segura y puntual. Una vez que realices tu pedido, recibirás actualizaciones de seguimiento para que puedas estar al tanto de la ubicación de tu paquete. Tu satisfacción y comodidad son nuestras prioridades.",
    },
  ];

  return (
    <div className={styles.faq}>
      <div className={styles.imageContainer}>
        <img
          src="https://i.ibb.co/xFbXS4C/banner-faq.jpg"
          alt=""
        />
      </div>
      <div className={styles.questionsContainer}>
        {questionsAndAnswers.map((item, index) => (
          <div
            key={index}
            className={`${styles.question} ${
              expandedQuestion === index ? styles.expanded : ""
            }`}
            onClick={() => setExpandedQuestion(index)}
          >
            <p>
              <strong>{item.question}</strong>
            </p>
            <div className={styles.answer}>{item.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;