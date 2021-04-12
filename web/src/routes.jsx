import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';

const routes = [
  {
    component: Home,
    path: '/home',
    name: 'Home',
  },
  {
    component: () => <h1>Agendamentos</h1>,
    path: '/agendamentos',
    name: 'Agendamentos',
  },
  {
    component: () => <h1>Criar Agendamento</h1>,
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
