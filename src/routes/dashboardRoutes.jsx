import DashboardPage from '../pages/Dashboard/DashboardPage';
import IdPage from '../pages/Dashboard/Identification/IdPage';
import IdRegisterPage from '../pages/Dashboard/Identification/IdRegisterPage';
import IdDetailsPage from '../pages/Dashboard/Identification/IdDetailsPage';
import ContractsPage from '../pages/Dashboard/Contract/ContractsPage';
import SettingsPage from '../pages/Dashboard/Settings/SettingsPage';
import KeysPage from '../pages/Dashboard/Keys/KeysPage';
import SignaturePage from '../pages/Dashboard/Signature/SignaturePage';
import { DashContentLayout } from '../pages/Dashboard/DashContentLayout';

export const dashboardRoutes = [
  {
    index: true,
    element: <DashboardPage />,
    handle: {
      title: 'Dashboard',
      icon: '',
    },
  },
  {
    path: 'id',
    element: <DashContentLayout />,
    children: [
      {
        index: true,
        element: <IdPage />,
        handle: {
          title: 'Identification',
          icon: '',
          subLinks: [
            { path: 'register', title: 'Create new ID', icon: 'Plus' },
          ],
        },
      },
      {
        path: 'register',
        element: <IdRegisterPage />,
        handle: {
          title: 'Register ID',
          icon: '',
        },
      },
      {
        path: 'details',
        element: <IdDetailsPage />,
        handle: {
          title: 'ID Details',
          icon: '',
        },
      },
    ],
  },
  {
    path: 'contracts',
    element: <DashContentLayout />,
    children: [
      {
        index: true,
        element: <ContractsPage />,
        handle: {
          title: 'Contracts',
          icon: '',
        },
      },
    ],
  },
  {
    path: 'settings',
    element: <DashContentLayout />,
    children: [
      {
        index: true,
        element: <SettingsPage />,
        handle: {
          title: 'Settings',
          icon: '',
        },
      },
    ],
  },
  {
    path: 'keys',
    element: <DashContentLayout />,
    children: [
      {
        index: true,
        element: <KeysPage />,
        handle: {
          title: 'Keys',
          icon: '',
        },
      },
    ],
  },
  {
    path: 'signature',
    element: <DashContentLayout />,
    children: [
      {
        index: true,
        element: <SignaturePage />,
        handle: {
          title: 'Signature requests',
          icon: '',
        },
      },
    ],
  },
];
