import {
  ArchiveBoxArrowDownIcon,
  ArrowUpTrayIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useArchiveNote } from 'src/features/note-management/hooks/useArchiveNote';
import { useBinNote } from 'src/features/note-management/hooks/useBinNote';
import { useDeleteNote } from 'src/features/note-management/hooks/useDeleteNote';
import { NoteData } from 'src/features/note-management/hooks/useGetNotes';
import { useUnarchiveNote } from 'src/features/note-management/hooks/useUnarchiveNote';
import { useUnbinNote } from 'src/features/note-management/hooks/useUnbinNote';

import NoteActionButton from './note-action-button';
import NoteActionButtonFrame, {
  NoteActionButtonFrameProps,
} from './note-action-button-frame';

interface NoteActionButtonProps extends NoteActionButtonFrameProps {
  noteData: NoteData | null;
}

function NoteActionButtons(props: NoteActionButtonProps) {
  const { mutate: archiveNote } = useArchiveNote();
  const { mutate: unarchiveNote } = useUnarchiveNote();
  const { mutate: unbinNote } = useUnbinNote();
  const { mutate: binNote } = useBinNote();
  const { mutate: deleteNote } = useDeleteNote();

  const { noteData } = props;

  if (!noteData) {
    return null;
  }

  return (
    <NoteActionButtonFrame {...props}>
      {(() => {
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
                icon={
                  <ArrowUpTrayIcon className="mx-auto h-6 w-6 text-green-500" />
                }
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
      })()}

      {(() => {
        // If the note is archived, show the unarchive button
        if (noteData.isArchived) {
          return (
            <NoteActionButton
              icon={
                <ArrowUpTrayIcon className="mx-auto h-6 w-6 text-green-500" />
              }
              action={() => unarchiveNote(noteData.noteId)}
              tooltipText="Unarchive"
            />
          );
        }

        // If the note is not archived, show the archive button
        if (!noteData.isArchived) {
          return (
            <NoteActionButton
              icon={
                <ArchiveBoxArrowDownIcon className="mx-auto h-6 w-6 text-gray-500" />
              }
              action={() => archiveNote(noteData.noteId)}
              tooltipText="Archive"
            />
          );
        }
      })()}

      <NoteActionButton
        icon={
          <EllipsisVerticalIcon className="mx-auto h-6 w-6 text-gray-500" />
        }
      />
    </NoteActionButtonFrame>
  );
}

export default NoteActionButtons;
