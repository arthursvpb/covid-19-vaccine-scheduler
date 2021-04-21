/* eslint-disable no-undef */
import React from 'react';

import { render } from '@testing-library/react';
import AppointmentForm from '../../../../pages/Appointment/AppointmentForm';

test('renders correctly', () => {
  const { asFragment } = render(<AppointmentForm />);

  expect(asFragment()).toMatchSnapshot();
});
