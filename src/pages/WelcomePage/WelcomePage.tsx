import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

function WelcomePage(): JSX.Element {
  const token = useAppSelector((state) => state.globalStateReducer.token);
  if (token) {
    return <Navigate to="main" replace />;
  }
  return (
    <main className="bg-cyan-200 h-screen">
      <h1>Welcome Page</h1>
    </main>
  );
}

export default WelcomePage;
