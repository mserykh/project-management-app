import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

function ProtectedRoute(): JSX.Element {
  const userState = useAppSelector((state) => state.userReducer.isAuthenticated);

  if (!userState) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
