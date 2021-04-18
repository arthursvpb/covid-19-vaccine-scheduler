/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Grid, Paper, TextField, Typography } from '@material-ui/core';

import { format } from 'date-fns';

import Page from '../../../components/Page';
import Button from '../../../components/Button';

import api from '../../../services/api';

import useStyles from './style';

export default function index() {
  const classes = useStyles();

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
      <Paper elevation={3} className={classes.paper}>
        <form autoComplete="off" onSubmit={event => formik.handleSubmit(event)}>
          <Grid container className={classes.grid}>
            <Grid item xs={12} className={classes.title}>
              <Typography variant="h5">Dados pessoais</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
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

            <Grid item xs={12} md={6}>
              <DatePicker
                customInput={
                  <TextField
                    variant="outlined"
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

            <hr />

            <Grid item xs={12} className={classes.title}>
              <Typography variant="h5">Data e hora da vacinação</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                customInput={
                  <TextField
                    variant="outlined"
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

            <Grid item xs={12} md={6}>
              <DatePicker
                customInput={
                  <TextField
                    variant="outlined"
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

            <Button type="submit">Enviar</Button>
          </Grid>
        </form>
      </Paper>
    </Page>
  );
}
