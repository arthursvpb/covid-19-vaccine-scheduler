import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import { Link } from 'react-router-dom';
import useStyles from './style';

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
