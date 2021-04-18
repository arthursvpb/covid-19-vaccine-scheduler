/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Grid,
  Paper,
  // Typography,
  TextField,
} from '@material-ui/core';
// Layout, Drawer, List, ListItem, ListItemText, ListItemIcon, Lotties

import { format } from 'date-fns';

import Page from '../../../components/Page';
import Button from '../../../components/Button';

import api from '../../../services/api';

export default function index() {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [vaccinationDate, setVaccinationDate] = useState('');
  const [vaccinationTime, setVaccinationTime] = useState('');

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Seu nome completo é um campo de preenchimento obrigatório.'),
    birthday: yup
      .string()
      .required(
        'Sua data de nascimento é um campo de preenchimento obrigatório.',
      ),
    vaccinationDate: yup
      .string()
      .required('O dia da vacina é um campo de preenchimento obrigatório.'),
    vaccinationTime: yup
      .string()
      .required('A hora da vacina é um campo de preenchimento obrigatório.'),
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
    <Page>
      <Paper
        elevation={3}
        style={{ padding: '50px', width: '60vw', height: '50vh' }}
      >
        <form autoComplete="off" onSubmit={event => formik.handleSubmit(event)}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={6}>
              <TextField
                id="name"
                name="name"
                type="text"
                label="Nome completo"
                value={name}
                onChange={event => {
                  setName(event.target.value);
                  formik.handleChange(event);
                }}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={6}>
              <DatePicker
                customInput={
                  <TextField
                    id="birthday"
                    name="birthday"
                    label="Data de nascimento"
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
            </Grid>

            <Grid item xs={6}>
              <DatePicker
                customInput={
                  <TextField
                    id="vaccinationDate"
                    name="vaccinationDate"
                    label="Data da vacina"
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
            </Grid>

            <Grid item xs={6}>
              <DatePicker
                customInput={
                  <TextField
                    id="vaccinationTime"
                    name="vaccinationTime"
                    label="Horário da vacina"
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
            </Grid>

            <Button type="submit">Submit</Button>
          </Grid>
        </form>
      </Paper>
    </Page>
  );
}
