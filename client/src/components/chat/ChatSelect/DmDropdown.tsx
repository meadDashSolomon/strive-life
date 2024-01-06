const ChatDropdownMenu = ({ title, data, onChatSelect }) => {
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost rounded-btn">
        {title}
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] p-2 shadow bg-primary rounded-box w-60 mt-4">
        {data.map((user) => (
          <li
            key={user.id}
            onClick={() => onChatSelect(user.username)}>
            <a className="flex items-center space-x-2">
              <img
                src={user.profilePicUrl || "/assets/bowser.png"}
                alt={user.username}
                className="w-8 h-8 rounded-full"
              />
              <span>{user.username}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatDropdownMenu;
