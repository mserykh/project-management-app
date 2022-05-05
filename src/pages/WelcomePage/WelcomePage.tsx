import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

function WelcomePage() {
  const { token } = useAppSelector((state) => state.stateReducer);
  if (token) {
    return <Navigate to="main" replace />;
  }
  return (
    <div>
      <h3>WelcomePage</h3>
    </div>
  );
}

export default WelcomePage;
