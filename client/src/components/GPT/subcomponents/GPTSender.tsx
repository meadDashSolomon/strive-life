import React, { useContext, useState } from "react";
import GPT from "./gptRoutes.js";
import "../../../App.css";

interface Message {
  role: string; // 'user' or 'ai'
  content: string;
}

interface GPTSenderProps {
  chatID: number;
  dmList: Message[];
  setDmList: React.Dispatch<React.SetStateAction<Message[]>>;
  currentUsername: string;
}

/**
 * GPTSender component for sending messages to the GPT chat API.
 * @param {GPTSenderProps} props - Includes chatID, message list and its setter, and the current user's username.
 */
const GPTSender: React.FC<GPTSenderProps> = ({
  chatID,
  dmList,
  setDmList,
  currentUsername,
}) => {
  const [messageContent, setMessageContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  /**
   * Handles the submission of the chat form.
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedDmList =
      dmList.length === 0
        ? [{ content: messageContent, role: "user" }]
        : [...dmList, { content: messageContent, role: "user" }];

    setIsSending(true);

    GPT.postGpt(chatID, currentUsername, messageContent)
      .then((res) => {
        setMessageContent("");
        setIsSending(false);
        setDmList([...updatedDmList, { content: res, role: "ai" }]);
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
        className="text-base-100-bold bg-neutral pl-5"
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
