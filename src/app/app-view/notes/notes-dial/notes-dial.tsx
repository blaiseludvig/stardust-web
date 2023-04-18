import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from '@tanstack/react-location';
import classNames from 'classnames';
import { useContext } from 'react';
import AuthContext from 'src/app/contexts/auth.context';

/* eslint-disable-next-line */
export interface NotesDialProps {}

export function NotesDial(props: NotesDialProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div
      data-dial-init
      className={classNames(
        isAuthenticated ? '' : 'hidden',
        'group fixed right-6 bottom-6'
      )}
    >
      <div
        id="speed-dial-menu-square"
        className="mb-4 flex hidden flex-col items-center space-y-2"
      >
        <button
          type="button"
          data-tooltip-target="tooltip-share"
          data-tooltip-placement="left"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-400"
        >
          <svg
            aria-hidden="true"
            className="-ml-px h-6 w-6 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
          </svg>
          <span className="sr-only">Share</span>
        </button>
        <div
          id="tooltip-share"
          role="tooltip"
          className="tooltip invisible absolute z-10 inline-block w-auto rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
        >
          Share
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          type="button"
          data-tooltip-target="tooltip-print"
          data-tooltip-placement="left"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-400"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Print</span>
        </button>
        <div
          id="tooltip-print"
          role="tooltip"
          className="tooltip invisible absolute z-10 inline-block w-auto rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
        >
          Print
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          type="button"
          data-tooltip-target="tooltip-download"
          data-tooltip-placement="left"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-400"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1.586l-.293-.293a.999.999 0 10-1.414 1.414l2 2a.999.999 0 001.414 0l2-2a.999.999 0 10-1.414-1.414l-.293.293V9z"
              fillRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Download</span>
        </button>
        <div
          id="tooltip-download"
          role="tooltip"
          className="tooltip invisible absolute z-10 inline-block w-auto rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
        >
          Download
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          type="button"
          data-tooltip-target="tooltip-copy"
          data-tooltip-placement="left"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-400"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"></path>
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"></path>
          </svg>
          <span className="sr-only">Copy</span>
        </button>
        <div
          id="tooltip-copy"
          role="tooltip"
          className="tooltip invisible absolute z-10 inline-block w-auto rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
        >
          Copy
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>

      <button
        onMouseDown={() => navigate({ to: '/app/new' })}
        type="button"
        data-dial-toggle="speed-dial-menu-square"
        aria-expanded="false"
        className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <PlusIcon className="h-6 w-6 stroke-[3px] text-white" />
      </button>
    </div>
  );
}

export default NotesDial;
