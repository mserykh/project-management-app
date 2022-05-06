import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import WelcomePage from './WelcomePage';
import { Provider } from 'react-redux';
import { setupStore } from '../../redux/store';

test('Welcome Page rendering', () => {
  const store = setupStore();
  const { getByText } = render(
    <Provider store={store}>
      <WelcomePage />
    </Provider>
  );
  expect(getByText(/welcome page/i)).toBeInTheDocument();
});
