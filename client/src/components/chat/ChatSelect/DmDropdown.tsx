import React from "react";

interface ChatDropdownMenuProps {
  title: string;
  data: Array<{ id: string; username: string; profile_pic?: string }>;
  onChatSelect: (username: string) => void;
}

/**
 * ChatDropdownMenu component to display a dropdown list of users.
 * @param {ChatDropdownMenuProps} props - Component props.
 * - title: Title for the dropdown menu.
 * - data: Array of user objects to be displayed in the dropdown.
 * - onChatSelect: Function to handle the selection of a chat user.
 */
const ChatDropdownMenu: React.FC<ChatDropdownMenuProps> = ({
  title,
  data,
  onChatSelect,
}) => {
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
                src={user.profile_pic || "/assets/bowser.jpeg"}
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
