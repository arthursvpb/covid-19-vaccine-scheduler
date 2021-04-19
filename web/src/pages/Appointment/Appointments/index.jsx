/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';

import EventIcon from '@material-ui/icons/Event';

// import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Typography,
} from '@material-ui/core';

import { parse, differenceInCalendarYears, format } from 'date-fns';

import Image from 'material-ui-image';
import undrawNoData from '../../../assets/undraw_no_data.svg';

import Page from '../../../components/Page';
import Button from '../../../components/Button';

import api from '../../../services/api';

import useStyle from './style';

export default function index() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState('');

  const [showDialog, setShowDialog] = useState(false);
  const [conclusionInput, setConclusionInput] = useState('');

  const [editAppointmentId, setEditAppointmentId] = useState();

  useEffect(() => {
    api
      .get('/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        alert(
          error.response?.data.message ||
            `😓 Something went wrong! Is server down?`,
        );
      });
  }, [filteredAppointments]);

  const handleDateFilterChange = date => {
    const dateString = format(date, 'dd-MM-yyyy');

    setFilteredAppointments(
      appointments.filter(
        ({ vaccinationDate }) => vaccinationDate === dateString,
      ),
    );

    setDateFilter(date);
  };

  const handleDialogOpen = _id => {
    setEditAppointmentId(_id);
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleConclusionSubmit = async event => {
    event.preventDefault();

    const updatedAppointments = filteredAppointments.map(appointment => {
      if (appointment._id === editAppointmentId) {
        return {
          ...appointment,
          isConcluded: true,
          conclusion: conclusionInput,
        };
      }

      return appointment;
    });

    try {
      await api.put(`/appointments/${editAppointmentId}`, {
        isConcluded: true,
        conclusion: conclusionInput,
      });

      setFilteredAppointments(updatedAppointments);
      handleDialogClose();
      alert(`✅ Success!`);
    } catch (error) {
      alert(error.response?.data.message || `😓 Something went wrong!`);
    }
  };

  const classes = useStyle();

  return (
    <Page
      style={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Grid container className={classes.grid}>
        <Grid item xs={12} className={classes.title}>
          <DatePicker
            customInput={
              <TextField
                inputProps={{
                  style: { textAlign: 'center', fontSize: '20px' },
                }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon />
                    </InputAdornment>
                  ),
                  endAdornment: <InputAdornment position="end" />,
                }}
                label="Data da vacinação"
                variant="outlined"
              />
            }
            name="dateFilter"
            id="dateFilter"
            selected={dateFilter}
            dateFormat="dd-MM-yyyy"
            onChange={handleDateFilterChange}
          />
        </Grid>
        <Grid item xs={12}>
          {filteredAppointments.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Idade</TableCell>
                    <TableCell align="center">Horário</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Conclusão</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAppointments.map(
                    ({
                      _id,
                      name,
                      birthday,
                      vaccinationTime,
                      conclusion,
                      isConcluded,
                    }) => (
                      <TableRow key={_id}>
                        <TableCell align="center">{name}</TableCell>
                        <TableCell align="center">
                          {differenceInCalendarYears(
                            new Date(),
                            parse(birthday, 'dd-MM-yyyy', new Date()),
                          )}
                        </TableCell>
                        <TableCell align="center">{vaccinationTime}</TableCell>
                        <TableCell align="center">
                          {isConcluded ? (
                            <span className={classes.concluded}>Atendido</span>
                          ) : (
                            <span className={classes.notConcluded}>
                              Aguardando
                            </span>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {conclusion || '-'}
                        </TableCell>
                        <TableCell align="center">
                          {isConcluded ? (
                            <Button disabled>Concluído</Button>
                          ) : (
                            <Button onClick={() => handleDialogOpen(_id)}>
                              Concluir
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>
              <Typography>Nenhum agendamento encontrado.</Typography>
              <Image
                imageStyle={{ objectFit: 'contain', marginTop: '50px' }}
                src={undrawNoData}
              />
            </div>
          )}
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={showDialog}
        onClose={handleDialogClose}
      >
        <form onSubmit={event => handleConclusionSubmit(event)}>
          <DialogTitle id="form-dialog-title">Concluir Atendimento</DialogTitle>
          <DialogContent>
            <TextField
              multiline
              onChange={event => setConclusionInput(event.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Detalhes do atendimento"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Enviar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Page>
  );
}
