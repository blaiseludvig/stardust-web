import { useToggle } from '@react-hookz/web';
import { useNavigate } from '@tanstack/react-location';
import { useRef } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { NoteData } from 'src/app/hooks/notes/useGetNotes';
import { useEditModalCursor } from 'src/app/hooks/useEditModalCursor';
import { LocationGenerics } from 'src/app/routes';

import NoteActionButtons from '../note-action-buttons/note-action-buttons';

export interface NoteCardProps {
  data: NoteData;
}

export function NoteCard(props: NoteCardProps) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
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
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const [showActionButtons, toggleShowActionButtons] = useToggle(false);
  const navigate = useNavigate<LocationGenerics>();

  const editModalCursor = useEditModalCursor();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      onMouseDown={() =>
        navigate({
          search: (old) => ({ ...old, modal: 'edit-note', editNote: noteId }),
        })
      }
      className="relative block break-words rounded-lg border border-gray-200 bg-white p-6 pb-16 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      onMouseOver={() => toggleShowActionButtons(true)}
      onMouseOut={() => toggleShowActionButtons(false)}
    >
      <ReactTextareaAutosize
        ref={titleRef}
        onSelect={(event) => {
          if (titleRef.current?.selectionStart) {
            editModalCursor.setCursor(
              'title',
              titleRef.current?.selectionStart
            );
          }
        }}
        className="mb-2 w-full cursor-default resize-none border-none bg-transparent p-0 text-2xl font-bold tracking-tight text-white caret-transparent selection:bg-transparent"
        value={title}
      ></ReactTextareaAutosize>

      <ReactTextareaAutosize
        ref={contentRef}
        onSelect={(event) => {
          if (contentRef.current?.selectionStart) {
            editModalCursor.setCursor(
              'content',
              contentRef.current?.selectionStart
            );
          }
        }}
        className="w-full cursor-default resize-none border-none bg-transparent p-0 font-normal text-gray-400 caret-transparent selection:bg-transparent"
        value={content}
      ></ReactTextareaAutosize>

      <NoteActionButtons hidden={!showActionButtons} noteData={props.data} />
    </div>
  );
}

export default NoteCard;
