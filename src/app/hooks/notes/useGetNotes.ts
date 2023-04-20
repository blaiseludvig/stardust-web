import { useContext } from 'react';
import { useQuery } from 'react-query';

import AuthContext from '../../contexts/auth.context';
import { useApiKy } from '../useApiKyi';

export interface NoteData {
  noteId: string;
  title: string;
  type: string;
  content: string;
  isArchived: boolean;
  dateArchived: boolean;
  isDeleted: boolean;
  dateDeleted: Date;
  dateCreated: Date;
  dateUpdated: Date;
}

export function useGetNotes() {
  const { isAuthenticated } = useContext(AuthContext);

  const myky = useApiKy();
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
