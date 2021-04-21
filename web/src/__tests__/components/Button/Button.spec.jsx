/* eslint-disable no-undef */
import React from 'react';

import { render } from '@testing-library/react';
import Button from '../../../components/Button';

test('renders correctly', () => {
  const { asFragment } = render(<Button />);

  expect(asFragment()).toMatchSnapshot();
});
