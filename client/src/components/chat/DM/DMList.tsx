import React from "react";

interface Message {
  id: number;
  sender_username: string;
  recipient_username: string;
  chat: string;
  created_at: string;
}

interface DirectMessageListProps {
  currentUsername: string;
  messages?: Message[];
}

/**
 * DirectMessageList displays a list of messages in a chat conversation.
 * @param {DirectMessageListProps} props - Properties include the current user's username and an optional array of messages.
 */
const DirectMessageList: React.FC<DirectMessageListProps> = ({
  currentUsername,
  messages,
}) => {
  if (!messages || messages.length === 0) {
    return <div className="chat-empty">No messages yet.</div>;
  }

  return (
    <div className="chat bg-base-100 text-secondary flex flex-col justify-end gap-1 mb-2 border-2 border-secondary h-96 px-1">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat-bubble ${
            msg.sender_username === currentUsername
              ? "self-end bg-accent text-neutral"
              : "self-start bg-neutral text-secondary"
          }`}>
          <p>{msg.chat}</p>
          <div className="chat-metadata">
            <p className="text-xs font-thin">
              {msg.sender_username === currentUsername ? "You" : "Other"}
            </p>
            <p className="text-xs font-thin">
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DirectMessageList;
