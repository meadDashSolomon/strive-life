import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LogoutRouteProps {
  logout: () => Promise<void>;
}

const LogoutRoute: React.FC<LogoutRouteProps> = ({ logout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate("/");
    };

    performLogout();
  }, [logout, navigate]);

  return <div>Logging out, please wait . . . </div>;
};

export default LogoutRoute;
