import { useMutation, useQueryClient } from 'react-query';
import { getCustomKy } from 'src/app/util/lib/getCustomKy';

export function useDeleteNote() {
  const myky = getCustomKy();
  const queryClient = useQueryClient();

  return useMutation(
    async (noteId: string) => {
      await myky.delete(`notes/${noteId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNotes');
      },
    }
  );
}
