import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ProjectCard from "./Card";

interface IProjectsProps {}

interface IProject {
  text: string;
  title: string;
  // TODO: url link
}

const Projects: React.FC<IProjectsProps> = (props) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const { token } = useAuth();
  useEffect(() => {
    fetch("/api/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ projects }) => {
        console.log({ projects });
        setProjects((projects as IProject[]).reverse());
      });
  }, [token]);

  return (
    <Container>
      {projects.length &&
        projects.map((p) => <ProjectCard text={p.text} title={p.title} />)}
    </Container>
  );
};

export default Projects;
