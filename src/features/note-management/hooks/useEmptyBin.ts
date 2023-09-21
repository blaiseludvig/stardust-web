import { useMutation, useQueryClient } from 'react-query';
import { getCustomKy } from 'src/lib/getCustomKy';

export function useEmptyBin() {
  const myky = getCustomKy();
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
