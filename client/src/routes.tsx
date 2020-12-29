import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CreateProject from "./components/CreateProject";
import Projects from "./components/Projects";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/" render={() => <CreateProject />} />
        <Route path="/projects" render={() => <Projects />} />
        <Route render={() => <Redirect to="/" exact />} />
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
