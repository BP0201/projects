import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Favorites from '../components/Favorites';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './testUtils';

it('matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Favorites />
      </UserProvider>
    </MemoryRouter>
  )
  expect(asFragment()).toMatchSnapshot();
});