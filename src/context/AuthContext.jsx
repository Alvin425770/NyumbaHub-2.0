import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email, role: "tenant" | "landlord" }

  const login = (email, password) => {
    // MOCK — replace with real API once backend is ready
    const mockUser = {
      id: "u1",
      name: "Test User",
      email,
      role: email.includes("landlord") ? "landlord" : "tenant",
    };
    setUser(mockUser);
    return mockUser;
  };

  const register = (name, email, password, role) => {
    const newUser = { id: Date.now().toString(), name, email, role };
    setUser(newUser);
    return newUser;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);