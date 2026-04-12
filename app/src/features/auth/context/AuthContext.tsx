import { createContext, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
  token : string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    if(savedToken){
      // Validar token
      setToken(savedToken);
    }
  }, [])
  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('auth_token', newToken);
  }

  const logout = () => {
    setToken(null);
    localStorage.removeItem('auth_token');
  }

  return (
    <AuthContext.Provider value={{
      token,
      isAuthenticated: !!token, // Es true si el token existe
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};





