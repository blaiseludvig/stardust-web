import { useMutation, useQueryClient } from 'react-query';

import { useCustomKy } from '../useCustomKy';

export function useBinNote() {
  const myky = useCustomKy();
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
