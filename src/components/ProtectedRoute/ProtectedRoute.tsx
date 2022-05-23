import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

function ProtectedRoute(): JSX.Element {
  const userIsAuthenticated = useAppSelector((state) => state.userReducer.isAuthenticated);

  if (!userIsAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
