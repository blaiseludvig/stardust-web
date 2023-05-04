import { useMutation, useQueryClient } from 'react-query';

import { useApiKy } from '../useApiKyi';

export function useBinNote() {
  const myky = useApiKy();
  const queryClient = useQueryClient();

  return useMutation(
    async (noteId: string) => {
      await myky.patch(`notes/bin/${noteId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNotes');
      },
    }
  );
}
