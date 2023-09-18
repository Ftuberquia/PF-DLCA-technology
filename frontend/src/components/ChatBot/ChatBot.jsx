import React, { useState } from "react";
import style from "./ChatBot.module.css";
import img from "../../img/imgBot.png";

import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProvider";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { useSelector } from "react-redux";


const ChatBot = () => {
  const [showBot, setShowBot] = useState(false);
  const userState = useSelector(state => state.user);
  const currentUser = userState?.currentUser;
  const isAdmin = currentUser?.isAdmin;

  const saveMessages = (messages, HTMLString) => {
    console.log("guardar");
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };

  const handleShow = (e) => {
    setShowBot((prev) => !prev);
  };


  return (
    <div className={style.containerchatbot}>
      {showBot && (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          messageHistory={loadMessages()}
          saveMessages={saveMessages}
          />
        )}
      {!isAdmin ? (
        <button className={style.btnBot} onClick={handleShow}>
          <img
            className={style.img}
            src={img}
            alt="imgBot"
          />
        </button> ) : null
        }
    </div>
  );
};

export default ChatBot;