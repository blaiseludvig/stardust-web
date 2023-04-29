import {
  ArchiveBoxArrowDownIcon,
  ArrowUpTrayIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useArchiveNote } from 'src/app/hooks/notes/useArchiveNote';
import { useBinOrDeleteNote } from 'src/app/hooks/notes/useBinOrDeleteNote';
import { NoteData } from 'src/app/hooks/notes/useGetNotes';
import { useUnarchiveNote } from 'src/app/hooks/notes/useUnarchiveNote';
import { useUnbinNote } from 'src/app/hooks/notes/useUnbinNote';

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
  const binOrDeleteNote = useBinOrDeleteNote();
  const { mutate: unbinNote } = useUnbinNote();

  const { noteData } = props;

  if (!noteData) {
    return null;
  }

  return (
    <NoteActionButtonFrame {...props}>
      {noteData.isBinned ? (
        <>
          <NoteActionButton
            icon={<XMarkIcon className="mx-auto h-6 w-6 text-red-500" />}
            action={() => binOrDeleteNote(noteData)}
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
      ) : (
        <NoteActionButton
          icon={<TrashIcon className="mx-auto h-6 w-6 text-gray-500" />}
          action={() => binOrDeleteNote(noteData)}
          tooltipText="Bin"
        />
      )}

      {noteData.isArchived ? (
        <NoteActionButton
          icon={<ArrowUpTrayIcon className="mx-auto h-6 w-6 text-green-500" />}
          action={() => unarchiveNote(noteData.noteId)}
          tooltipText="Unarchive"
        />
      ) : (
        <NoteActionButton
          icon={
            <ArchiveBoxArrowDownIcon className="mx-auto h-6 w-6 text-gray-500" />
          }
          action={() => archiveNote(noteData.noteId)}
          tooltipText="Archive"
        />
      )}

      <NoteActionButton
        icon={
          <EllipsisVerticalIcon className="mx-auto h-6 w-6 text-gray-500" />
        }
      />
    </NoteActionButtonFrame>
  );
}

export default NoteActionButtons;
