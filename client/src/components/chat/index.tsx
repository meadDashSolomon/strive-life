import React from "react";
import ChatSelectHeader from "./ChatSelect/header";
import Chat from "./DM/Chat";

interface DMProps {
  currentUsername: string;
}

/**
 * DMs component rendering the chat selection header and the chat window.
 * @param {DMProps} props - Component props including the current user's username.
 */
const DMs: React.FC<DMProps> = ({ currentUsername }) => {
  return (
    <div className="flex flex-col gap-1">
      {/* Chat selection header */}
      <ChatSelectHeader />

      {/* Chat window for direct messaging */}
      <Chat currentUsername={currentUsername} />
    </div>
  );
};

export default DMs;
