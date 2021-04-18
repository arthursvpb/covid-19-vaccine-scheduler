/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';

// import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  // Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { parse, differenceInCalendarYears, format } from 'date-fns';

import Page from '../../../components/Page';
// import Drawer from '../../../components/Drawer';

import api from '../../../services/api';

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
    <Page style={{ flexDirection: 'column' }}>
      <DatePicker
        customInput={
          <TextField
            inputProps={{
              style: { textAlign: 'center', fontSize: '20px' },
            }}
          />
        }
        name="dateFilter"
        id="dateFilter"
        selected={dateFilter}
        dateFormat="dd-MM-yyyy"
        onChange={handleDateFilterChange}
      />
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
                    {isConcluded ? 'Atendido' : 'Não atendido'}
                  </TableCell>
                  <TableCell align="center">{conclusion || '-'}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleDialogOpen(_id)}
                    >
                      Concluir
                    </Button>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
    </Page>
  );
}
