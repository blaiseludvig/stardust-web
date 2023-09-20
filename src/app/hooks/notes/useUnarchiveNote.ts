import { useMutation, useQueryClient } from 'react-query';
import { getCustomKy } from 'src/app/util/lib/getCustomKy';

import { useCloseModal } from '../useCloseModal';
import { router } from 'src/app/routes';

export function useUnarchiveNote() {
  const myky = getCustomKy();
  const queryClient = useQueryClient();

  const search = router.state.location.search;
  const closeModal = useCloseModal();

  return useMutation(
    async (noteId: string) => {
      await myky.patch(`notes/unarchive/${noteId}`);
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
