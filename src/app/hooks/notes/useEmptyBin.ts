import { useMutation, useQueryClient } from 'react-query';

import { useCustomKy } from '../useCustomKy';

export function useEmptyBin() {
  const myky = useCustomKy();
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      await myky.post(`notes/bin/empty`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNotes');
      },
    }
  );
}
