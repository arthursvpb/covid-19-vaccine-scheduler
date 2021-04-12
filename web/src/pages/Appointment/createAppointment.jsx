/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import api from '../../services/api';

export default function CreateAppointment() {
  const initialAppointmentFormState = {
    name: '',
    birthday: '',
    vaccinationDate: '',
    vaccinationTime: '',
  };

  const [appointmentForm, setAppointmentForm] = useState(
    initialAppointmentFormState,
  );

  const onChange = event => {
    const { name, value } = event.target;
    setAppointmentForm({ ...appointmentForm, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await api.post('/appointments', appointmentForm);
      alert(JSON.stringify(response));
    } catch ({ message }) {
      alert(message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset style={{ display: 'flex', flexDirection: 'column' }}>
          <legend>New appointment</legend>
          <label htmlFor="name">Name</label>
          <input onChange={onChange} type="text" name="name" id="name" />

          <label htmlFor="birthday">Birthday</label>
          <input
            onChange={onChange}
            type="text"
            name="birthday"
            id="birthday"
          />

          <label htmlFor="vaccinationDate">vaccinationDate</label>
          <input
            onChange={onChange}
            type="text"
            name="vaccinationDate"
            id="vaccinationDate"
          />

          <label htmlFor="vaccinationTime">vaccinationTime</label>
          <input
            onChange={onChange}
            type="text"
            name="vaccinationTime"
            id="vaccinationTime"
          />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
