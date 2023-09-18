import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    message = message.toLowerCase();
    if (message.includes("hola") || message.includes("hi")) {
      actions.handleHello();
    }
    if (message.includes("cómo estás?")) {
      actions.handleState();
    }
    if (message.includes("products")) {
      actions.handleProducts();
    }
    if (
      message.includes("faq") ||
      message.includes("questions") ||
      message.includes("contact")
    ) {
      actions.handleFaq();
    }
    if (message.includes("options") || message.includes("frequent questions")) {
      actions.handleOptions();
    }
    if (message.includes("team")) {
      actions.handleTeam();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
