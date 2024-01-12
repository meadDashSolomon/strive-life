import React from "react";
import axios from "axios";
import "../../../App.css";

interface Message {
  id: number;
  sender_username: string;
  recipient_username: string;
  chat: string;
  created_at: string;
}

interface DirectMessageSenderProps {
  currentUsername: string;
  friendUsername: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messageContent: string;
  setMessageContent: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * DirectMessageSender allows the user to send messages in a chat conversation.
 * @param {DirectMessageSenderProps} props - Properties include the current and friend's username, message state setters, and message content.
 */
const DirectMessageSender: React.FC<DirectMessageSenderProps> = ({
  currentUsername,
  friendUsername,
  setMessages,
  messageContent,
  setMessageContent,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (messageContent.trim()) {
      sendMessage(
        currentUsername,
        friendUsername,
        messageContent,
        setMessages,
        setMessageContent
      );
    }
  };

  const sendMessage = (
    currentUsername: string,
    friendUsername: string,
    messageContent: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setMessageContent: React.Dispatch<React.SetStateAction<string>>
  ) => {
    axios
      .post(
        "http://localhost:8080/social",
        {
          sender_username: currentUsername,
          recipient_username: friendUsername,
          chat: messageContent,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setMessageContent("");
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: response.data.id,
            sender_username: currentUsername,
            recipient_username: friendUsername,
            chat: messageContent,
            created_at: new Date().toISOString(),
          },
        ]);
      })
      .catch((err) => {
        console.error(err);
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
        className="bg-accent text-neutral ml-2">
        Send
      </button>
    </form>
  );
};

export default DirectMessageSender;
