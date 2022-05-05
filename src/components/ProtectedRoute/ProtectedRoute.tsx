import { Navigate, Outlet } from 'react-router-dom';
import { ProtectedRouteProps } from './types';

function ProtectedRoute(props: ProtectedRouteProps) {
  if (!props.token) {
    return <Navigate to={props.redirectedPath} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
