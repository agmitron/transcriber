import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import AuthContext from "./context/AuthContext";
import { useRoutes } from "./routes";
import MenuAppBar from './components/AppBar';

function App() {
  const { token, login, logout, userID } = useAuth();

  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <>
      <AuthContext.Provider
        value={{ token, login, logout, userID, isAuthenticated }}
      >
        {isAuthenticated && <MenuAppBar />}
        <Router>{routes}</Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
