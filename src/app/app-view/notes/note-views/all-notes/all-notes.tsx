import { useGetNotes } from 'src/app/hooks/notes/useGetNotes';

import NoteView from '../note-view';
import ZeroNotes from './zero-notes';

function AllNotes() {
  const { data } = useGetNotes();

  const allNotes =
    data?.filter((noteData) => {
      return !noteData.isBinned && !noteData.isArchived;
    }) || [];

  return <NoteView noDataElement={<ZeroNotes />} data={allNotes} />;
}

export default AllNotes;
