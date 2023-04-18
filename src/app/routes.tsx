import { Route } from '@tanstack/react-location';

import AppView from './app-view/app-view';
import FrontPage from './front-page/front-page';
import NotFoundPage from './not-found-page/not-found-page';

export const routes: Route[] = [
  {
    path: '/',
    element: <FrontPage />,
  },
  {
    path: '/app',
    element: <AppView />,
  },
  {
    element: <NotFoundPage />,
  },
];
