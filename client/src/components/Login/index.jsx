import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, FormGroup, Button, TextField, Box } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {login} from '../../redux/auth/';
import 'react-toastify/dist/ReactToastify.css';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '10px auto',
    padding: 10,
    backgroundColor: theme.palette.background.paper,
  },
  inputField: {
    margin: '10px 0',
    flex: 1,
  },
  submitButton: {
    margin: '0 auto'
  },

}));

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5).max(30),
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { control, handleSubmit, errors } = useForm({
          resolver: yupResolver(schema),
          criteriaMode: 'all'
        });

  const errMessage = message => <Box display="flex" my={1}><ErrorOutlineIcon color="error"/>&nbsp;<Typography color="error">{message}</Typography></Box>


  return (
    <Container maxWidth={'sm'} className={classes.root}>
      <Typography variant="h1" component="h1">
        Login
      </Typography>
      <form onSubmit={handleSubmit(data => dispatch(login(data)) )}>
        <FormGroup>
          <Controller
            as={TextField}
            name="email"
            control={control}
            defaultValue=""
            variant="outlined"
            className={classes.inputField}
            type="email"
            label="email"
            autoComplete="email"
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => errMessage(message)}
          />
        </FormGroup>

        <FormGroup>
          <Controller
            as={TextField}
            name="password"
            control={control}
            defaultValue=""
            variant="outlined"
            className={classes.inputField}
            type="password"
            label="password"
            autoComplete="current-password"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => errMessage(message)}
          />
        </FormGroup>

        <Button
          color="primary"
          type="submit"
          variant="contained"
          children="Submit"
        />
      </form>

     </Container>
  );
};

export default Login;
