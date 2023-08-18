import { useMutation, useQueryClient } from 'react-query';

import { useCustomKy } from '../useCustomKy';

export function useUnarchiveNote() {
  const myky = useCustomKy();
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
