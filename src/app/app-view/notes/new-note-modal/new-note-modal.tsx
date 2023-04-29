import { XMarkIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { useCreateNote } from 'src/app/hooks/notes/useCreateNote';
import { useCloseModal } from 'src/app/hooks/useCloseModal';
import ModalFrame, {
  ModalFrameProps,
} from 'src/app/util/modal-frame/modal-frame';

export function NewNoteModal(props: ModalFrameProps) {
  const closeModal = useCloseModal();
  const { mutate: createNote } = useCreateNote();

  const { register, handleSubmit } = useForm<{
    noteTitle: string;
    noteContent: string;
  }>();

  return (
    <ModalFrame hidden={props.hidden}>
      <div className="relative w-full max-w-md">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <button
            onMouseDown={() => closeModal()}
            type="button"
            className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <XMarkIcon className="h-6 w-6 stroke-[2.5px] text-gray-500" />
            <span className="sr-only">Close modal</span>
          </button>

          <div className="max-h-screen px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-3xl font-medium text-gray-900 dark:text-white">
              New note
            </h3>
            <form
              onSubmit={handleSubmit((data) => {
                createNote({
                  title: data.noteTitle,
                  content: data.noteContent,
                });
                closeModal();
              })}
              className="space-y-6"
            >
              <div>
                <input
                  {...register('noteTitle')}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder="Title"
                />
              </div>
              <ReactTextareaAutosize
                {...register('noteContent')}
                minRows={4}
                placeholder="Write your thoughts here..."
                className=" block max-h-[70vh] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create note
              </button>
            </form>
          </div>
        </div>
      </div>
    </ModalFrame>
  );
}

export default NewNoteModal;
