import ChatSelectHeader from "./ChatSelect/header";
import Chat from "./DM/Chat";

interface DMProps {
  currentUsername: string;
}

const DMs: React.FC<DMProps> = ({ currentUsername }) => {
  return (
    <div className="flex flex-col gap-1">
      <ChatSelectHeader />
      <Chat currentUsername={currentUsername} />
    </div>
  );
};

export default DMs;
