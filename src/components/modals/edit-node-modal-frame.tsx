import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { NoteData } from 'src/features/note-management/hooks/useGetNotes';
import { useUpdateNote } from 'src/features/note-management/hooks/useUpdateNote';
import { useEditModalCursor } from 'src/hooks/useEditModalCursor';
import ModalFrame, { ModalFrameProps } from 'src/lib/components/modal-frame';

import NoteEditActionButtons from '../note-action-buttons/note-edit-action-buttons';

interface EditNoteModalFrameProps extends ModalFrameProps {
  originalNoteData: NoteData;
}

function EditNoteModalFrame(props: EditNoteModalFrameProps) {
  const { mutate: updateNote } = useUpdateNote();

  const { field, cursorIndex, cursorIsUnset, resetAfterSuccess } =
    useEditModalCursor();

  const [originalNoteData, setOriginalNoteData] = useState<
    NoteData | undefined
  >(props.originalNoteData);

  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(
    () => {
      if (props.originalNoteData) {
        setOriginalNoteData(props.originalNoteData);
        setValue('title', props.originalNoteData.title);
        setValue('content', props.originalNoteData.content);
      }
    },
    // This effect should only run when the note data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.originalNoteData]
  );

  useEffect(
    () => {
      if (cursorIsUnset()) {
        return;
      }

      // These refs have null on their type signature, because we had to
      // use a ref callback to share the refs with the useForm hook,
      // butt they are always definitely assigned.
      if (!titleRef.current || !contentRef.current) return;

      switch (field) {
        case 'title':
          titleRef.current.focus();
          titleRef.current.setSelectionRange(cursorIndex, cursorIndex);
          break;

        case 'content':
          contentRef.current.focus();
          contentRef.current.setSelectionRange(cursorIndex, cursorIndex);
          break;
      }

      resetAfterSuccess();
    },
    // This effect should only run when the properties below change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.originalNoteData, field, cursorIndex]
  );

  const { register, setValue, handleSubmit } = useForm<Partial<NoteData>>();

  return (
    <ModalFrame
      {...props}
      onHide={() =>
        formRef.current?.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        )
      }
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit((data) => {
          function extractUnequalProperties<T>(obj1: T, obj2: T): Partial<T> {
            const result: Partial<T> = {};
            for (const key in obj1) {
              if (
                Object.prototype.hasOwnProperty.call(obj2, key) &&
                obj1[key] !== obj2[key]
              ) {
                result[key] = obj1[key];
              }
            }
            return result;
          }

          const changedProperties = extractUnequalProperties(
            data,
            originalNoteData
          );

          if (Object.keys(changedProperties as object).length !== 0) {
            updateNote({
              // At this point this should never be null
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              noteId: originalNoteData!.noteId,
              ...changedProperties,
            });
          }
        })}
        className="relative block max-h-[80dvh] max-w-3xl overflow-auto break-words rounded-lg border border-gray-700 bg-gray-800 shadow"
      >
        <div className="p-6 pb-6">
          {(() => {
            const { ref: formTitleRef, ...rest } = register('title');
            return (
              <ReactTextareaAutosize
                ref={(node) => {
                  titleRef.current = node;
                  formTitleRef(node);
                }}
                {...rest}
                placeholder="Title"
                className="mb-2 w-full cursor-default resize-none border-none bg-gray-800 text-2xl font-bold tracking-tight text-white"
              />
            );
          })()}
          {(() => {
            const { ref: formContentRef, ...rest } = register('content');
            return (
              <ReactTextareaAutosize
                ref={(node) => {
                  contentRef.current = node;
                  formContentRef(node);
                }}
                {...rest}
                minRows={4}
                placeholder="Write your thoughts here..."
                className="w-full resize-none border-none bg-gray-800 font-normal text-gray-400 caret-white"
              />
            );
          })()}
        </div>

        <NoteEditActionButtons
          hidden={false}
          noteData={props.originalNoteData}
        />
      </form>
    </ModalFrame>
  );
}

export default EditNoteModalFrame;
