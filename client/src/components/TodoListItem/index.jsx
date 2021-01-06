import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {deleteTodo, updateTodo} from "../../redux/todos";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";

const useStyles = makeStyles((theme) => ({
  completed: {
    textDecoration: 'line-through',
    backgroundColor: '#dbdbdb',
    opacity: 0.5,
  },

  body: {
    marginRight: 55,
    wordBreak: 'break-all',
  },
  editable: {
    border: '1px solid #ccc',
    padding: '1em'
  }

}));

const schema = yup.object().shape({
  todo: yup.string().required().min(3).max(300).trim(),
});

const TodoListItem = ({labelId, item: {body, id, completed}}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [checked, setChecked] = useState(completed);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(body);
  const { control, errors } = useForm({
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    mode: 'onBlur',
  });

  const editTodo = content => {
    if(!errors.todo) {
      setEdit(!edit);
      setContent(content);
    }
  };

  useEffect(() => {
      /*eslint-disable-next-line no-mixed-operators*/
      if(completed !== checked || !edit && body !== content) dispatch(updateTodo({id, data: {body: content, completed: checked}}));

    }, [dispatch, content, checked, edit, completed, body, id]);

  return (
    <ListItem className={ checked ? classes.completed : null } dense >
        <ListItemIcon>
          <Checkbox
            onChange={()=> setChecked(!checked)}
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            disabled={edit}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>

        <ListItemText
          disableTypography={true}
          id={labelId}
          className={classes.body}
          primary={edit && !checked ?
            <Controller
              error={!!errors.todo}
              as={TextField}
              name="todo"
              control={control}
              defaultValue={content}
              variant="outlined"
              type="text"
              fullWidth={true}
              autoFocus={true}
              helperText={!!errors.todo && errors.todo.message}
              onInput={e => setContent(e.target.value)}
            /> : content}
        />

        <ListItemSecondaryAction>
          {!checked && <IconButton children={<EditIcon style={{pointerEvents: 'none'}}/>} onClick={() => editTodo(content)}/> }

          <IconButton onClick={() => dispatch(deleteTodo(id))} children={<DeleteIcon />} />

        </ListItemSecondaryAction>

      </ListItem>
  )
};

export default TodoListItem
