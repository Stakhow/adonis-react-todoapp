import React from 'react';
import {Box, Container, List, Typography, Paper, CircularProgress} from '@material-ui/core';
import TodoListItem from "../TodoListItem";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import {useSelector} from "react-redux";
import './style.sass';

const TodoList = () => {
  const {todosList, loading} = useSelector(({todos}) => todos);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}>
        { loading ?
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={4}
            children={<CircularProgress size={50}/>}
          />
          :
          todosList.length ?
            <List>
              <TransitionGroup className="todo-list">
                { todosList.map(item => <CSSTransition key={item.id} timeout={500} classNames="item"><TodoListItem item={item} labelId={`checkbox-list-label-${item.id}`}/></CSSTransition>)}
              </TransitionGroup>
            </List>


          :
          <Box p={3} children={<Typography variant={"h2"} align="center" color="textSecondary" children={"...EMPTY"} />} />
        }
      </Paper>
    </Container>
  );
};

export default TodoList
