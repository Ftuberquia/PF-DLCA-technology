import Options from "./Options";

const Questions = (props) => {
  const options = [
    {
      name: "¿Cuál es la garantía que ofrecen para sus productos?",
      handler: props.actionProvider.handleProducts,
      id: 1,
    },
    {
      name: "¿Cómo puedo estar seguro de que estoy comprando productos genuinos y de calidad?",
      handler: props.actionProvider.handleQuestions,
      id: 2,
    },
    {
      name: "¿Ofrecen opciones de financiamiento o planes de pago a plazos?",
      handler: props.actionProvider.handleContact,
      id: 3,
    },
    {
      name: "¿Cómo funciona el proceso de envío y entrega de productos?",
      handler: props.actionProvider.handleProducts,
      id: 4,
    },
  ];
  return <Options options={options} title="Frequent Questions" {...props} />;
};

export default Questions;
