import { ReactNode } from 'react';
import Masonry from 'react-masonry-css';
import Unauthenticated from 'src/components/note-views/unathenticated';
import { useAuth } from 'src/features/auth/useAuth';
import {
  NoteData,
  useGetNotes,
} from 'src/features/note-management/hooks/useGetNotes';
import Spinner from 'src/lib/components/spinner';

import NoteCard from '../components/note-card';
import styles from './note-view.module.scss';

export interface NoteViewProps {
  data: NoteData[];
  noDataElement?: ReactNode;
  beforeGridElement?: ReactNode;
}

function NoteView(props: React.PropsWithChildren<NoteViewProps>) {
  const { isLoading, isError, error } = useGetNotes();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Unauthenticated />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <span>Error: {JSON.stringify(error)}</span>;
  }

  return props.data.length === 0 ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{props.noDataElement}</>
  ) : (
    <div>
      {props.beforeGridElement}
      <Masonry
        breakpointCols={{ 768: 1, 1280: 2, default: 3 }}
        className={styles['notes-masonry-grid']}
        columnClassName={styles['notes-masonry-grid-column']}
      >
        {props.data.map((noteData) => (
          <NoteCard data={noteData} key={noteData.noteId} />
        ))}
      </Masonry>
    </div>
  );
}

export default NoteView;
