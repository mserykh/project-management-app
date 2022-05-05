import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import BoardDetailPage from './BoardDetailPage';

test('About Page rendering', () => {
  const { getByText } = render(<BoardDetailPage />);
  expect(getByText(/board detail page/i)).toBeInTheDocument();
});
