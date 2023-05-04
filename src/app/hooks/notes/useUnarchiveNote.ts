import { useMutation, useQueryClient } from 'react-query';

import { useApiKy } from '../useApiKyi';

export function useUnarchiveNote() {
  const myky = useApiKy();
  const queryClient = useQueryClient();

  return useMutation(
    async (noteId: string) => {
      await myky.patch(`notes/unarchive/${noteId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNotes');
      },
    }
  );
}
