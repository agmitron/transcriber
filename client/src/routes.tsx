import React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import CreateProject from "./components/CreateProject";
import Profile from "./components/Profile";
import Project from "./components/Project";
import Projects from "./components/Projects";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

interface IProjectRouteParams {
  id: string;
}

interface IProjectRouteProps extends RouteComponentProps<IProjectRouteParams> {}

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/" render={() => <CreateProject />} />
        <Route path="/projects" exact render={() => <Projects />} />
        <Route path="/profile" render={() => <Profile />} />
        <Route
          path="/projects/:id"
          render={({ match }: IProjectRouteProps) => (
            <Project id={match.params.id} />
          )}
        />
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
