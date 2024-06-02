import { useToggle, useWindowSize } from '@react-hookz/web';
import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
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
      <div className="">
        <p
          suppressContentEditableWarning={true}
          onClick={
            windowSize.width >= 768
              ? () => {
                  setTimeout((event) => {
                    const selection = getSelection();

                    if (selection) {
                      editModalCursor.setCursor(
                        'title',
                        selection.anchorOffset
                      );
                    }
                  }, 0);
                }
              : // eslint-disable-next-line @typescript-eslint/no-empty-function
                () => {}
          }
          contentEditable={windowSize.width >= 768 ? 'true' : 'false'}
          className="mb-2 line-clamp-[3] w-full cursor-default resize-none whitespace-pre-wrap border-none bg-transparent p-0 text-2xl font-bold tracking-tight text-white caret-transparent outline-none selection:bg-transparent"
        >
          {title}
        </p>
      </div>

      <div className="">
        <p
          suppressContentEditableWarning={true}
          onClick={
            windowSize.width >= 768
              ? () => {
                  setTimeout((event) => {
                    const selection = getSelection();

                    if (selection) {
                      editModalCursor.setCursor(
                        'content',
                        selection.anchorOffset
                      );
                    }
                  }, 0);
                }
              : // eslint-disable-next-line @typescript-eslint/no-empty-function
                () => {}
          }
          contentEditable={windowSize.width >= 768 ? 'true' : 'false'}
          className="line-clamp-[8] w-full cursor-default resize-none whitespace-pre-wrap border-none bg-transparent p-0 font-normal text-gray-400 caret-transparent outline-none selection:bg-transparent"
        >
          {content}
        </p>
      </div>

      <NoteActionButtons
        hidden={windowSize.width > 768 && !showActionButtons}
        noteData={props.data}
      />
    </div>
  );
}

export default NoteCard;
