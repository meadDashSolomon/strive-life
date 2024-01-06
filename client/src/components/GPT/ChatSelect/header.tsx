import GptDropDownMenu from "./GptDropdown";

const ChatSelectHeader = ({ setAiChatId, currentUsername }) => {
  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <a className="text-lg font-bold">AI Fitness Guru</a>
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <GptDropDownMenu
            title="GPT"
            setAiChatId={setAiChatId}
            currentUsername={currentUsername}></GptDropDownMenu>
        </div>
      </div>
    </div>
  );
};

export default ChatSelectHeader;
