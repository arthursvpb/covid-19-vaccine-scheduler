/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';

// import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  // Paper,
  Typography,
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

  return (
    <>
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
              <Typography>
                {isConcluded ? 'Atendido' : 'Não atendido'}
              </Typography>

              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleDialogOpen(_id)}
              >
                Concluir
              </Button>
            </div>
          ),
        )}
      </Container>
      <Dialog
        open={showDialog}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={event => handleConclusionSubmit(event)}>
          <DialogTitle id="form-dialog-title">
            Concluir Atendimentos
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Detalhes do atendimento</DialogContentText>
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
            <button type="submit">Submit</button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
