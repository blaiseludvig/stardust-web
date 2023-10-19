import { NoteData } from 'src/features/note-management/hooks/useGetNotes';

import ArchiveButton from './archive-button';
import BinOrDeleteButton from './bin-or-delete-button';
import MenuButton from './menu-button';
import NoteActionButtonFrame, {
  NoteActionButtonFrameProps,
} from './note-action-button-frame';

interface NoteActionButtonProps
  extends Pick<NoteActionButtonFrameProps, 'hidden'> {
  noteData: NoteData | null;
}

function NoteActionButtons({ noteData, hidden }: NoteActionButtonProps) {

  if (!noteData) {
    return null;
  }

  return (
    <NoteActionButtonFrame
      hidden={hidden}
      rightButtons={[
        <BinOrDeleteButton noteData={noteData} />,
        <ArchiveButton noteData={noteData} />,
        <MenuButton noteData={noteData} />,
      ]}
    />
  );
}

export default NoteActionButtons;
