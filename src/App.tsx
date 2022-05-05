import { Route, Routes } from 'react-router';
import Layout from './layout/Layout/Layout';

import './App.scss';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      </Route>
    </Routes>
  );
}

export default App;
