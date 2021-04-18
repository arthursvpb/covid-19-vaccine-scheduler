import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Appointment from './pages/Appointment/Appointments';
import AppointmentForm from './pages/Appointment/AppointmentForm';

const routes = [
  {
    component: Home,
    path: '/',
    name: 'Home',
  },
  {
    component: Appointment,
    path: '/agendamentos',
    name: 'Agendamentos',
  },
  {
    component: AppointmentForm,
    path: '/agendamentos/novo',
    name: 'Novo Agendamento',
  },
];

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ path, component }) => (
          <Route key={path} exact path={path} component={component} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}
