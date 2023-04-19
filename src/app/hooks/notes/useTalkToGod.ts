import { useMutation, useQueryClient } from 'react-query';

import { useApiKy } from '../useApiKyi';

export function useTalkToGod() {
  const myky = useApiKy();
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const response = await myky.post('notes/god');
      const json = await response.json();

      return json;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNotes');
      },
    }
  );
}
