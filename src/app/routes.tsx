import { MakeGenerics, Route } from '@tanstack/react-location';

import AppView from './app-view/app-view';
import AllNotes from './app-view/notes/note-views/all-notes/all-notes';
import ArchivedNotes from './app-view/notes/note-views/archived-notes/archived-notes';
import BinnedNotes from './app-view/notes/note-views/binned-notes/binned-notes';
import NotFoundPage from './not-found-page/not-found-page';

export const routes: Route<LocationGenerics>[] = [
  {
    path: '/',
    element: <AppView />,
    children: [
      { path: '/notes', element: <AllNotes /> },
      { path: 'bin', element: <BinnedNotes /> },
      { path: 'archive', element: <ArchivedNotes /> },
    ],
  },
  {
    element: <NotFoundPage />,
  },
];

export type LocationGenerics = MakeGenerics<{
  Search: {
    modal: 'signup' | 'signin' | 'new-note' | 'edit-note';
    editNote: string;
  };
}>;
