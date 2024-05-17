import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from '@/pages/404';
import App from '@/App.tsx';

const routerConfig = [
  {
    path: '/',
    element: <App />
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
