import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Header from './Header';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

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

test('Header for unautorised user', () => {
  const { getByText } = render(<Header />, { wrapper: BrowserRouter });
  const editButton = getByText(/edit/i);
  userEvent.click(getLogOutButton());
  expect(editButton).not.toBeInTheDocument();
});

test('Collapsed header', () => {
  const { getByText } = render(<App />, { wrapper: BrowserRouter });
  const logoTitle = getByText(/alldone/i);
  fireEvent.scroll(window, { target: { scrollY: 200 } });
  expect(logoTitle).not.toBeInTheDocument();
});


function getToggle() {
  return screen.getByTestId('toggle');
}

function getRuOption() {
  return screen.getByRole('button', {
    name: /ru/i
  });
}

function getLogOutButton() {
  return screen.getByRole('button', {
    name: /log/i
  });
}
