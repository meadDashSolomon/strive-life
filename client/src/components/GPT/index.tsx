import React, { useState } from "react";
import ChatSelectHeader from "./ChatSelect/header";
import GPTChat from "./GPTChatParent";

interface GPTDMsProps {
  currentUsername: string;
}

/**
 * GPTDMs component for managing AI-based chat conversations.
 * @param {GPTDMsProps} props - Component props including the current user's username.
 */
const GPTDMs: React.FC<GPTDMsProps> = ({ currentUsername }) => {
  const [aichatid, setAiChatId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-1">
      <ChatSelectHeader
        setAiChatId={setAiChatId}
        currentUsername={currentUsername}
      />
      {aichatid !== null ? (
        <GPTChat
          currentUsername={currentUsername}
          chatID={aichatid}
        />
      ) : (
        <div className="text-center py-4">
          Click "Select Chat" to start a new conversation.
        </div>
      )}
    </div>
  );
};

export default GPTDMs;
