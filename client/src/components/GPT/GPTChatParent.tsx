import React, { useState, useEffect } from "react";
import "../../App.css";
import GPTList from "./subcomponents/GPTList";
import GPTSender from "./subcomponents/GPTSender";
import GPT from "./subcomponents/gptRoutes";

interface DMList {
  id: number;
  ai_chat_id: number;
  is_ai: number;
  message: string;
  created_at: string;
}

interface GPTChatProps {
  currentUsername: string;
  chatID: number;
}

/**
 * GPTChat component for displaying and sending messages in an AI chat.
 * @param {GPTChatProps} props - Component props including the current user's username and the chat ID for the AI conversation.
 */
const GPTChat: React.FC<GPTChatProps> = ({ currentUsername, chatID }) => {
  const [dmList, setDmList] = useState<DMList[]>([]);

  useEffect(() => {
    GPT.fetchGpt(chatID)
      .then((res) => {
        setDmList(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentUsername, chatID]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-hidden">
        <GPTList
          messages={dmList}
          setDmList={setDmList}
        />
      </div>
      <GPTSender
        chatID={chatID}
        dmList={dmList}
        setDmList={setDmList}
        currentUsername={currentUsername}
      />
    </div>
  );
};

export default GPTChat;
