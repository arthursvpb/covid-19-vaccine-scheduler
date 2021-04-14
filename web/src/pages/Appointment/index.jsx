/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import { Container, Paper, Typography } from '@material-ui/core';

import { parse, differenceInCalendarYears } from 'date-fns';

import api from '../../services/api';

export default function index() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get('/appointments').then(response => {
      setAppointments(response.data);
    });
  }, []);

  return (
    <Container>
      {appointments.map(
        ({
          name,
          birthday,
          vaccinationDate,
          vaccinationTime,
          conclusion,
          isConcluded,
        }) => (
          <Paper style={{ marginBottom: '20px' }}>
            <Typography>{name}</Typography>
            <Typography>
              {differenceInCalendarYears(
                new Date(),
                parse(birthday, 'dd-MM-yyyy', new Date()),
              )}
            </Typography>
            <Typography>{vaccinationDate}</Typography>
            <Typography>{vaccinationTime}</Typography>
            <Typography>{conclusion}</Typography>
            <Typography>{isConcluded}</Typography>
          </Paper>
        ),
      )}
    </Container>
  );
}
