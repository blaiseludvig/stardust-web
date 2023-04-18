import React, { createRef } from 'react';
import { Children, PropsWithChildren, forwardRef } from 'react';

export interface NoteActionButtonsProps {
  noteId: string;
}

const NoteActionButtons = forwardRef(
  (
    props: PropsWithChildren<NoteActionButtonsProps>,
    ref: React.ForwardedRef<HTMLDivElement | null>
  ) => {
    return (
      <div
        className="absolute bottom-1 right-2 inline-flex hidden shadow-sm"
        role="group"
        ref={ref}
      >
        {Children.map(props.children, (child) => {
          const ref = createRef<HTMLButtonElement>();

          return (
            <button
              ref={ref}
              type="button"
              className="inline-flex h-12 w-12 items-center rounded-full border-gray-200 bg-white text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
              onClick={() =>
                ref?.current?.firstElementChild?.dispatchEvent(
                  new MouseEvent('click')
                )
              }
            >
              {child}
            </button>
          );
        })}
      </div>
    );
  }
);

export default NoteActionButtons;
