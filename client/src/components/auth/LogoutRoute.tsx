import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutRoute = ({ logout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate("/");
    };

    performLogout();
  }, [logout]);

  return <div className="">Logging out, please wait . . . </div>;
};

export default LogoutRoute;
