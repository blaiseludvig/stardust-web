import { useContext } from 'react';
import { useQuery } from 'react-query';
import { getCustomKy } from 'src/app/util/lib/getCustomKy';

import AuthContext from '../../contexts/auth.context';

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
  const { isAuthenticated } = useContext(AuthContext);

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
