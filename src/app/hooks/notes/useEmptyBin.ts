import { useMutation, useQueryClient } from 'react-query';

import { useApiKy } from '../useApiKyi';

export function useEmptyBin() {
  const myky = useApiKy();
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
