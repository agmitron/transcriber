import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useMessages } from "../context/MessagesContext";

interface IProjectProps {
  id: string;
}

export interface IProject {
  _id: string;
  text: string;
  title: string;
}

const useStyles = makeStyles({
  verticalMargins: {
    marginTop: 20,
    marginBottom: 20,
  },
});

const Project: React.FC<IProjectProps> = (props) => {
  const classes = useStyles();
  const { token, checkIsJWTExpired } = useContext(AuthContext);
  const { pushMessage, currentMessage } = useMessages();

  const [projectState, setProjectState] = useState({
    title: "",
    text: "",
  });

  useEffect(() => {
    checkIsJWTExpired();
  }, [checkIsJWTExpired]);

  useEffect(() => {
    fetch(`/api/projects/${props.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ project, message }: { project: IProject; message: string }) => {
        setProjectState(project);
        if (pushMessage) {
          pushMessage({ text: message, type: "success" });
        }

        console.log({ currentMessage });
      })
      .catch((err) => {
        if (pushMessage) {
          pushMessage({ text: err.message, type: "error" });
        }
      });
  }, [token]);

  const editProject = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await fetch(`/api/projects/${props.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectState),
      });

      const result = await response.json();
      if (pushMessage) {
        pushMessage({ text: result.message, type: "success" });
      }
    } catch (e) {
      pushMessage({ text: e.message, type: "error" });
      return console.error(e)
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Container className={classes.verticalMargins}>
      <Typography variant="h4" gutterBottom>
        Проект
      </Typography>
      <form onSubmit={editProject}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              label="Название"
              fullWidth
              name="title"
              value={projectState.title}
              onChange={inputHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Описание"
              fullWidth
              multiline
              value={projectState.text}
              variant="outlined"
              name="text"
              onChange={inputHandler}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.verticalMargins}
          type="submit"
        >
          Сохранить
        </Button>
      </form>
    </Container>
  );
};

export default Project;
