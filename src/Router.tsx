import App from '@/App.tsx';
import NotFound from '@/pages/404';
import { createBrowserRouter, redirect, RouteObject, RouterProvider } from 'react-router-dom';
import { LuckyWheelPage } from './pages/LuckyWheel';
import { RankPage } from './pages/Rank';
import AttestPage from '@/pages/attest';
import Home from '@/pages/home';
import { getTMAInitData } from './utils/common';

let redirectedToAttest = false;

const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    loader: () => {
      const authData = getTMAInitData();
      if (authData?.start_param && !redirectedToAttest) {
        redirectedToAttest = true;
        return redirect('/attest');
      }
      return true;
    },
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          {
            path: '',
            loader: () => {
              return redirect('/lucky-wheel');
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
