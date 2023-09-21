import { useMutation, useQueryClient } from 'react-query';
import { getCustomKy } from 'src/lib/getCustomKy';
import { router } from 'src/routes';

import { useCloseModal } from '../../../hooks/useCloseModal';

export function useDeleteNote() {
  const myky = getCustomKy();
  const queryClient = useQueryClient();

  const search = router.state.location.search;

  const closeModal = useCloseModal();

  return useMutation(
    async (noteId: string) => {
      await myky.delete(`notes/${noteId}`);
    },
    {
      onSuccess: () => {
        if (search.modal === 'edit-note') {
          closeModal();
        }

        queryClient.invalidateQueries('getNotes');
      },
    }
  );
}
