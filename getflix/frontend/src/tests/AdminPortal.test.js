import React from "react";
import { render, fireEvent, cleanup } from '@testing-library/react';
import AdminPortal from '../components/AdminPortal';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './testUtils';

let calledFn = null;

function mockFn() {
  calledFn = true
}

it("matches snapshot", async () => {
    const { asFragment, getByTestId } = render(
      <MemoryRouter>
        <UserProvider>
          <AdminPortal getAllUsers={mockFn} />
        </UserProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
    const userList = getByTestId('ap-user-list');
    expect(userList).toBeInTheDocument();
    expect(calledFn).toBeTruthy();
})