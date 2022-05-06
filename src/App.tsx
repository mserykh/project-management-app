import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import BoardsPage from './pages/BoardsPage/BoardsPage';
import BoardDetailPage from './pages/BoardDetailPage/BoardDetailPage';
import Page404 from './pages/Page404/Page404';
import { setupStore } from './redux/store';
import { Provider } from 'react-redux';
import WelcomePage from './pages/WelcomePage/WelcomePage';

const store = setupStore();

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route
            element={
              <ProtectedRoute token={localStorage.getItem('token') || ''} redirectedPath="/" />
            }
          >
            <Route path="main" element={<MainPage />} />
            <Route path="boards" element={<BoardsPage />} />
            <Route path="board/:id" element={<BoardDetailPage />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
