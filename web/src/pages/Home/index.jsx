import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core';

import EventIcon from '@material-ui/icons/Event';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';

import Image from 'material-ui-image';
import undrawDoctors from '../../assets/undraw_doctors.svg';

import Page from '../../components/Page';
import Button from '../../components/Button';

import useStyles from './style';

export default function index() {
  const classes = useStyles();

  return (
    <Page>
      <Grid container className={classes.grid}>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <Image imageStyle={{ objectFit: 'contain' }} src={undrawDoctors} />
        </Grid>
        <Grid item xs={12} md={5} className={classes.gridItem}>
          <Typography variant="h6">
            Este projeto é uma simulação de um sistema de agendamento de
            pacientes e monitoramento de enfermeiros em decorrência da vacinação
            contra a COVID-19. A disponibilidade são de 20 vagas por dia, com o
            máximo de 2 agendamentos para o mesmo horário. Está dividido por
            grupos de prioridade, de acordo com o tempo de exposição e pessoas
            com maior risco de desenvolver complicações e óbito pela doença.
          </Typography>
          <Grid item className={classes.buttons}>
            <Button
              startIcon={<AddAlarmIcon />}
              to="/agendamentos/novo"
              component={Link}
            >
              Novo agendamento
            </Button>
            <Button
              startIcon={<EventIcon />}
              to="/agendamentos"
              component={Link}
            >
              Agendamentos
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
