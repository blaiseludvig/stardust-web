import { useSearch } from '@tanstack/react-router';
import { useGetNotes } from 'src/features/note-management/hooks/useGetNotes';
import ModalFrame, { ModalFrameProps } from 'src/lib/components/modal-frame';
import Spinner from 'src/lib/components/spinner';

import EditNoteModalFrame from './edit-node-modal-frame';

export function EditNoteModal(props: ModalFrameProps) {
  const search = useSearch({ from: '/' });

  const { data: notes, isLoading, isError, error } = useGetNotes();

  const originalNoteData = notes?.find((noteData) => {
    return noteData.noteId === search.editNote;
  });

  if (isLoading) {
    return (
      <ModalFrame {...props}>
        <Spinner />
      </ModalFrame>
    );
  }

  if (isError) {
    return <span>Error: {JSON.stringify(error)}</span>;
  }

  // This only happens when the search param is set, and the note has been already deleted
  if (search.editNote && !originalNoteData) {
    // TODO implement this
    return <p>the note data is missing</p>;
  }

  return (
    <EditNoteModalFrame
      // Since IsLoading, and isError is false, and we have also
      // handled the case where the note is already deleted,
      // we can assume that it originalNotedata is not null

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      originalNoteData={originalNoteData!}
      {...props}
    ></EditNoteModalFrame>
  );
}

export default EditNoteModal;
