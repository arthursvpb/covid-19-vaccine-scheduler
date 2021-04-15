/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Container,
  Grid,
  Paper,
  // Typography,
  // TextField,
  FormLabel,
} from '@material-ui/core';
// Layout, Drawer, List, ListItem, ListItemText, ListItemIcon

import { format } from 'date-fns';

import api from '../../services/api';

export default function CreateAppointment() {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [vaccinationDate, setVaccinationDate] = useState('');
  const [vaccinationTime, setVaccinationTime] = useState('');

  const formik = useFormik({
    initialValues: {
      name,
      birthday,
      vaccinationDate,
      vaccinationTime,
    },
    onSubmit: async () => {
      const appointmentForm = {
        name,
        birthday: format(birthday, 'dd-MM-yyyy'),
        vaccinationDate: format(vaccinationDate, 'dd-MM-yyyy'),
        vaccinationTime: format(vaccinationTime, 'HH:mm'),
      };
      alert(JSON.stringify(appointmentForm));

      try {
        const response = await api.post('/appointments', appointmentForm);
        alert(response.data.message);
      } catch (error) {
        alert(error.response?.data.message || `😓 Something went wrong!`);
      }
    },
  });

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <form
              autoComplete="off"
              onSubmit={event => formik.handleSubmit(event)}
            >
              <FormLabel button> Nome</FormLabel>
              <legend>New appointment</legend>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={event => setName(event.target.value)}
                />
              </label>

              <label htmlFor="birthday">
                Birthday
                <DatePicker
                  name="birthday"
                  id="birthday"
                  selected={birthday}
                  dateFormat="dd/MM/yyyy"
                  onChange={date => setBirthday(date)}
                />
              </label>

              <label htmlFor="vaccinationDate">
                vaccinationDate
                <DatePicker
                  name="vaccinationDate"
                  id="vaccinationDate"
                  selected={vaccinationDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={date => setVaccinationDate(date)}
                />
              </label>

              <label htmlFor="vaccinationTime">
                vaccinationTime
                <DatePicker
                  selected={vaccinationTime}
                  onChange={time => setVaccinationTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  timeFormat="HH:mm"
                />
              </label>

              <button type="submit">Submit</button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
