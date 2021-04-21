/* eslint-disable no-undef */
import React from 'react';

import { render } from '@testing-library/react';
import Page from '../../../components/Page';

test('renders correctly', () => {
  const { asFragment } = render(<Page />);

  expect(asFragment()).toMatchSnapshot();
});
