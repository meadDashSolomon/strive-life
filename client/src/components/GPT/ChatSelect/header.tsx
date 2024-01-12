import React from "react";
import GptDropDownMenu from "./GptDropdown";

interface ChatSelectHeaderProps {
  setAiChatId: React.Dispatch<React.SetStateAction<number | null>>;
  currentUsername: string;
}

/**
 * ChatSelectHeader displays a header bar with a dropdown menu for AI chat sessions.
 * @param {ChatSelectHeaderProps} props - Properties include setAiChatId function and the current user's username.
 */
const ChatSelectHeader: React.FC<ChatSelectHeaderProps> = ({
  setAiChatId,
  currentUsername,
}) => {
  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <span className="text-lg font-bold">AI Fitness Guru</span>
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <GptDropDownMenu
            title="GPT"
            setAiChatId={setAiChatId}
            currentUsername={currentUsername}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatSelectHeader;
