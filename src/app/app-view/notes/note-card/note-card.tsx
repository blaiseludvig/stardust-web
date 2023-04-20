import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import { useBinOrDeleteNote } from 'src/app/hooks/notes/useBinOrDeleteNote';
import { NoteData } from 'src/app/hooks/notes/useGetNotes';
import { useUnbinNote } from 'src/app/hooks/notes/useUnbinNote';

import NoteActionButton from '../note-action-buttons/note-action-button';
import NoteActionButtons from '../note-action-buttons/note-action-buttons';

export interface NoteCardProps {
  data: NoteData;
}

export function NoteCard(props: NoteCardProps) {
  const { noteId, title, type, content, isDeleted, dateCreated, dateUpdated } =
    props.data;

  const buttonsRef = useRef<HTMLDivElement | null>(null);

  const binOrDeleteNote = useBinOrDeleteNote();
  const { mutate: unbinNote } = useUnbinNote();

  return (
    <div
      className="relative block break-words rounded-lg border border-gray-200 bg-white p-6 pb-16 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      onMouseOver={() => buttonsRef?.current?.classList.remove('hidden')}
      onMouseOut={() => buttonsRef?.current?.classList.add('hidden')}
    >
      <p className="mb-2 cursor-default text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </p>

      <p className="cursor-default font-normal text-gray-700 dark:text-gray-400">
        {content}
      </p>

      <NoteActionButtons ref={buttonsRef} noteId={noteId}>
        {isDeleted ? (
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

        <NoteActionButton
          icon={
            <ArchiveBoxArrowDownIcon className="mx-auto h-6 w-6 text-gray-500" />
          }
        />

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
