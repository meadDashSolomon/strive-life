import { useParams } from "react-router-dom";
import "../../../App.css";
import DirectMessageList from "./DMList";
import DirectMessageSender from "./DMSender";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ChatProps {
  currentUsername: string;
}

const Chat: React.FC<ChatProps> = ({ currentUsername }) => {
  // state for posting messages
  const [messageContent, setMessageContent] = useState("");
  // state for holding list of messages
  const [messages, setMessages] = useState<string[]>([]);
  const { friendUsername } = useParams();

  const fetchMessages = () => {
    axios
      .get(
        `http://localhost:8080/social?currentUsername=${currentUsername}&friendUsername=${friendUsername}`,
        { withCredentials: true }
      )
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // fetch messages on new user name
  useEffect(() => {
    if (currentUsername && friendUsername) {
      fetchMessages();
    }
  }, [currentUsername, friendUsername]);

  if (!friendUsername) {
    return (
      <div className="">Select a user from the dropdown to start chatting.</div>
    );
  }

  return (
    <div className="flex-row">
      <DirectMessageList
        currentUsername={currentUsername}
        friendUsername={friendUsername}
        messages={messages}
      />
      <DirectMessageSender
        currentUsername={currentUsername}
        friendUsername={friendUsername}
        setMessages={setMessages}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
      />
    </div>
  );
};

export default Chat;
