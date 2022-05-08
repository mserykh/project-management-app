import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import BoardsPage from './pages/BoardsPage/BoardsPage';
import BoardDetailPage from './pages/BoardDetailPage/BoardDetailPage';
import Page404 from './pages/Page404/Page404';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import SignUpView from './pages/SignUp/SignUpView';
import { auth } from './redux/user/actions';
import { useAppDispatch } from './redux/hooks';
import LoginView from './pages/Login/LoginView';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(auth);
  });
  return (
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
          <Route path="signup" element={<SignUpView />} />
          <Route path="login" element={<LoginView />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default App;
