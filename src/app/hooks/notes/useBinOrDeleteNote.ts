import { useMutation, useQueryClient } from 'react-query';

import { useApiKy } from '../useApiKyi';
import { useDeleteNote } from './useDeleteNote';
import { NoteData } from './useGetNotes';
import { useBinNote } from './useBinNote';

export function useBinOrDeleteNote() {
  const myky = useApiKy();
  const queryClient = useQueryClient();

  const { mutate: deleteNote } = useDeleteNote();
  const { mutate: binNote } = useBinNote();

  return (noteData: NoteData) => {
    if (noteData.isDeleted) {
      deleteNote(noteData.noteId);
    } else {
      binNote(noteData.noteId);
    }
  };
}
