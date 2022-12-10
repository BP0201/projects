import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Homepage from '../components/Homepage';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './testUtils';

it('matches snapshot when logged in', () => {
  const { asFragment, getByTestId } = render(
    <MemoryRouter>
      <UserProvider>
        <Homepage />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  // only shown when logged in
  expect(getByTestId("trending-header")).toBeInTheDocument();
});

it('matches snapshot when logged out', () => {
  const { asFragment, getByTestId } = render(
    <MemoryRouter>
      <UserProvider currentUser={null}>
        <Homepage />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  // <Link to="/login"/> only shown when logged out
  expect(getByTestId("login-link")).toBeInTheDocument();
});