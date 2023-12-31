import React, { useContext, useState } from "react";
import GPT from "./gptRoutes.js";
import "../../../App.css";
interface Message {
  role: string;
  content: string;
}

const GPTSender: React.FC<{
  chatID: number;
  dmList: Message[];
  setDmList: React.Dispatch<React.SetStateAction<Message[]>>;
  currentUsername: string;
}> = ({ chatID, dmList, setDmList, currentUsername }) => {
  const [messageContent, setMessageContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (dmList.length === 0) {
      setDmList([{ content: messageContent, role: "user" }]);
    } else {
      setDmList([...dmList, { content: messageContent, role: "user" }]);
    }
    setIsSending(true);

    GPT.postGpt(chatID, currentUsername, messageContent)
      .then((res) => {
        setMessageContent("");
        setIsSending(false);
        setDmList((dmList) => [...dmList, { content: res, role: "ai" }]);
      })
      .catch((err) => {
        console.error(err);
        setIsSending(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-100 flex justify-center items-center">
      <textarea
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        className="text-base-100-bold bg-secondary pl-5"
      />
      <button
        type="submit"
        className="bg-accent text-primary ml-2"
        disabled={isSending}>
        {isSending ? "Loading..." : "Send"}
      </button>
    </form>
  );
};

export default GPTSender;
