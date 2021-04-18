import React from 'react';

import { Container } from '@material-ui/core';

import useStyles from './style';

export default function index({ children }) {
  const classes = useStyles();

  return <Container className={classes.root}>{children}</Container>;
}
