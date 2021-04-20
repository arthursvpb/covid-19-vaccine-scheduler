/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import InputMask from 'react-input-mask';

export default function index({ ...otherProps }) {
  return <InputMask mask="99/99/9999" {...otherProps} />;
}
