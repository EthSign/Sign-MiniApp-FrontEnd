import App from '@/App.tsx';
import NotFound from '@/pages/404';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { LuckyWheelPage } from './pages/LuckyWheel';
import { RankPage } from './pages/Rank';
import AttestPage from '@/pages/attest';
import Home from '@/pages/home';

const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
        // loader: () => {
        //   return redirect('/lucky-wheel');
        // }
      },
      {
        path: '/lucky-wheel',
        element: <LuckyWheelPage />
      },
      {
        path: '/rank',
        element: <RankPage />
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
