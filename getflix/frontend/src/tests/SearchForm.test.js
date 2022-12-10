import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchForm from '../forms/SearchForm';

let calledSearch = null;

function search() {
  calledSearch = true
}

it("matches snapshot", () => {
  const { asFragment } = render(<SearchForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("should have an input to search with", () => {
  const { getByTestId } = render(<SearchForm searchFor={search} />);
  const input = getByTestId("search-form-input")
  expect(input).toBeInTheDocument();
  input.value = "testing"
  fireEvent.click(getByTestId("search-form-btn"));
  expect(input.value).toEqual("testing");
  expect(calledSearch).toBeTruthy();
});