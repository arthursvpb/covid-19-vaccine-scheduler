/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { format } from 'date-fns';

import api from '../../services/api';

export default function CreateAppointment() {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [vaccinationDate, setVaccinationDate] = useState('');
  const [vaccinationTime, setVaccinationTime] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    const appointmentForm = {
      name,
      birthday: format(birthday, 'dd-MM-yyyy'),
      vaccinationDate: format(vaccinationDate, 'dd-MM-yyyy'),
      vaccinationTime: format(vaccinationTime, 'h:mm aa'),
    };

    try {
      const response = await api.post('/appointments', appointmentForm);
      alert(response.data.message);
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
              dateFormat="h:mm aa"
            />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
