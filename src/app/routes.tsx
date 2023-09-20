import { Outlet, RootRoute, Route, Router } from '@tanstack/react-router';

import AppView from './app-view/app-view';
import AllNotes from './app-view/notes/note-views/all-notes/all-notes';
import ArchivedNotes from './app-view/notes/note-views/archived-notes/archived-notes';
import BinnedNotes from './app-view/notes/note-views/binned-notes/binned-notes';

const rootRoute = new RootRoute({
  component: () => <Outlet />,
});

type modals = undefined | 'signup' | 'signin' | 'new-note' | 'edit-note';

interface ModalSearch {
  modal: modals;
  editNote: undefined | string;
}

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: AppView,
  validateSearch: (search: Record<string, unknown>): ModalSearch => {
    return {
      modal: (search.modal as modals) || undefined,
      editNote: (search.editNote as string) || undefined,
    };
  },
});

const binnedNotesRoute = new Route({
  getParentRoute: () => indexRoute,
  path: '/bin',
  component: BinnedNotes,
});

const archivedNotesRoute = new Route({
  getParentRoute: () => indexRoute,
  path: '/archive',
  component: ArchivedNotes,
});

const allNotesRoute = new Route({
  getParentRoute: () => indexRoute,
  path: '/all',
  component: AllNotes,
});

const notesCatchRoute = new Route({
  getParentRoute: () => indexRoute,
  path: '*',
  component: AllNotes,
});

const routeTree = rootRoute.addChildren([
  indexRoute.addChildren([
    binnedNotesRoute,
    archivedNotesRoute,
    allNotesRoute,
    notesCatchRoute,
  ]),
]);

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
