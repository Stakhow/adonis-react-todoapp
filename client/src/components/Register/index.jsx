import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, FormGroup, Box, Button, TextField } from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {register} from '../../redux/auth/';
import 'react-toastify/dist/ReactToastify.css';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import {ErrorMessage} from "@hookform/error-message";

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
  confirm_password: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const Register = () => {
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
        Register
      </Typography>
      <form onSubmit={handleSubmit(data => dispatch(register(data)))}>
        <FormGroup>
          <Controller
            as={TextField}
            name="email"
            control={control}
            defaultValue=""
            variant="outlined"
            className={classes.inputField}
            type="text"
            label="email"
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
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => errMessage(message)}
          />
        </FormGroup>

        <FormGroup>
          <Controller
            as={TextField}
            name="confirm_password"
            control={control}
            defaultValue=""
            variant="outlined"
            className={classes.inputField}
            type="password"
            label="confirm password"
          />
          <ErrorMessage
            errors={errors}
            name="confirm_password"
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

export default Register;
