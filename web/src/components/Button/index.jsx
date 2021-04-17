/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button, Typography } from '@material-ui/core';

import useStyles from './style';

export default function index({ children, ...otherProps }) {
  const classes = useStyles();

  return (
    <Button variant="outlined" className={classes.root} {...otherProps}>
      <Typography>{children}</Typography>
    </Button>
  );
}
