import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders logo title', () => {
  render(<App />, { wrapper: BrowserRouter });
  const logoElement = screen.getAllByText(/alldone/i)[0];
  expect(logoElement).toBeInTheDocument();
});
