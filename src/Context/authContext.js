import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

const { register, login, checkPermission } = require('api/auth');
const { createContext, useState, useEffect, useContext } = require('react');
const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = (children) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const pathname = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
      }

      const result = await checkPermission(authToken);
      if (result) {
        setIsAuthenticated(true);
        const temPayload = jwt.decode(authToken);
        setPayload(temPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };

    checkTokenIsValid();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
        register: async (data) => {
          const { success, authToken } = await register({
            username: data.username,
            email: data.email,
            password: data.password,
          });
          const temPayload = jwt.decode(authToken);
          if (temPayload) {
            setIsAuthenticated(true);
            setPayload(temPayload);
            localStorage.setItem('authToken', authToken);
          } else {
            setIsAuthenticated(false);
            setPayload(null);
          }
          return success;
        },
        login: async (data) => {
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          const temPayload = jwt.decode(authToken);
          if (temPayload) {
            setIsAuthenticated(true);
            setPayload(temPayload);
            localStorage.setItem('authToken', authToken);
          } else {
            setIsAuthenticated(false);
            setPayload(null);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
          setPayload(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
