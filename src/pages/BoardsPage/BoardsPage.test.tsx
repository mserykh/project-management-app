import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import BoardsPage from './BoardsPage';

test('Boards Page rendering', () => {
  const { getByText } = render(<BoardsPage />);
  expect(getByText(/boards page/i)).toBeInTheDocument();
});
