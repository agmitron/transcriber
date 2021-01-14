import { Container } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useMessages } from '../context/MessagesContext';
import ProjectCard from "./Card";
import { IProject } from "./Project";

interface IProjectsProps {}

const Projects: React.FC<IProjectsProps> = (props) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const { token, checkIsJWTExpired } = useContext(AuthContext);
  const { pushMessage } = useMessages();

  useEffect(() => {
    checkIsJWTExpired();
  }, [checkIsJWTExpired]);

  useEffect(() => {
    fetch("/api/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ projects, message }) => {
        setProjects((projects as IProject[]).reverse());

        if (pushMessage) {
          pushMessage({ type: "success", text: message });
        }
      })
      .catch(({ message }) =>
        pushMessage ? pushMessage({ type: "error", text: message }) : null
      );
  }, [token]);

  return (
    <Container>
      {projects.length &&
        projects.map((p) => (
          <Link to={`projects/${p._id}`}>
            <ProjectCard text={p.text} title={p.title} />
          </Link>
        ))}
    </Container>
  );
};

export default Projects;
