import { useMatchRoute } from '@tanstack/react-location';
import Masonry from 'react-masonry-css';
import { useIsSignedIn } from 'src/app/hooks/auth/useIsSignedIn';
import { useGetNotes } from 'src/app/hooks/notes/useGetNotes';
import Spinner from 'src/app/util/spinner';

import NoteCard from '../note-card/note-card';
import EmptyArchive from './empty-archive';
import EmptyBin from './empty-bin';
import styles from './notes-view.module.scss';
import Unauthenticated from './unathenticated';
import ZeroNotes from './zero-notes';

/* eslint-disable-next-line */
export interface NotesViewProps {}

export function NotesView(props: NotesViewProps) {
  const matchRoute = useMatchRoute();
  const isSignedIn = useIsSignedIn();

  const { isLoading, isError, data, error } = useGetNotes();

  if (!isSignedIn()) {
    return <Unauthenticated />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <span>Error: {JSON.stringify(error)}</span>;
  }

  if (matchRoute({ to: '/app/bin', fuzzy: true })) {
    if (
      data?.filter((noteData) => {
        return noteData.isDeleted === true;
      }).length === 0
    ) {
      return <EmptyBin />;
    }

    return (
      <Masonry
        breakpointCols={3}
        className={styles['notes-masonry-grid']}
        columnClassName={styles['notes-masonry-grid-column']}
      >
        {data
          ?.filter((noteData) => {
            return noteData.isDeleted === true;
          })
          .map((noteData) => (
            <NoteCard data={noteData} key={noteData.noteId} />
          ))}
      </Masonry>
    );
  }

  if (matchRoute({ to: '/app/archive', fuzzy: true })) {
    if (
      data?.filter((noteData) => {
        return noteData.isArchived === true;
      }).length === 0
    ) {
      return <EmptyArchive />;
    }

    return (
      <Masonry
        breakpointCols={3}
        className={styles['notes-masonry-grid']}
        columnClassName={styles['notes-masonry-grid-column']}
      >
        {data
          ?.filter((noteData) => {
            return noteData.isArchived === true;
          })
          .map((noteData) => (
            <NoteCard data={noteData} key={noteData.noteId} />
          ))}
      </Masonry>
    );
  }

  if (
    data?.filter((noteData) => {
      return noteData.isDeleted === false && noteData.isArchived === false;
    }).length === 0
  ) {
    return <ZeroNotes />;
  }

  return (
    <Masonry
      breakpointCols={3}
      className={styles['notes-masonry-grid']}
      columnClassName={styles['notes-masonry-grid-column']}
    >
      {data
        ?.filter((noteData) => {
          return noteData.isDeleted === false && noteData.isArchived === false;
        })
        .map((noteData) => (
          <NoteCard data={noteData} key={noteData.noteId} />
        ))}
    </Masonry>
  );
}

export default NotesView;
