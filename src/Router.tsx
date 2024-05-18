import App from '@/App.tsx';
import NotFound from '@/pages/404';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LuckyWheelPage } from './pages/LuckyWheel';
import { RankPage } from './pages/Rank';

const routerConfig = [
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   path: '',
      //   element: <Home />
      // }
      {
        path: '/lucky-wheel',
        element: <LuckyWheelPage />
      },
      {
        path: '/rank',
        element: <RankPage />
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
