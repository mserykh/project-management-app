import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from './Header';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

test('Header rendering without crashing', () => {
  const initialState = {
    userReducer: { isAuthenticated: true, user: { id: 'testuser' } },
    globalStateReducer: { token: 'test' },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const screen = render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  screen.debug();
});
/* 
test('Language change', () => {
  const initialState = { userReducer: { isAuthenticated: true } };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  userEvent.click(getToggle());
  userEvent.click(getRuOption());
  userEvent.click(getToggle());
  expect(getByText(/ru/i)).toBeInTheDocument();
});

test('Header for unautorised user', () => {
  const initialState = { userReducer: { isAuthenticated: false } };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const editButton = getByText(/edit/i);
  userEvent.click(getLogOutButton());
  expect(editButton).not.toBeInTheDocument();
}); 

function getToggle() {
  return screen.getByTestId('toggle');
}

function getRuOption() {
  return screen.getByRole('button', {
    name: /ru/i,
  });
}

function getLogOutButton() {
  return screen.getByRole('button', {
    name: /log/i,
  });
} */
