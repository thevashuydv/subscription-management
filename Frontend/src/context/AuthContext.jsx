import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (credentials) => {
    // Default user credentials
    const defaultUser = {
      email: "user@example.com",
      password: "password123"
    };

    if (credentials.email === defaultUser.email && credentials.password === defaultUser.password) {
      setUser({
        name: "Default User",
        email: defaultUser.email,
        avatar: "https://ui-avatars.com/api/?name=Default+User"
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 