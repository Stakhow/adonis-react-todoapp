import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useLocation } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {logout} from "../../redux/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }

}));

function Header() {
  const classes = useStyles();
  const {isAuth} = useSelector(({auth}) => auth);
  const dispatch = useDispatch();
  const {pathname} = useLocation();

  const LoginButton = () => (
    pathname !== '/login' ?
    <Button
      color="inherit"
      variant="outlined"
      component={Link}
      to={'/login'}
    >
      Login
    </Button> : null
  );
  const RegisterButton = () => (
    pathname !== '/register' ?
    <Button
      color="inherit"
      variant="outlined"
      component={Link}
      to={'/register'}
    >
      Register
    </Button> : null
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Simple Todo App
          </Typography>


          { isAuth ?
            (<>
              <div className={classes.search}>

                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>

                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>

              <Box ml={'auto'}>
                <Button
                  onClick={() => dispatch(logout())}
                  color="inherit"
                  variant="outlined">
                  Logout
                </Button>
              </Box>

            </>)
            :
            <Box ml={'auto'}>
              <LoginButton/>
              <RegisterButton/>
            </Box>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Header
