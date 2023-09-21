import { useMutation, useQueryClient } from 'react-query';
import { getCustomKy } from 'src/lib/getCustomKy';

export function useTalkToGod() {
  const myky = getCustomKy();
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
