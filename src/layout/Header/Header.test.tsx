import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

test('Header rendering', () => {
  const { getByText } = render(<Header />, { wrapper: BrowserRouter });
  expect(getByText(/alldone/i)).toBeInTheDocument();
  expect(getByText(/en/i)).toBeInTheDocument();
});

test('Language change', () => {
  const { getByText } = render(<Header />, { wrapper: BrowserRouter });
  userEvent.click(getToggle());
  userEvent.click(getRuOption());
  userEvent.click(getToggle());
  expect(getByText(/ru/i)).toBeInTheDocument();
});

function getToggle() {
  return screen.getByTestId('toggle');
}

function getRuOption() {
  return screen.getByRole('button', {
    name: /ru/i
  });
}
