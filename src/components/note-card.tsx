import { useToggle, useWindowSize } from '@react-hookz/web';
import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
import { useRef } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { NoteData } from 'src/features/note-management/hooks/useGetNotes';
import { useEditModalCursor } from 'src/hooks/useEditModalCursor';

import NoteActionButtons from './note-action-buttons/note-action-buttons';

export interface NoteCardProps {
  data: NoteData;
  className?: string;
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
  const navigate = useNavigate();

  const editModalCursor = useEditModalCursor();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const windowSize = useWindowSize();

  return (
    <div
      onMouseDown={
        windowSize.width < 768
          ? () =>
              navigate({
                search: (old) => ({
                  ...old,
                  modal: 'edit-note',
                  editNote: noteId,
                }),
              })
          : undefined
      }
      onMouseOver={() => toggleShowActionButtons(true)}
      onMouseOut={() => toggleShowActionButtons(false)}
      className={clsx(
        'break-words rounded-lg border border-gray-700 bg-gray-800 p-6 pb-16 shadow hover:bg-gray-700',
        props.className
      )}
    >
      <div
        // I want o be able to use line-clamp with the ellipsis, and the
        // only way I found that lets me keep the feature where the
        // caret is transfered to the modal is to overlay an invisible
        // <textarea> with the exact same styling on top of a <p>
        // element. Interesting hack.
        className="relative isolate"
      >
        <p className="mb-2 line-clamp-[3] w-full cursor-default resize-none whitespace-pre-wrap border-none bg-transparent p-0 text-2xl font-bold tracking-tight text-white caret-transparent selection:bg-transparent">
          {title}
        </p>

        {windowSize.width > 768 && (
          <ReactTextareaAutosize
            ref={titleRef}
            // set to same value as the line-clamp
            maxRows={3}
            // prevent dragging the invisible text
            onDragStart={(event) => event.preventDefault()}
            onSelect={(event) => {
              if (titleRef.current?.selectionStart) {
                editModalCursor.setCursor(
                  'title',
                  titleRef.current?.selectionStart
                );
              }
            }}
            className="absolute top-0 z-[1] mb-2 w-full cursor-default resize-none overflow-hidden border-none p-0 text-2xl font-bold tracking-tight caret-transparent opacity-0 selection:bg-transparent"
            value={title}
          ></ReactTextareaAutosize>
        )}
      </div>

      <div className="relative isolate">
        <p className="line-clamp-[8] w-full cursor-default resize-none whitespace-pre-wrap border-none bg-transparent p-0 font-normal text-gray-400 caret-transparent selection:bg-transparent">
          {content}
        </p>

        {windowSize.width > 768 && (
          <ReactTextareaAutosize
            ref={contentRef}
            // set to same value as the line-clamp
            maxRows={8}
            // prevent dragging the invisible text
            onDragStart={(event) => event.preventDefault()}
            onSelect={(event) => {
              if (contentRef.current?.selectionStart) {
                editModalCursor.setCursor(
                  'content',
                  contentRef.current?.selectionStart
                );
              }
            }}
            className="absolute top-0 z-[1] w-full cursor-default resize-none overflow-hidden border-none p-0 font-normal caret-transparent opacity-0 selection:bg-transparent"
            value={content}
          ></ReactTextareaAutosize>
        )}
      </div>

      <NoteActionButtons
        hidden={windowSize.width > 768 && !showActionButtons}
        noteData={props.data}
      />
    </div>
  );
}

export default NoteCard;
