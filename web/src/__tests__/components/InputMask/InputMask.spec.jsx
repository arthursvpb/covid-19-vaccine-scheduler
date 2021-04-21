/* eslint-disable no-undef */
import React from 'react';

import { render } from '@testing-library/react';
import InputMask from '../../../components/InputMask';

test('renders correctly', () => {
  const { asFragment } = render(<InputMask />);

  expect(asFragment()).toMatchSnapshot();
});
