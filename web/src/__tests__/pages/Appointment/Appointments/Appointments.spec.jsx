/* eslint-disable no-undef */
import React from 'react';

import { render } from '@testing-library/react';
import Appointments from '../../../../pages/Appointment/Appointments';

test('renders correctly', () => {
  const { asFragment } = render(<Appointments />);

  expect(asFragment()).toMatchSnapshot();
});
