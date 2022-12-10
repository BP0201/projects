import React from "react";
import { render, fireEvent } from '@testing-library/react';
import DataCard from '../components/DataCard';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './testUtils';

let userFavorites = null;

beforeEach(() => {
  userFavorites = [
    {
      id: 1,
      id_type: "movie"
    },
    {
      id: 2,
      id_type: "tv"
    }
  ];
})

function add(id, id_type) {
  userFavorites.push({ id, id_type })
}

function remove(id, id_type) {
  let newFavorites = userFavorites.filter(f => f.id !== id && f.id_type !== id_type)
  userFavorites = newFavorites;
}

it('matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <DataCard add={add} remove={remove} />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should allow users to add to their favorites', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <UserProvider value={{ userFavorites }}>
        <DataCard
          add={add}
          remove={remove}
          id={3}
          category="test"
        />
      </UserProvider>
    </MemoryRouter>
  );
  const addFavBtn = getByTestId("addFavBtn")
  expect(addFavBtn).toBeInTheDocument();
  fireEvent.click(addFavBtn);
  expect(userFavorites.length).toBe(3)
});

it('should allow users to remove from their favorites', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <UserProvider value={{ userFavorites }}>
        <DataCard
          add={add}
          remove={remove}
          id={2}
          category="tv"
        />
      </UserProvider>
    </MemoryRouter>
  );
  const removeFavBtn = getByTestId("removeFavBtn")
  expect(removeFavBtn).toBeInTheDocument();
  fireEvent.click(removeFavBtn);
  expect(userFavorites.length).toBe(1);
});