import { useWindowSize } from '@react-hookz/web';
import { NoteData } from 'src/features/note-management/hooks/useGetNotes';

import ArchiveButton from './archive-button';
import BinOrDeleteButton from './bin-or-delete-button';
import CardDragButton from './card-drag-button';
import MenuButton from './menu-button';
import NoteActionButtonFrame, {
  NoteActionButtonFrameProps,
} from './note-action-button-frame';

interface NoteActionButtonProps
  extends Pick<NoteActionButtonFrameProps, 'hidden'> {
  noteData: NoteData | null;
  wrapperClasses?: string;
}

function NoteActionButtons({
  noteData,
  hidden,
  wrapperClasses,
}: NoteActionButtonProps) {
  const windowSize = useWindowSize();

  if (!noteData) {
    return null;
  }

  return (
    <NoteActionButtonFrame
      hidden={hidden}
      leftButtons={[windowSize.width < 768 && <CardDragButton />]}
      rightButtons={[
        <BinOrDeleteButton noteData={noteData} />,
        <ArchiveButton noteData={noteData} />,
        <MenuButton noteData={noteData} />,
      ]}
      wrapperClasses={wrapperClasses || 'absolute bottom-1 left-0'}
    />
  );
}

export default NoteActionButtons;
