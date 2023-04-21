import { useGetNotes } from 'src/app/hooks/notes/useGetNotes';

import NoteView from '../note-view';
import EmptyBin from './empty-bin';

function BinnedNotes() {
  const { data } = useGetNotes();

  const binnedNotes =
    data?.filter((noteData) => {
      return noteData.isBinned === true;
    }) || [];

  return <NoteView noDataElement={<EmptyBin />} data={binnedNotes} />;
}

export default BinnedNotes;
