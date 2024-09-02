import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import validationSchema from "./validationSchema";
import styles from './index.module.scss';
import React from "react";
import { ILogin } from "./Login";

type Props = {
  onLogin: (login:ILogin) => void,
}

const Login:React.FC<Props> = ({onLogin}) => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<ILogin>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Container
      className={styles.login}
      maxWidth="xs"
      sx={{ marginTop: 5 }}>
      <Paper
        sx={{padding: 3}}>
        <form onSubmit={handleSubmit(onLogin)}>
          <Grid
            container
            direction="column"
            rowSpacing={3}>
            <Grid item>
              <TextField
                autoFocus
                fullWidth
                variant="standard"
                label='Benutzername'
                {...register('user')} />
                { errors.user && <div className="error">{errors.user.message}</div>}
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                variant="standard"
                label='Password'
                {...register('password')}/>
                { errors.password && <div className="error">{errors.password.message}</div>}
            </Grid>
            <Grid item>
              <div className={styles.actions}>
                <Button type="submit">Login</Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
