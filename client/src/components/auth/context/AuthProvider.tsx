import { createContext, useEffect, useState } from "react";
import Cookie from "../Cookie";
import axios from "axios";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Initialize state from localStorage if available
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : {};
  });

  useEffect(() => {
    // Persist auth state to localStorage on change
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    // Read the new cookies
    const accessToken = Cookie.getCookie("accessToken");
    const refreshToken = Cookie.getCookie("refreshToken");

    if (accessToken && refreshToken) {
      axios
        .post(
          "http://localhost:8080/auth/verify", // This endpoint should verify the tokens
          JSON.stringify({ accessToken, refreshToken }),
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((resp) => {
          const { username, accessToken: newAccessToken, id } = resp?.data;

          setAuth({ username, accessToken: newAccessToken, id });
        })
        .catch((err) => {
          console.log("Error during authentication:", err);
        });
    }
  }, []);

  const logout = () => {
    // Clear auth state
    setAuth({});

    // Clear localStorage and cookies
    localStorage.removeItem("auth");
    Cookie.deleteCookie("accessToken");
    Cookie.deleteCookie("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
