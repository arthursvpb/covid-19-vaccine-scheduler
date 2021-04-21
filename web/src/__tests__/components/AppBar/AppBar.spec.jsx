/* eslint-disable no-undef */
import React from 'react';

import { render } from '@testing-library/react';
import AppBar from '../../../components/AppBar';

test('renders correctly', () => {
  const { asFragment } = render(<AppBar />);

  expect(asFragment()).toMatchSnapshot();
});
