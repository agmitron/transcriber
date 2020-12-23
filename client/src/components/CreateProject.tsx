import React, { useState } from "react";
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
  const { token } = useAuth();
  const [selectedLangAndEngine, setLangAndEngine] = useState<string>("");

  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setLangAndEngine(e.target.value as string);;
  };

  const sendToTranscibe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new FormData(e.currentTarget);

    const response = await fetch("/api/projects/", {
      method: "POST",
      body,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    console.log({ result });
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
                <input type="file" className="file-input" name="file" />
              </StyledButton>
            </label>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="grouped-select">
                Выберите движок и язык
              </InputLabel>
              <Select defaultValue="" id="grouped-select" name="engine_and_lang">
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
    </Container>
  );
}
