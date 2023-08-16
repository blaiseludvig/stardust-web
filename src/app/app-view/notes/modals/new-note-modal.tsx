import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { useCreateNote } from 'src/app/hooks/notes/useCreateNote';
import { NoteData } from 'src/app/hooks/notes/useGetNotes';
import ModalFrame, {
  ModalFrameProps,
} from 'src/app/util/modal-frame/modal-frame';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditNoteModalFrameProps extends ModalFrameProps {}

function NewNoteModal(props: EditNoteModalFrameProps) {
  const { mutate: createNote } = useCreateNote();

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<Partial<NoteData>>();

  // This should only run when the form submits, so we can disable this
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => reset(), [isSubmitSuccessful]);

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
        onSubmit={handleSubmit((data) => createNote(data))}
        className="relative block max-w-3xl break-words rounded-lg border border-gray-700 bg-gray-800 p-6 pb-16 shadow"
      >
        <ReactTextareaAutosize
          {...register('title')}
          placeholder="Title"
          className="mb-2 w-full cursor-default resize-none border-none bg-gray-800 text-2xl font-bold tracking-tight  text-white"
        />

        <ReactTextareaAutosize
          {...register('content')}
          minRows={4}
          placeholder="Write your thoughts here..."
          className="w-full resize-none border-none bg-gray-800 font-normal text-gray-400 caret-white"
        />
      </form>
    </ModalFrame>
  );
}

export default NewNoteModal;
