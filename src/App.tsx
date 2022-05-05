import { Route, Routes } from 'react-router';
import Layout from './layout/Layout/Layout';

import './App.scss';
import WelcomePage from './pages/WelcomePage/WelcomePage';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
