import clsx from 'clsx';
import { ReactNode } from 'react';
import Tooltip from 'src/app/util/tooltip/tooltip';

export interface NoteActionButtonProps {
  icon?: ReactNode;
  tooltipText?: string;
  action?: () => void;
  className?: string;
}

function NoteActionButton(props: NoteActionButtonProps) {
  return (
    <>
      <button
        onMouseDown={(event) => {
          // We stop the event propagation here because we don't want to trigger other events on note-card
          event.stopPropagation();
          props.action?.();
        }}
        type="button"
        className={clsx(
          'inline-flex h-12 w-12 items-center rounded-full border-gray-200 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white',
          props.className
        )}
      >
        {props.icon}
      </button>
      {props.tooltipText && (
        <Tooltip
          forElement="previousElement"
          placement="bottom"
          text={props.tooltipText}
        />
      )}
    </>
  );
}

export default NoteActionButton;
