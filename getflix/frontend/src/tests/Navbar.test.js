import React from "react";
import { render, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './testUtils';

it("matches snapshot when logged in", () => {
  const { asFragment, getByTestId } = render(
    <MemoryRouter>
      <UserProvider>
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  expect(getByTestId("navbar-logout-link")).toBeInTheDocument();
});

it("matches snapshot when logged out", () => {
  const { asFragment, getByTestId } = render(
    <MemoryRouter>
      <UserProvider currentUser={null} >
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  expect(getByTestId("navbar-login-link")).toBeInTheDocument();
});

it("matches snapshot for admin users", () => {
  const { asFragment, getByTestId } = render(
    <MemoryRouter>
      <UserProvider currentUser={{ username: "testAdmin", is_admin: true }} >
        <Navbar />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
  expect(getByTestId("navbar-ap-link")).toBeInTheDocument();
});