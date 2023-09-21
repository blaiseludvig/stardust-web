import { useGetNotes } from 'src/features/note-management/hooks/useGetNotes';
import NoteView from 'src/layouts/note-view';

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
