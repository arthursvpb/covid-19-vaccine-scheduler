/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import api from '../../services/api';

export default function index() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get('/appointments').then(response => {
      console.log(response.data);
      setAppointments(response.data);
    });
  }, []);

  return (
    <div>
      {appointments.map(appointment => (
        <h1>{appointment._id}</h1>
      ))}
    </div>
  );
}
