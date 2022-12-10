import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../other/NotFound';

it("matches snapshot", () => {
  const { asFragment, getByText } = render(<NotFound />);
  expect(asFragment()).toMatchSnapshot();
  expect(getByText("404 Not Found")).toBeInTheDocument();
});