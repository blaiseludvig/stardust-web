import { useMutation, useQueryClient } from 'react-query';

import { CreateNoteDto } from '../../dto/create-note.dto';
import { useCustomKy } from '../useCustomKy';

export function useCreateNote() {
  const myky = useCustomKy();
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
