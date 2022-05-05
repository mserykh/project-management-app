import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Header from './Header';

test('Header rendering', () => {
  const { getByText } = render(<Header />);
  expect(getByText(/alldone/i)).toBeInTheDocument();
  expect(getByText(/en/i)).toBeInTheDocument();
});

test('Language change', () => {
  const { getByText } = render(<Header />);
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
