import { useMutation, useQueryClient } from 'react-query';
import { getCustomKy } from 'src/app/util/lib/getCustomKy';

export function useArchiveNote() {
  const myky = getCustomKy();
  const queryClient = useQueryClient();

  return useMutation(
    async (noteId: string) => {
      await myky.patch(`notes/archive/${noteId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNotes');
      },
    }
  );
}
