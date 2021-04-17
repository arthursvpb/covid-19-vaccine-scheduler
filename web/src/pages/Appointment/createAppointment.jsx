/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Container,
  Grid,
  Paper,
  // Typography,
  TextField,
} from '@material-ui/core';
// Layout, Drawer, List, ListItem, ListItemText, ListItemIcon, Lotties

import { format } from 'date-fns';

import api from '../../services/api';

export default function CreateAppointment() {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [vaccinationDate, setVaccinationDate] = useState('');
  const [vaccinationTime, setVaccinationTime] = useState('');

  const validationSchema = yup.object().shape({
    name: yup.string().required('Por favor, digite seu nome.'),
    birthday: yup
      .string()
      .required('Por favor, digite sua data de nascimento.'),
    vaccinationDate: yup
      .string()
      .required('Por favor, digite a data da vacina.'),
    vaccinationTime: yup
      .string()
      .required('Por favor, digite o horário da sua vacina.'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      birthday: '',
      vaccinationDate: '',
      vaccinationTime: '',
    },
    validationSchema,
    onSubmit: async values => {
      alert(JSON.stringify(values));
      try {
        const appointmentForm = {
          name,
          birthday: format(birthday, 'dd-MM-yyyy'),
          vaccinationDate: format(vaccinationDate, 'dd-MM-yyyy'),
          vaccinationTime: format(vaccinationTime, 'HH:mm'),
        };

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
              <TextField
                id="name"
                name="name"
                type="text"
                label="name"
                value={name}
                onChange={event => {
                  setName(event.target.value);
                  formik.handleChange(event);
                }}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <DatePicker
                customInput={
                  <TextField
                    id="birthday"
                    name="birthday"
                    label="birthday"
                    value={birthday}
                    error={
                      formik.touched.birthday && Boolean(formik.errors.birthday)
                    }
                    helperText={
                      formik.touched.birthday && formik.errors.birthday
                    }
                  />
                }
                onChange={date => {
                  setBirthday(date);
                  formik.setFieldValue('birthday', date);
                }}
                selected={birthday}
                dateFormat="dd/MM/yyyy"
              />

              <DatePicker
                customInput={
                  <TextField
                    id="vaccinationDate"
                    name="vaccinationDate"
                    label="vaccinationDate"
                    value={vaccinationDate}
                    error={
                      formik.touched.vaccinationDate &&
                      Boolean(formik.errors.vaccinationDate)
                    }
                    helperText={
                      formik.touched.vaccinationDate &&
                      formik.errors.vaccinationDate
                    }
                  />
                }
                onChange={date => {
                  setVaccinationDate(date);
                  formik.setFieldValue('vaccinationDate', date);
                }}
                selected={vaccinationDate}
                dateFormat="dd/MM/yyyy"
              />

              <DatePicker
                customInput={
                  <TextField
                    id="vaccinationTime"
                    name="vaccinationTime"
                    label="vaccinationTime"
                    value={vaccinationTime}
                    error={
                      formik.touched.vaccinationTime &&
                      Boolean(formik.errors.vaccinationTime)
                    }
                    helperText={
                      formik.touched.vaccinationTime &&
                      formik.errors.vaccinationTime
                    }
                  />
                }
                onChange={date => {
                  setVaccinationTime(date);
                  formik.setFieldValue('vaccinationTime', date);
                }}
                selected={vaccinationTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                timeFormat="HH:mm"
              />

              <button type="submit">Submit</button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
