import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ProfileEditPage from './ProfileEditPage';

test('Edit profile Page rendering', () => {
  const { getByText } = render(<ProfileEditPage />);
  expect(getByText(/edit profile page/i)).toBeInTheDocument();
});
