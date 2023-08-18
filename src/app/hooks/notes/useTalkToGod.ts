import { useMutation, useQueryClient } from 'react-query';

import { useCustomKy } from '../useCustomKy';

export function useTalkToGod() {
  const myky = useCustomKy();
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
