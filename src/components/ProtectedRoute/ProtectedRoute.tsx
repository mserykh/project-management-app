import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { auth } from '../../redux/user/actions';

const ProtectedRoute = (): JSX.Element => {
  const userIsAuthenticated = useAppSelector((state) => state.userReducer.isAuthenticated);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (userIsAuthenticated) {
      dispatch(auth());
    }
  }, [location, userIsAuthenticated]);

  if (!userIsAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
