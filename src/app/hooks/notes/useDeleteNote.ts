import { useMutation, useQueryClient } from 'react-query';

import { useApiKy } from '../useApiKyi';

export function useDeleteNote() {
  const myky = useApiKy();
  const queryClient = useQueryClient();

  return useMutation(
    async (noteId: string) => {
      await myky.delete(`notes/${noteId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNotes');
      },
    }
  );
}
