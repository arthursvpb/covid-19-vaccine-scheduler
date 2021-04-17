import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core';
import Image from 'material-ui-image';
import undrawDoctors from '../../assets/undraw_doctors.png';
import Page from '../../components/Page';
import Button from '../../components/Button';

import useStyles from './style';

export default function index() {
  const classes = useStyles();

  return (
    <Page>
      <Grid container className={classes.grid}>
        <Grid item xs={12} md={7} className={classes.gridItem}>
          <Image imageStyle={{ objectFit: 'contain' }} src={undrawDoctors} />
        </Grid>
        <Grid item xs={12} md={5} className={classes.gridItem}>
          <Typography variant="h6">
            O plano de vacinação contra a Covid-19 está dividido por grupos de
            prioridade, de acordo com o tempo de exposição e pessoas com maior
            risco de desenvolver complicações e óbito pela doença. Cadastre-se e
            receba a notificação quando iniciar a vacinação para o seu grupo.
          </Typography>
          <Grid item className={classes.buttons}>
            <Button
              to="/agendamentos/novo"
              component={Link}
              className={classes.button}
            >
              Novo agendamento
            </Button>
            <Button
              to="/agendamentos"
              component={Link}
              className={classes.button}
            >
              Agendamentos
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
