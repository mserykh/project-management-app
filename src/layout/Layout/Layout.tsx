import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { ToastContainer } from 'react-toastify';
import { ToastProvider } from '../../contexts/ToastContext';
import React from 'react';

function Layout(): JSX.Element {
  return (
    <ToastProvider>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </ToastProvider>
  );
}

export default Layout;
