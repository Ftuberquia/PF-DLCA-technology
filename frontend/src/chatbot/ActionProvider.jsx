import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hola. DLCA Technology.");

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const handleState = () => {
    const botMessage = createChatBotMessage(
      "Bien, gracias! nunca nadie se habia preocupado por mí :')"
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const handleOptions = () => {
    const botMessage = createChatBotMessage("Estas son algunas opciones.", {
      widget: "questions",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleProducts = () => {
    const botMessage = createChatBotMessage(
      "Para ver la garantía de nuestros productos puedes hacer clic en el botón de abajo.",
      { widget: "products" }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const handleFaq = () => {
    const botMessage = createChatBotMessage(
      "Tenemos políticas de privacidad en donde se protege la información que es proporcionada por nuestros al momento de utilizar nuestro sitio web, puedes verlo en la página principal. Puedo llevarte allí si haces clic en el botón de abajo.",
      { widget: "faq" }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const handleContact = () => {
    const botMessage = createChatBotMessage(
      "Puedes contactarnos por los siguientes medios.",
      { widget: "contact" }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  const handleTeam = () => {
    const botMessage = createChatBotMessage(
      "Para ver detalles del gran team de desarrolladores, puedes hacer clic en el siguiente botón.",
      { widget: "team" }
    );

    setState((state) => ({
      ...state,
      messages: [...state.messages, botMessage],
    }));
  };
  // Coloque la función handleHello en el objeto de acciones para pasarla al MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleState,
            handleOptions,
            handleProducts,
            handleFaq,
            handleContact,
            handleTeam,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
