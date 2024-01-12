import { useParams } from "react-router-dom";
import "../../../App.css";
import DirectMessageList from "./DMList";
import DirectMessageSender from "./DMSender";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ChatProps {
  currentUsername: string;
}

/**
 * Chat component for displaying and managing chat messages between users.
 * @param {ChatProps} props - Component props including the current user's username.
 */
const Chat: React.FC<ChatProps> = ({ currentUsername }) => {
  // State for the content of the new message
  const [messageContent, setMessageContent] = useState("");

  // State for holding the list of chat messages
  const [messages, setMessages] = useState<string[]>([]);

  // Extract friend's username from URL parameters
  const { friendUsername } = useParams();

  /**
   * Fetches chat messages between the current user and the selected friend.
   */
  const fetchMessages = () => {
    axios
      .get(
        `http://localhost:8080/social?currentUsername=${currentUsername}&friendUsername=${friendUsername}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Effect to fetch messages whenever the current or friend's username changes
  useEffect(() => {
    if (currentUsername && friendUsername) {
      fetchMessages();
    }
  }, [currentUsername, friendUsername]);

  // Display a message if no friend is selected
  if (!friendUsername) {
    return <div>Select a user from the dropdown to start chatting.</div>;
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
