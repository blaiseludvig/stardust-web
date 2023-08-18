import { useMutation, useQueryClient } from 'react-query';
import { UpdateNoteDto } from 'src/app/dto/update-note.dto';
import { getCustomKy } from 'src/app/util/lib/getCustomKy';

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
