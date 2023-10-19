import {
  ArchiveBoxArrowDownIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';
import { useArchiveNote } from 'src/features/note-management/hooks/useArchiveNote';
import { NoteData } from 'src/features/note-management/hooks/useGetNotes';
import { useUnarchiveNote } from 'src/features/note-management/hooks/useUnarchiveNote';

import NoteActionButton from './note-action-button';

function ArchiveButton({ noteData }: { noteData: NoteData }) {
  const { mutate: archiveNote } = useArchiveNote();
  const { mutate: unarchiveNote } = useUnarchiveNote();

  // If the note is archived, show the unarchive button
  if (noteData.isArchived) {
    return (
      <NoteActionButton
        icon={<ArrowUpTrayIcon className="mx-auto h-6 w-6 text-green-500" />}
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

  // never happens
  return null;
}

export default ArchiveButton;
