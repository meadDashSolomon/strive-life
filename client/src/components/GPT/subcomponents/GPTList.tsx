import React from "react";
import "../../../App.css";

interface Message {
  role: string;
  content: string;
}

const GPTList: React.FC<{
  messages: Message[];
}> = ({ messages }) => {
  if (!messages) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chat bg-base-100 text-secondary flex flex-col gap-1 mb-2 border-2 border-secondary overflow-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-bubble ${
            msg.role === "user"
              ? "self-end bg-accent text-primary"
              : "self-start bg-tertiary text-primary"
          } w-auto break-words m-2 p-2 rounded-lg shadow`}>
          <p className="whitespace-normal break-words">{msg.content}</p>
          <div className="chat-metadata mt-1 text-xs opacity-70">
            <p>{msg.role === "user" ? "You" : "AI"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GPTList;
