import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Appointment from './pages/Appointment/Appointments';
import AppointmentForm from './pages/Appointment/AppointmentForm';
import AppBar from './components/AppBar';

const routes = [
  {
    component: Home,
    path: '/',
    name: 'Agendamento Vacina COVID-19',
  },
  {
    component: AppointmentForm,
    path: '/agendamentos/novo',
    name: 'Novo Agendamento',
  },
  {
    component: Appointment,
    path: '/agendamentos',
    name: 'Agendamentos',
  },
];

export default function Routes() {
  return (
    <BrowserRouter>
      <AppBar routes={routes} />
      <Switch>
        {routes.map(({ path, component }) => (
          <Route key={path} exact path={path} component={component} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}
