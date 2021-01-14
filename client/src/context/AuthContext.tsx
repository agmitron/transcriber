import { createContext } from "react";

const AuthContext = createContext({
  token: "",
  userID: "",
  login: (jwtToken: string, id: string) => {},
  logout: () => {},
  isAuthenticated: false,
  checkIsJWTExpired: () => {},
});

export default AuthContext;
