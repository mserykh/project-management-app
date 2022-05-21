import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import BoardDetailPage from './BoardDetailPage';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

test('Board detail Page rendering', () => {
  const initialState = {
    userReducer: { isAuthenticated: false },
    boardReducer: {
      boardData: { id: 'test', title: 'testboard', descirption: 'test description', columns: [] },
    },
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);
  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <BoardDetailPage />
      </Provider>
    </BrowserRouter>
  );
  expect(getByText(initialState.boardReducer.boardData.title)).toBeInTheDocument();
});
