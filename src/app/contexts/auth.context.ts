import { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  setAuthenticated: (isAuthenticated: boolean) => {
    return;
  },
});

export default AuthContext;
