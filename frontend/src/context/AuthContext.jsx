import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

// Shares the logged-in user with every component (no prop drilling)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while we verify a saved token

  // On first load: if a token is saved, ask the backend who it belongs to
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem('token')) // token expired or invalid
      .finally(() => setLoading(false));
  }, []);

  const saveSession = (data) => {
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    saveSession(res.data);
  };

  const signup = async (name, email, password) => {
    const res = await api.post('/auth/signup', { name, email, password });
    saveSession(res.data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook so components can write: const { user } = useAuth();
export const useAuth = () => useContext(AuthContext);
