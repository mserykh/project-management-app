import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MainPage from './MainPage';

test('Main Page rendering', () => {
  const initialState = {
    userReducer: { isAuthenticated: false },
    boardsReducer: { boardsData: [] },
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);
  const { getByText } = render(
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
  expect(getByText(/boards/i)).toBeInTheDocument();
});
