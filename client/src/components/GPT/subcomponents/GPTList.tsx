import React from "react";
import "../../../App.css";

interface Message {
  role: string; // 'user' or 'ai'
  content: string;
}

interface GPTListProps {
  messages: Message[];
}

/**
 * GPTList component displays a list of chat messages.
 * @param {GPTListProps} props - Component props include an array of messages.
 */
const GPTList: React.FC<GPTListProps> = ({ messages }) => {
  // Display a loading message if messages are not yet loaded
  if (!messages) {
    return (
      <div className="flex-grow flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="chat bg-base-100 text-secondary flex flex-col gap-1 mb-2 border-2 border-secondary overflow-auto h-[calc(100%-50px)]">
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              msg.role === "user"
                ? "self-end bg-accent text-neutral"
                : "self-start bg-tertiary text-secondary"
            } w-auto break-words m-2 p-2 rounded-lg shadow`}>
            <p className="whitespace-normal break-words">{msg.content}</p>
            <div className="chat-metadata mt-1 text-xs opacity-70">
              <p>{msg.role === "user" ? "You" : "AI"}</p>
            </div>
          </div>
        ))
      ) : (
        // Display a message if there are no messages yet
        <div className="h-full flex justify-center items-center">
          No messages yet.
        </div>
      )}
    </div>
  );
};

export default GPTList;
