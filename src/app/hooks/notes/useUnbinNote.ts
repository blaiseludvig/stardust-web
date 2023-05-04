import { useMutation, useQueryClient } from 'react-query';

import { useApiKy } from '../useApiKyi';

export function useUnbinNote() {
  const myky = useApiKy();
  const queryClient = useQueryClient();

  return useMutation(
    async (noteId: string) => {
      await myky.patch(`notes/unbin/${noteId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNotes');
      },
    }
  );
}
