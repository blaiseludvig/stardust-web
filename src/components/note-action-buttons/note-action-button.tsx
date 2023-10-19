import clsx from 'clsx';
import { ReactNode } from 'react';
import Tooltip from 'src/lib/components/tooltip';
import { Merge } from 'type-fest';

export interface NoteActionButtonProps {
  icon?: ReactNode;
  tooltipText?: string;
  action?: () => void;
  className?: string;
  buttonProps?: Merge<
    React.ComponentPropsWithoutRef<'button'>,
    Record<`data-${string}`, string | number | boolean>
  >;
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
          'inline-flex h-12 w-12 items-center rounded-full border-gray-600 text-sm font-medium text-white hover:bg-gray-600',
          props.className
        )}
        {...props.buttonProps}
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
