import React, { useContext, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button, Container } from "@material-ui/core";
import AuthContext from "../context/AuthContext";

interface IProfileProps {}

const Profile: React.FC<IProfileProps> = (props) => {
  const [formState, setFormState] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const { token } = useContext(AuthContext);

  const editProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify(formState),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { message } = await response.json();
        console.log({ message });
      }
    } catch (e) {}
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev: typeof formState) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(formState);
  };

  return (
    <Container style={{ marginTop: 50 }}>
      <Typography variant="h4" gutterBottom>
        Редактирование профиля
      </Typography>
      <form onSubmit={editProfile}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              name="full_name"
              label="Полное имя"
              fullWidth
              onChange={inputHandler}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="email"
              label="E-mail"
              fullWidth
              onChange={inputHandler}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="password"
              label="Новый пароль"
              type="password"
              fullWidth
              onChange={inputHandler}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button color="primary" variant="contained" type="submit">
              Изменить
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Profile;
