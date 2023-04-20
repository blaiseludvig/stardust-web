import { PropsWithChildren, forwardRef } from 'react';

export interface NoteActionButtonsProps {
  noteId: string;
}

const NoteActionButtons = forwardRef(
  (
    props: PropsWithChildren<NoteActionButtonsProps>,
    containerRef: React.ForwardedRef<HTMLDivElement | null>
  ) => {
    return (
      <div
        ref={containerRef}
        className="absolute bottom-1 right-2 inline-flex hidden shadow-sm"
        role="group"
      >
        {props.children}
      </div>
    );
  }
);

export default NoteActionButtons;
