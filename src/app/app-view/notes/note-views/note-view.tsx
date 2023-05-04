import { ReactNode, useContext } from 'react';
import Masonry from 'react-masonry-css';
import AuthContext from 'src/app/contexts/auth.context';
import { NoteData, useGetNotes } from 'src/app/hooks/notes/useGetNotes';
import Spinner from 'src/app/util/spinner';

import NoteCard from '../note-card/note-card';
import styles from './note-view.module.scss';
import Unauthenticated from './unathenticated';

export interface NoteViewProps {
  data: NoteData[];
  noDataElement?: ReactNode;
  beforeGridElement?: ReactNode;
}

function NoteView(props: React.PropsWithChildren<NoteViewProps>) {
  const { isLoading, isError, error } = useGetNotes();
  const { isAuthenticated } = useContext(AuthContext);

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
        breakpointCols={3}
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
