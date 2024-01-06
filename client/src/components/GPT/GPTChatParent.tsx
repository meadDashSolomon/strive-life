import { useState, useEffect } from "react";
import "../../App.css";
import GPTList from "./subcomponents/GPTList";
import GPTSender from "./subcomponents/GPTSender";
import GPT from "./subcomponents/gptRoutes";

interface dmList {
  id: number;
  ai_chat_id: number;
  is_ai: number;
  message: string;
  created_at: string;
}

const GPTChat: React.FC<{
  dmList: dmList[];
  currentUsername: string;
  chatID: number;
}> = ({ currentUsername, chatID }) => {
  const [dmList, setDmList] = useState([]);

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
    <div className="flex-row">
      <GPTList
        messages={dmList}
        setDmList={setDmList}
      />
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
