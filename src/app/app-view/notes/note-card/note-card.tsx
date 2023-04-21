import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useToggle } from '@react-hookz/web';
import { useRef } from 'react';
import { useArchiveNote } from 'src/app/hooks/notes/useArchiveNote';
import { useBinOrDeleteNote } from 'src/app/hooks/notes/useBinOrDeleteNote';
import { NoteData } from 'src/app/hooks/notes/useGetNotes';
import { useUnarchiveNote } from 'src/app/hooks/notes/useUnarchiveNote';
import { useUnbinNote } from 'src/app/hooks/notes/useUnbinNote';

import NoteActionButton from '../note-action-buttons/note-action-button';
import NoteActionButtons from '../note-action-buttons/note-action-buttons';

export interface NoteCardProps {
  data: NoteData;
}

export function NoteCard(props: NoteCardProps) {
  const {
    noteId,
    title,
    type,
    content,
    isArchived,
    dateArchived,
    isBinned,
    dateBinned,
    dateCreated,
    dateUpdated,
  } = props.data;

  const [showActionButtons, toggleShowActionButtons] = useToggle(false);

  const { mutate: archiveNote } = useArchiveNote();
  const { mutate: unarchiveNote } = useUnarchiveNote();

  const binOrDeleteNote = useBinOrDeleteNote();
  const { mutate: unbinNote } = useUnbinNote();

  return (
    <div
      className="relative block break-words rounded-lg border border-gray-200 bg-white p-6 pb-16 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      onMouseOver={() => toggleShowActionButtons(true)}
      onMouseOut={() => toggleShowActionButtons(false)}
    >
      <p className="mb-2 cursor-default text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </p>

      <p className="cursor-default font-normal text-gray-700 dark:text-gray-400">
        {content}
      </p>

      <NoteActionButtons hidden={!showActionButtons}>
        {isBinned ? (
          <>
            <NoteActionButton
              icon={<XMarkIcon className="mx-auto h-6 w-6 text-red-500" />}
              action={() => binOrDeleteNote(props.data)}
              tooltipText="Delete"
            />
            <NoteActionButton
              icon={
                <ArrowUpTrayIcon className="mx-auto h-6 w-6 text-green-500" />
              }
              action={() => unbinNote(noteId)}
              tooltipText="Unbin"
            />
          </>
        ) : (
          <NoteActionButton
            icon={<TrashIcon className="mx-auto h-6 w-6 text-gray-500" />}
            action={() => binOrDeleteNote(props.data)}
            tooltipText="Bin"
          />
        )}

        {isArchived ? (
          <NoteActionButton
            icon={
              <ArrowUpTrayIcon className="mx-auto h-6 w-6 text-green-500" />
            }
            action={() => unarchiveNote(noteId)}
            tooltipText="Unarchive"
          />
        ) : (
          <NoteActionButton
            icon={
              <ArchiveBoxArrowDownIcon className="mx-auto h-6 w-6 text-gray-500" />
            }
            action={() => archiveNote(noteId)}
            tooltipText="Archive"
          />
        )}

        <NoteActionButton
          icon={
            <EllipsisVerticalIcon className="mx-auto h-6 w-6 text-gray-500" />
          }
        />
      </NoteActionButtons>
    </div>
  );
}

export default NoteCard;
