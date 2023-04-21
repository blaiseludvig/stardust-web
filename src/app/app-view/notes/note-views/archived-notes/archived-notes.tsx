import { useGetNotes } from 'src/app/hooks/notes/useGetNotes';

import NoteView from '../note-view';
import EmptyArchive from './empty-archive';

function ArchivedNotes() {
  const { data } = useGetNotes();

  const archivedNotes =
    data?.filter((noteData) => {
      return noteData.isArchived === true;
    }) || [];

  return <NoteView noDataElement={<EmptyArchive />} data={archivedNotes} />;
}

export default ArchivedNotes;
