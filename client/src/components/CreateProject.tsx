import React, { useContext, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Container,
  createStyles,
  FormControl,
  InputLabel,
  ListSubheader,
  makeStyles,
  Menu,
  MenuItem,
  Select,
  Theme,
  withStyles,
} from "@material-ui/core";
import { languageList, engineList } from "../helpers";
import { useAuth } from "../hooks/useAuth";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import ProjectCard from "./Card";
import { useMessages } from "../context/MessagesContext";

const StyledButton = withStyles({
  root: {
    position: "relative",
  },
})(Button);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
  })
);

export default function CreateProject() {
  const [isLoading, setLoading] = useState(false);
  const [transcriberResult, setTranscriberResult] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);
  const [fileData, setFileData] = useState<string>("");
  const { token } = useContext(AuthContext);
  const classes = useStyles();
  const { checkIsJWTExpired } = useAuth();

  useEffect(() => {
    checkIsJWTExpired();
  }, [checkIsJWTExpired]);

  const { pushMessage } = useMessages();

  const sendToTranscibe = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      checkIsJWTExpired();
      const body = new FormData(e.currentTarget);

      setIsSent(true);
      setLoading(true);
      const response = await fetch("/api/projects/", {
        method: "POST",
        body,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const { result, message } = await response.json();
      
      if (!response.ok) {
        throw new Error(message);
      }

      setTranscriberResult(result);
      setLoading(false);
    } catch (e) {
      pushMessage({ type: "error", text: e.message });
      console.error(e);
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;

    if (!file) {
      return;
    }

    const sizeMiB = (file.size / 1024 / 1024).toFixed(2);

    setFileData(`Название файла: ${file.name}. Размер файла: ${sizeMiB} МБ.`);
  };

  return (
    <Container className="mt-50">
      <Typography variant="h4" gutterBottom>
        Создать проект
      </Typography>
      <form onSubmit={sendToTranscibe}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField required label="Название" fullWidth name="title" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Описание"
              fullWidth
              multiline
              variant="outlined"
              name="description"
            />
          </Grid>
          <Grid container item xs={12} justify="space-between">
            <label>
              <StyledButton variant="outlined" color="secondary">
                Загрузить файл
                <input
                  type="file"
                  className="file-input"
                  name="file"
                  onChange={uploadFileHandler}
                />
              </StyledButton>
              {fileData && <p>{fileData}</p>}
            </label>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="grouped-select">
                Выберите движок и язык
              </InputLabel>
              <Select
                defaultValue=""
                id="grouped-select"
                name="engine_and_lang"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <ListSubheader>wit.ai</ListSubheader>
                <MenuItem value="wit_en">English</MenuItem>
                <MenuItem value="wit_ru">Русский</MenuItem>
                <ListSubheader>Yandex</ListSubheader>
                <MenuItem value="yandex_ru">Русский</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Создать проект
            </Button>
          </Grid>
        </Grid>
      </form>

      {isSent && (
        <ProjectCard
          isLoading={isLoading}
          text={transcriberResult}
          title="Project"
        />
      )}
    </Container>
  );
}
