import React from 'react';
import { Link } from 'react-router-dom';

export default function index() {
  return (
    <div>
      <Link as={Link} to="/agendamentos/novo">
        <button type="button">Novo agendamento</button>
      </Link>
      <Link as={Link} to="/agendamentos/">
        <button type="button">Agendamentos</button>
      </Link>
    </div>
  );
}
