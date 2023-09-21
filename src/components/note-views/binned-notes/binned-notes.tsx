import { useEmptyBin } from 'src/features/note-management/hooks/useEmptyBin';
import { useGetNotes } from 'src/features/note-management/hooks/useGetNotes';
import NoteView from 'src/layouts/note-view';

import EmptyBin from './empty-bin';

function BinnedNotes() {
  const { data } = useGetNotes();

  const { mutate: emptyBin } = useEmptyBin();

  const binnedNotes =
    data?.filter((noteData) => {
      return noteData.isBinned === true;
    }) || [];

  return (
    <NoteView
      noDataElement={<EmptyBin />}
      beforeGridElement={
        <div className="mb-4 flex justify-center">
          <button
            onMouseDown={() => emptyBin()}
            className="w-full max-w-[32rem] rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-600"
          >
            Empty bin
          </button>
        </div>
      }
      data={binnedNotes}
    />
  );
}

export default BinnedNotes;
