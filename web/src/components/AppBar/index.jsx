import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: 9999,
  },
}));

export default function index({ routes }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar variant="regular">
          {routes.map(route => (
            <Button color="inherit" component={Link} to={route.path}>
              {route.name}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
}
