import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CreateProject from "./components/CreateProject";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/">
          <CreateProject />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/register">
        <SignUp />
      </Route>
      <Route path="/login">
        <SignIn />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
};
