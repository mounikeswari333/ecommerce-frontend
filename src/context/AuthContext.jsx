import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("nc_user");
    const storedToken = localStorage.getItem("nc_token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setIsReady(true);
  }, []);

  const handleAuth = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("nc_user", JSON.stringify(data.user));
    localStorage.setItem("nc_token", data.token);
  };

  const login = async (formData) => {
    const data = await loginUser(formData);
    handleAuth(data);
  };

  const register = async (formData) => {
    const data = await registerUser(formData);
    handleAuth(data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("nc_user");
    localStorage.removeItem("nc_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isReady, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
