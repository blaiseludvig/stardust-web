import { useMutation, useQueryClient } from 'react-query';
import { router } from 'src/app/routes';
import { getCustomKy } from 'src/app/util/lib/getCustomKy';

import { useCloseModal } from '../useCloseModal';

export function useArchiveNote() {
  const myky = getCustomKy();
  const queryClient = useQueryClient();

  const search = router.state.location.search;
  const closeModal = useCloseModal();

  return useMutation(
    async (noteId: string) => {
      await myky.patch(`notes/archive/${noteId}`);
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
