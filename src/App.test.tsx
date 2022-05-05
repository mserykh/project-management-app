import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders logo title', () => {
  render(<App />, { wrapper: BrowserRouter });
  const logoElement = screen.getByText(/alldone/i);
  expect(logoElement).toBeInTheDocument();
});
