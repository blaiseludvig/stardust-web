import { useMutation, useQueryClient } from 'react-query';
import { getCustomKy } from 'src/lib/getCustomKy';

import { UpdateNoteDto } from '../dto/update-note.dto';

export function useUpdateNote() {
  const myky = getCustomKy();
  const queryClient = useQueryClient();

  return useMutation(
    async (dto: UpdateNoteDto) => {
      // noteId is only needed for the path
      const { noteId, ...data } = dto;

      const response = await myky.patch(`notes/${dto.noteId}`, { json: data });
      const json = await response.json();

      return json;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNotes');
      },
    }
  );
}
