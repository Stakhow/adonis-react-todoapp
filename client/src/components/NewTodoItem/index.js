import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {useDispatch, useSelector} from "react-redux";
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers";
import {ErrorMessage} from "@hookform/error-message";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import {FormGroup, FormControl, IconButton, Box, Container, Typography, TextField, Paper} from "@material-ui/core";
import {toast} from "react-toastify";
import {createTodo} from '../../redux/todos';

const useStyles = makeStyles((theme) => ({
  createTodoField: {
    flex: "1 1 auto",
  }
}));

const schema = yup.object().shape({
  todo: yup.string().required().min(3).max(300).trim(),
});

const NewTodoItem = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });
  const {error} = useSelector( ({todos}) => todos);

  const errMessage = message => <Box display="flex" my={1}><ErrorOutlineIcon color="error"/>&nbsp;<Typography color="error">{message}</Typography></Box>

  useEffect(() => {
    if(!!error && error.message) toast.error(error.message);
  }, [error]);
  // Todo - click if out
  // useEffect(() => {
  //   if(user && success && success.message) toast.success(success.message);
  // }, [success, user]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        <Box my={1} p={2}>
          <Box mb={1} children={<Typography variant="h5" children="New Todo"/>}/>
          <form onReset={() => reset('')} onSubmit={handleSubmit(data => {
            dispatch(createTodo(data));
            reset({todo: ''});
          })}>
            <FormGroup row={true}>
              <Controller
                as={TextField}
                name="todo"
                control={control}
                defaultValue=""
                variant="outlined"
                className={classes.createTodoField}
                type="text"
                label="Todo"
              />
              <FormControl>
                <IconButton type="submit" children={<AddCircleOutlineIcon fontSize="large" />}/>
              </FormControl>
            </FormGroup>

            <ErrorMessage
              errors={errors}
              name="todo"
              render={({ message }) => errMessage(message)}
            />
          </form>
        </Box>
    </Paper>
    </Container>
  );
};

export default NewTodoItem
