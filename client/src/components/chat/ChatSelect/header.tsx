import React, { useEffect, useState } from "react";
import ChatDropdownMenu from "./DmDropdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatSelectHeader = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleChatSelect = (username) => {
    setSelectedUsername(username);
    navigate(`/dm/${username}`);
  };

  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <span className="text-lg font-bold">Chat</span>
        {selectedUsername && (
          <span className="mx-2">with {selectedUsername}</span>
        )}
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <ChatDropdownMenu
            title="Friends"
            data={users}
            onChatSelect={handleChatSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatSelectHeader;
