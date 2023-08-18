import { useMutation, useQueryClient } from 'react-query';
import { getCustomKy } from 'src/app/util/lib/getCustomKy';

export function useUnarchiveNote() {
  const myky = getCustomKy();
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
