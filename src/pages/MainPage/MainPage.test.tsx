import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import MainPage from './MainPage';

test('About Page rendering', () => {
  const { getByText } = render(<MainPage />);
  expect(getByText(/react application/i)).toBeInTheDocument();
});
