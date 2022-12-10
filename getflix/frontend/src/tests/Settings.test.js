import React from "react";
import { render, fireEvent } from '@testing-library/react';
import Settings from '../components/Settings';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './testUtils';

it("matches snapshot", () => {
  const { asFragment, getByText } = render(
    <MemoryRouter>
      <UserProvider>
        <Settings />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  expect(getByText("Logged in as: testUser")).toBeInTheDocument();
})