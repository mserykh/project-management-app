import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

test('renders without crashing', () => {
  const initialState = { userReducer: { isAuthenticated: false } };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
});

test('Collapsed header', () => {
  const initialState = { userReducer: { isAuthenticated: false } };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
  fireEvent.scroll(window, { target: { scrollY: 200 } });
});
