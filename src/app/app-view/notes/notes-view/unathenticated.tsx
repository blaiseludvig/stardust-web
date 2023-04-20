import { Link, useNavigate } from '@tanstack/react-location';
import { LocationGenerics } from 'src/app/routes';

export function Unauthenticated() {
  const navigate = useNavigate<LocationGenerics>();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full flex-col items-center gap-y-4">
        <p className="text-slate-400">
          Please sign-in, or create an account to start managing your notes with
          Stardust.
        </p>
        <div className="flex gap-4">
          <button
            onMouseDown={() =>
              navigate({ search: () => ({ modal: 'signup' }) })
            }
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
          >
            Sign-up
          </button>
          <button
            onMouseDown={() =>
              navigate({ search: () => ({ modal: 'signin' }) })
            }
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign-in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unauthenticated;
