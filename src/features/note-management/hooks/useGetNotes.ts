import { useQuery } from 'react-query';
import { getCustomKy } from 'src/lib/getCustomKy';

import { useAuth } from '../../auth/useAuth';

export interface NoteData {
  noteId: string;
  title: string;
  type: string;
  content: string;
  isArchived: boolean;
  dateArchived: boolean;
  isBinned: boolean;
  dateBinned: Date;
  dateCreated: Date;
  dateUpdated: Date;
}

export function useGetNotes() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const myky = getCustomKy();
  return useQuery(
    'getNotes',
    async () => {
      const response = await myky.get('notes');
      const json: NoteData[] = await response.json();

      return json;
    },
    {
      enabled: isAuthenticated,
    }
  );
}
