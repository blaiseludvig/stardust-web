import {
  ArrowUpTrayIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useBinNote } from 'src/features/note-management/hooks/useBinNote';
import { useDeleteNote } from 'src/features/note-management/hooks/useDeleteNote';
import { NoteData } from 'src/features/note-management/hooks/useGetNotes';
import { useUnbinNote } from 'src/features/note-management/hooks/useUnbinNote';

import NoteActionButton from './note-action-button';

function BinOrDeleteButton({ noteData }: { noteData: NoteData }) {
  const { mutate: unbinNote } = useUnbinNote();
  const { mutate: binNote } = useBinNote();
  const { mutate: deleteNote } = useDeleteNote();

  // If the note is binned, show the delete and unbin buttons
  if (noteData.isBinned) {
    return (
      <>
        <NoteActionButton
          icon={<XMarkIcon className="mx-auto h-6 w-6 text-red-500" />}
          action={() => deleteNote(noteData.noteId)}
          tooltipText="Delete"
        />
        <NoteActionButton
          icon={<ArrowUpTrayIcon className="mx-auto h-6 w-6 text-green-500" />}
          action={() => unbinNote(noteData.noteId)}
          tooltipText="Unbin"
        />
      </>
    );
  }

  // If the note is not binned, show the bin button
  if (!noteData.isBinned) {
    return (
      <NoteActionButton
        icon={<TrashIcon className="mx-auto h-6 w-6 text-gray-500" />}
        action={() => binNote(noteData.noteId)}
        tooltipText="Bin"
      />
    );
  }

  // never happens
  return null;
}

export default BinOrDeleteButton;
