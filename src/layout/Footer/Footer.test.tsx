import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from './Footer';

test('Footer rendering', () => {
  const { getByText } = render(<Footer />);
  expect(getByText(/copyright/i)).toBeInTheDocument();
  expect(getByText(/our github profiles/i)).toBeInTheDocument();
  expect(getByText(/sergei mangilev/i)).toBeInTheDocument();
  expect(getByText(/marie serykh/i)).toBeInTheDocument();
  expect(getByText(/muhammed abdrahman/i)).toBeInTheDocument();
});
