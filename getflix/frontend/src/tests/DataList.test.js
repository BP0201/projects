import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DataList from '../components/DataList';

it('matches snapshot', () => {
  const { asFragment, getByTestId } = render(<DataList />)
  expect(asFragment()).toMatchSnapshot();
  expect(getByTestId("search-form")).toBeInTheDocument();
});