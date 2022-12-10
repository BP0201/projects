import React from 'react';
import { render } from '@testing-library/react';
import Alert from '../other/Alert';

it("matches snapshot", () => {
  const { asFragment, getByText } = render(<Alert messages={["Hello", "This is a test"]} />);
  expect(asFragment()).toMatchSnapshot();
  expect(getByText("Hello")).toBeInTheDocument();
  expect(getByText("This is a test")).toBeInTheDocument();
});

it("should not render a duplicate message twice", () => {
  const { getAllByText } = render(<Alert messages={["Hello", "Hello"]} />);
  expect(getAllByText("Hello").length).toBe(1);
});

it("should not render a blank message", () => {
  const { getAllByTestId, getByText } = render(<Alert messages={["", "Hello", "", "Goodbye"]} />);
  expect(getByText("Hello")).toBeInTheDocument();
  expect(getByText("Goodbye")).toBeInTheDocument();
  // <p/> mapped from messages array containing message text
  expect(getAllByTestId("alert-p").length).toBe(2)
});