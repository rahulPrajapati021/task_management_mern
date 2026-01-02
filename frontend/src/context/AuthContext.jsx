// need to create context with null value
// create authProvider that will provide context to child it will be a parent component
// create a hook useAuth to provide this useContext

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

async function initialize(setIsAuthenticated) {
    try {
        const token = localStorage.getItem("token");
        if(token) {
            setIsAuthenticated(true);
        }
    } catch (error) {
        console.log(error);
    }
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setIsLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            setToken(token);
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [])
    const login = (token) => {
        setIsAuthenticated(true);
        localStorage.setItem("token", token);
    }
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
    }
    const value = {
        isAuthenticated, 
        loading,
        user,
        token,
        login, 
        logout
    }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use useAuth hook only in AuthProvider context");
  }
  return context;
}
