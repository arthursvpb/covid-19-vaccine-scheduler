import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import { Link, useLocation } from 'react-router-dom';
import useStyles from './style';

export default function index({ routes }) {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar variant="">
          {routes.map(route => (
            <Button
              className={
                location.pathname === route.path && classes.pathSelected
              }
              color="inherit"
              component={Link}
              to={route.path}
              style={{ padding: '1rem' }}
            >
              {route.name}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
}
