/* eslint-disable spaced-comment */
/* eslint-disable no-undef */
import React from 'react';

import { render, fireEvent, act } from '@testing-library/react';

import MockAdapter from 'axios-mock-adapter';
import api from '../../../../services/api';

import AppointmentForm from '../../../../pages/Appointment/AppointmentForm';

const apiMock = new MockAdapter(api);

const wait = (amount = 0) => {
  return new Promise(resolve => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

describe('AppointmentForm Component', () => {
  it('should be able to render correctly', async () => {
    const { asFragment } = render(<AppointmentForm />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should be able to add a new appointment', async () => {
    const { getByText } = render(<AppointmentForm />);

    apiMock.onGet('appointments').reply(200, []);

    apiMock.onPost('appointments').reply(200, {
      name: 'Aged person',
      birthday: '01-01-1900',
      vaccinationDate: '01-01-2020',
      vaccinationTime: '08:30',
      isConcluded: false,
      conclusion: '',
    });

    await actWait();

    fireEvent.click(getByText('Enviar'));

    await actWait();
  });
});
