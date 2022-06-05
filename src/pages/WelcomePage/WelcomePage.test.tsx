import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import WelcomePage from './WelcomePage';
import { Provider } from 'react-redux';
import store from '../../redux/store';

test('Welcome Page rendering without errors', () => {
  render(
    <Provider store={store}>
      <WelcomePage />
    </Provider>
  );
});
