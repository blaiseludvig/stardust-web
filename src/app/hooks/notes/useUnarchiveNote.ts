import { useSearch } from '@tanstack/react-location';
import { useMutation, useQueryClient } from 'react-query';
import { LocationGenerics } from 'src/app/routes';
import { getCustomKy } from 'src/app/util/lib/getCustomKy';

import { useCloseModal } from '../useCloseModal';

export function useUnarchiveNote() {
  const myky = getCustomKy();
  const queryClient = useQueryClient();

  const search = useSearch<LocationGenerics>();
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
