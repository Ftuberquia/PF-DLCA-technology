import { createChatBotMessage } from "react-chatbot-kit";
import ButtonContact from "./widgets/Buttons/ButtonContact";
import ButtonToFaq from "./widgets/Buttons/ButtonToFaq";
import ButtonToProducts from "./widgets/Buttons/ButtonToProducts";
import ButtonToTeam from "./widgets/Buttons/ButtonToTeam";
import Questions from "./widgets/Options/Questions";

const config = {
  initialMessages: [
    createChatBotMessage(
      `¿Hola, como puedo ayudarte? A continuación se muestran algunas opciones posibles..`,
      {
        widget: "questions",
      }
    ),
  ],
  widgets: [
    {
      widgetName: "questions",
      widgetFunc: (props) => <Questions {...props} />,
    },
    {
      widgetName: "products",
      widgetFunc: (props) => <ButtonToProducts {...props} />,
    },
    {
      widgetName: "faq",
      widgetFunc: (props) => <ButtonToFaq {...props} />,
    },
    {
      widgetName: "contact",
      widgetFunc: (props) => <ButtonContact {...props} />,
    },
    {
      widgetName: "team",
      widgetFunc: (props) => <ButtonToTeam {...props} />,
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#212529",
    },
    chatButton: {
      backgroundColor: "#00ffff",
    },
  },
};

export default config;
