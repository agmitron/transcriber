import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import AuthContext from "./context/AuthContext";
import { useRoutes } from "./routes";
import MenuAppBar from "./components/AppBar";
import Snackbar from "./components/Snackbar";
import MessagesContextProvider from "./context/MessagesContext";

function App() {
  const { token, login, logout, userID, checkIsJWTExpired } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  useEffect(() => {
    checkIsJWTExpired();
  }, [checkIsJWTExpired]);

  return (
    <MessagesContextProvider>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userID,
          isAuthenticated,
          checkIsJWTExpired,
        }}
      >
        <Router>
          {isAuthenticated && <MenuAppBar />}
          {routes}
          <Snackbar />
        </Router>
      </AuthContext.Provider>
    </MessagesContextProvider>
  );
}

export default App;
