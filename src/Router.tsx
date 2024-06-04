import App from '@/App.tsx';
import NotFound from '@/pages/404';
import AttestPage from '@/pages/Attest';
import Home from '@/pages/Home';
import RecordsPage from '@/pages/Records';
import { createBrowserRouter, redirect, RouteObject, RouterProvider } from 'react-router-dom';
import CreateSchema from './pages/CreateSchema';
import { LuckyWheelPage } from './pages/LuckyWheel';
import { RankPage } from './pages/Rank';
import Tasks from '@/pages/Tasks';
import Invite from '@/pages/Invite';
import Quizzes from '@/pages/Quizzes';

const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          {
            path: '',
            loader: () => {
              const search = location.search;

              return redirect('/lucky-wheel' + search);
            }
          },
          {
            path: '/lucky-wheel',
            element: <LuckyWheelPage />
          },
          {
            path: '/rank',
            element: <RankPage />
          }
        ]
        // loader: () => {
        //   return redirect('/lucky-wheel');
        // }
      },
      {
        path: '/attest',
        element: <AttestPage />
      },
      {
        path: '/records',
        element: <RecordsPage />
      },
      {
        path: '/schema',
        element: <CreateSchema />
      },
      {
        path: '/tasks',
        element: <Tasks />
      },
      {
        path: '/invite',
        element: <Invite />
      },
      {
        path: '/quizzes',
        element: <Quizzes />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
];

const router = createBrowserRouter(routerConfig);

export const Router = () => {
  return <RouterProvider router={router} />;
};
