import { useMutation, useQueryClient } from 'react-query';

import { useCustomKy } from '../useCustomKy';

export function useUnbinNote() {
  const myky = useCustomKy();
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
