import { useMutation, useQueryClient } from 'react-query';
import { getCustomKy } from 'src/lib/getCustomKy';

import { CreateNoteDto } from '../dto/create-note.dto';

export function useCreateNote() {
  const myky = getCustomKy();
  const queryClient = useQueryClient();

  return useMutation(
    async (dto: CreateNoteDto) => {
      const response = await myky.post('notes', { json: dto });
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
