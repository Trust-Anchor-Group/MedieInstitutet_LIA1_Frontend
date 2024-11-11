import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import DashLayout from './pages/Dashboard/DashLayout';
import { dashboardRoutes } from './routes/dashboardRoutes';
import VerifyPage from './pages/VerifyPage';
import MicroLoan from './pages/MicroLoan';
import ContractsPage from './pages/ContractsPage';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <div>
        <h1>404 Not Found</h1>
      </div>
    ),
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            element: <DashLayout />,
            children: dashboardRoutes,
          },
          {
            path: '/microloan',
            element: <MicroLoan />
          },
          {
            path: '/contracts',
            element: <ContractsPage />
          }
        ],
      },
      { index: true, element: <HomePage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/verify', element: <VerifyPage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
]);
