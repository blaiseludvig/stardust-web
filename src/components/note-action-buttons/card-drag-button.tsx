import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { useWindowSize } from '@react-hookz/web';
import clsx from 'clsx';
import { DRAG_HANDLE_CLASS } from 'src/layouts/note-view';

import NoteActionButton from './note-action-button';

export const DRAG_BUTTON_ATTRIBUTE = 'data-card-drag-button';

const dragButtonAttribute = {
  [DRAG_BUTTON_ATTRIBUTE]: true,
} as const;

function CardDragButton() {
  const windowSize = useWindowSize();

  return (
    <NoteActionButton
      buttonProps={dragButtonAttribute}
      className={clsx(
        windowSize.width < 768 && DRAG_HANDLE_CLASS,
        'cursor-grab'
      )}
      icon={<ArrowsPointingOutIcon className="mx-auto h-6 w-6 text-gray-500" />}
    />
  );
}

export default CardDragButton;
