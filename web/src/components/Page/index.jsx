/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Container } from '@material-ui/core';

import useStyles from './style';

export default function index({ children, ...otherProps }) {
  const classes = useStyles();

  return (
    <Container className={classes.root} {...otherProps}>
      {children}
    </Container>
  );
}
