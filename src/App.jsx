import React, { useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Router } from './router.jsx';
import AuthContext from './state/AuthContext.jsx';
import { LoadingScreen } from './components/LoadingScreen.jsx';

function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  return <RouterProvider router={Router} />;
}

export default App;
