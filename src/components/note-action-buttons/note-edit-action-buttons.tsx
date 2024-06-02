import { NoteData } from 'src/features/note-management/hooks/useGetNotes';

import { NoteActionButtonFrameProps } from './note-action-button-frame';
import NoteActionButtons from './note-action-buttons';

interface NoteEditActionButtonProps
  extends Pick<NoteActionButtonFrameProps, 'hidden'> {
  noteData: NoteData | null;
}

function NoteEditActionButtons({
  noteData,
  hidden,
}: NoteEditActionButtonProps) {
  if (!noteData) {
    return null;
  }

  return (
    <NoteActionButtons
      hidden={hidden}
      noteData={noteData}
      wrapperClasses="bg-gray-700 bottom-0 left-0 sticky shadow-[0_0px_15px_4px_rgba(0,0,0,0.3)] shadow-black/50"
    />
  );
}

export default NoteEditActionButtons;
