import App from '@/App.tsx';
import NotFound from '@/pages/404';
import { createBrowserRouter, redirect, RouteObject, RouterProvider } from 'react-router-dom';
import { LuckyWheelPage } from './pages/LuckyWheel';
import { RankPage } from './pages/Rank';
import AttestPage from '@/pages/attest';
import Home from '@/pages/home';

// let redirectedToAttest = false;

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
