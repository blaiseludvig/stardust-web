import { Route } from '@tanstack/react-location';
import FrontPage from './front-page/front-page';

export const routes: Route[] = [
  {
    path: '/',
    element: <FrontPage />,
  },
];
