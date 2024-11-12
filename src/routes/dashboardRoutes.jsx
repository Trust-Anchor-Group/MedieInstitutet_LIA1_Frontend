import DashboardPage from '../pages/Dashboard/DashboardPage';
import IdPage from '../pages/Dashboard/Identification/IdPage';
import IdRegisterPage from '../pages/Dashboard/Identification/IdRegisterPage';
import IdDetailsPage from '../pages/Dashboard/Identification/IdDetailsPage';
import ContractsPage from '../pages/Dashboard/ContractsPage';
import SettingsPage from '../pages/Dashboard/SettingsPage';
import SignaturePage from '../pages/Dashboard/SignaturePage';
import { DashContentLayout } from '../pages/Dashboard/DashContentLayout';
import { ProfilePage } from '../pages/Dashboard/ProfilePage';

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
    path: 'profile',
    element: <DashContentLayout />,
    children: [
      {
        index: true,
        element: <ProfilePage />,
        handle: {
          title: 'Profile',
          icon: '',
        },
      },
    ],
  },
  {
    path: 'id',
    element: <DashContentLayout />,
    children: [
      {
        index: true,
        element: <IdPage />,
        handle: {
          title: 'Identities', // Title only in parent
          icon: '',
          subLinks: [{ path: 'register', title: 'New identity', icon: 'Plus' }],
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
