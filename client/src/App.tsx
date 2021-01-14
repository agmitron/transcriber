import React, {  useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import AuthContext from "./context/AuthContext";
import { useRoutes } from "./routes";
import MenuAppBar from "./components/AppBar";
import { useMessage } from "./reducers/messagesReducer";
import Snackbar from "./components/Snackbar";
import MessagesContext from './context/MessagesContext';

function App() {
  const { token, login, logout, userID, checkIsJWTExpired } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  const { currentMessage, pushMessage } = useMessage();

  useEffect(() => {
    checkIsJWTExpired();
  }, [checkIsJWTExpired]);

  return (
    <>
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
        <MessagesContext.Provider value={{ pushMessage, currentMessage }}>
          <Router>
            {isAuthenticated && <MenuAppBar />}
            {routes}
            {currentMessage && (
              <Snackbar
                message={currentMessage.text}
                type={currentMessage.type}
              />
            )}
          </Router>
        </MessagesContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
