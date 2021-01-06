import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { Box, CircularProgress } from "@material-ui/core";
import NewTodoItem from "./components/NewTodoItem";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "./redux/auth";
import {fetchTodos} from "./redux/todos";
import history from "./history";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  const dispatch = useDispatch();
  const {isAuth, user, loading, error, success} = useSelector(({auth}) => auth);

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch]);

  useEffect(() => {
    if(!!error && error.message) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if(user && success && success.message) toast.success(success.message);
  }, [success, user]);

  useEffect(() => {
    if(isAuth) dispatch(fetchTodos());
  }, [dispatch, isAuth]);

  if(loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        m={'auto'}
        minHeight="100vh"
        children={<CircularProgress size={200}/>}
      />
    );
  }

  return (
    <div className="App">
      <ToastContainer />
      <Router history={history}>
        {isAuth ? <Redirect to="/"/> : <Redirect to="/login"/>}

        <Header/>

        <Switch>
          <Route exact path="/">
            <NewTodoItem/>
            <Box>
              <TodoList/>
            </Box>
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
