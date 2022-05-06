import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Page404 from './Page404';

test('Page 404 rendering', () => {
  const { getByText } = render(<Page404 />);
  expect(getByText(/404/i)).toBeInTheDocument();
});
