import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../other/Loading';

it("matches snapshot", () => {
  const { asFragment, getByText } = render(<Loading />);
  expect(asFragment()).toMatchSnapshot();
  expect(getByText("Loading...")).toBeInTheDocument();
});
