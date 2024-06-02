import clsx from 'clsx';
import React from 'react';
import { ReactNode } from 'react';

export interface NoteActionButtonFrameProps {
  hidden: boolean;
  leftButtons?: ReactNode[];
  centerButtons?: ReactNode[];
  rightButtons?: ReactNode[];
  wrapperClasses?: string;
}

function NoteActionButtonFrame({
  hidden,
  leftButtons,
  centerButtons,
  rightButtons,
  wrapperClasses,
}: NoteActionButtonFrameProps) {
  return (
    <div
      className={clsx(
        hidden && 'hidden',
        wrapperClasses,
        'flex w-full justify-between px-2'
      )}
    >
      <div className="flex basis-1/3 justify-start">
        {leftButtons?.map((button, index) => (
          <React.Fragment key={index}>{button}</React.Fragment>
        ))}
      </div>
      <div className="flex basis-1/3 justify-center">
        {centerButtons?.map((button, index) => (
          <React.Fragment key={index}>{button}</React.Fragment>
        ))}
      </div>
      <div className="flex basis-1/3 justify-end">
        {rightButtons?.map((button, index) => (
          <React.Fragment key={index}>{button}</React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default NoteActionButtonFrame;
