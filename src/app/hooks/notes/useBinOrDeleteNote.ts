import { useBinNote } from './useBinNote';
import { useDeleteNote } from './useDeleteNote';
import { NoteData } from './useGetNotes';

export function useBinOrDeleteNote() {
  const { mutate: deleteNote } = useDeleteNote();
  const { mutate: binNote } = useBinNote();

  return (noteData: NoteData) => {
    if (noteData.isBinned) {
      deleteNote(noteData.noteId);
    } else {
      binNote(noteData.noteId);
    }
  };
}
