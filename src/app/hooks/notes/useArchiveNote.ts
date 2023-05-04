import { useMutation, useQueryClient } from 'react-query';

import { useApiKy } from '../useApiKyi';

export function useArchiveNote() {
  const myky = useApiKy();
  const queryClient = useQueryClient();

  return useMutation(
    async (noteId: string) => {
      await myky.patch(`notes/archive/${noteId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNotes');
      },
    }
  );
}
