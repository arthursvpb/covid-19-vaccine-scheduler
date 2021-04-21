/* eslint-disable no-undef */
import React from 'react';

import { render } from '@testing-library/react';
import Home from '../../../pages/Home';

test('renders correctly', () => {
  const { asFragment } = render(<Home />);

  expect(asFragment()).toMatchSnapshot();
});
