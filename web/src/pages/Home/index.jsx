import React from 'react';
import { Link } from 'react-router-dom';

import Page from '../../components/Page';
import Button from '../../components/Button';
// import useStyles from './style';

export default function index() {
  // const classes = useStyles();

  return (
    <Page>
      <Button to="/agendamentos/novo" component={Link}>
        Novo agendamento
      </Button>
      <Button to="/agendamentos" component={Link}>
        Agendamento
      </Button>
    </Page>
  );
}
