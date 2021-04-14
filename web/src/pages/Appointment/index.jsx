/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';

import { Container, Paper, Typography } from '@material-ui/core';

import { parse, differenceInCalendarYears, format } from 'date-fns';

import api from '../../services/api';

export default function index() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState(new Date());

  useEffect(() => {
    api.get('/appointments').then(response => {
      setAppointments(response.data);
    });
  }, []);

  const handleDateFilterChange = date => {
    const dateString = format(date, 'dd-MM-yyyy');

    setFilteredAppointments(
      appointments.filter(
        ({ vaccinationDate }) => vaccinationDate === dateString,
      ),
    );

    setDateFilter(date);
  };

  return (
    <Container>
      <DatePicker
        name="dateFilter"
        id="dateFilter"
        selected={dateFilter}
        dateFormat="dd-MM-yyyy"
        onChange={handleDateFilterChange}
      />
      {filteredAppointments.map(
        ({
          _id,
          name,
          birthday,
          vaccinationDate,
          vaccinationTime,
          conclusion,
          isConcluded,
        }) => (
          <Paper key={_id} style={{ marginBottom: '20px' }}>
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
            <Typography>{isConcluded ? 'Atendido' : 'Não atendido'}</Typography>
          </Paper>
        ),
      )}
    </Container>
  );
}
