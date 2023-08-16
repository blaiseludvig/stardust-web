import { useNavigate } from '@tanstack/react-location';

export function ZeroNotes() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full flex-col items-center gap-y-4">
        <p className="text-slate-400">
          It looks like you don't have any notes.
        </p>
        <button
          onMouseDown={() =>
            navigate({ search: (old) => ({ ...old, modal: 'new-note' }) })
          }
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
        >
          Create note
        </button>
      </div>
    </div>
  );
}

export default ZeroNotes;
