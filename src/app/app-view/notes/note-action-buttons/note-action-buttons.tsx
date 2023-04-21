import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export interface NoteActionButtonsProps {
  hidden: boolean;
}

function NoteActionButtons(props: PropsWithChildren<NoteActionButtonsProps>) {
  return (
    <div
      className={classNames(
        props.hidden && 'hidden',
        'absolute bottom-1 right-2 inline-flex shadow-sm'
      )}
      role="group"
    >
      {props.children}
    </div>
  );
}

export default NoteActionButtons;
