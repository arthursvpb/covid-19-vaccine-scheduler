/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';

// import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  // Paper,
  Typography,
  Checkbox,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { parse, differenceInCalendarYears, format } from 'date-fns';

import api from '../../services/api';

export default function index() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState(new Date());

  const [open, setOpen] = useState(false);

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

  const handleAppointmentChecked = async (event, _id) => {
    const { checked } = event.target;

    const updatedAppointments = filteredAppointments.map(appointment => {
      if (appointment._id === _id) {
        return {
          ...appointment,
          isConcluded: checked,
        };
      }

      return appointment;
    });

    try {
      await api.put(`/appointments/${_id}`, { isConcluded: checked });

      setFilteredAppointments(updatedAppointments);
    } catch (error) {
      alert(error.response?.data.message || `😓 Something went wrong!`);
    }
  };

  const handleClickOpen = _id => {
    setEditAppointmentId(_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      handleClose();
    } catch (error) {
      alert(error.response?.data.message || `😓 Something went wrong!`);
    }
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
          <div key={_id} style={{ marginBottom: '20px' }}>
            <Typography>{_id}</Typography>
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
            <Checkbox
              checked={isConcluded}
              onChange={event => handleAppointmentChecked(event, _id)}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleClickOpen(_id)}
            >
              Concluir
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <form onSubmit={event => handleConclusionSubmit(event)}>
                <DialogTitle id="form-dialog-title">
                  Concluir Atendimentos
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>Detalhes do atendimento</DialogContentText>
                  <TextField
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
                  <button type="submit">Submit</button>
                </DialogActions>
              </form>
            </Dialog>
          </div>
        ),
      )}
    </Container>
  );
}
