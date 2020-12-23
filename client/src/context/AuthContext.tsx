import React, { createContext } from "react";

const AuthContext = createContext({
  token: "",
  userID: "",
  login: (jwtToken: string, id: string) => {},
  logout: () => {},
  isAuthenticated: false,
});

export default AuthContext;
