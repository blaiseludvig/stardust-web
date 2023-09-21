import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export interface NoteActionButtonFrameProps {
  hidden: boolean;
}

function NoteActionButtonFrame(
  props: PropsWithChildren<NoteActionButtonFrameProps>
) {
  return (
    <div
      className={clsx(
        props.hidden && 'hidden',
        'absolute bottom-1 right-2 inline-flex shadow-sm'
      )}
    >
      {props.children}
    </div>
  );
}

export default NoteActionButtonFrame;
