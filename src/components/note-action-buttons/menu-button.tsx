import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { NoteData } from 'src/features/note-management/hooks/useGetNotes';

import NoteActionButton from './note-action-button';

function MenuButton({ noteData }: { noteData: NoteData }) {
  return (
    <NoteActionButton
      icon={<EllipsisVerticalIcon className="mx-auto h-6 w-6 text-gray-500" />}
    />
  );
}

export default MenuButton;
