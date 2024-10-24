import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Identifications from './pages/Identifications';
import Contracts from './pages/Contracts';
import Settings from './pages/Settings';
import { Verify } from './pages/Verify';
import ProtectedRoute from './components/ProtectedRoute';
import DashLayout from './pages/DashLayout';
import { Signature } from './pages/Signature';

// Creating a router configuration using createBrowserRouter
export const Router = createBrowserRouter([
  {
    path: '/', //Root path
    element: <Layout />, //Component to render at the root path

    children: [
      //Nested routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard', // Path for the Dashboard component
            element: (
              <DashLayout>
                <Dashboard />
              </DashLayout>
            ),
          },
          {
            path: '/identifications', // Path for the Dashboard component
            element: (
              <DashLayout>
                <Identifications />
              </DashLayout>
            ),
          },
          {
            path: '/contracts', // Path for the Dashboard component
            element: (
              <DashLayout>
                <Contracts />
              </DashLayout>
            ),
          },
          {
            path: '/signature', // Path for the Dashboard component
            element: (
              <DashLayout>
                <Signature />
              </DashLayout>
            ),
          },
          {
            path: '/settings', // Path for the Dashboard component
            element: (
              <DashLayout>
                <Settings />
              </DashLayout>
            ),
          },
        ],
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/register', //Path for the Register component
        element: <Register />, //Component to render at the /register path
      },
      {
        path: '/verify', //Path for the Verify component
        element: <Verify />, //Component to render at the /verify path
      },
      {
        path: '/login', //Path for the login component
        element: <Login />, //Component to render at the /login path
      },
    ],
  },
]);
