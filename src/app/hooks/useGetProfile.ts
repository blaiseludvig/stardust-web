import { useContext } from 'react';
import { useQuery } from 'react-query';

import AuthContext from '../contexts/auth.context';
import { useSignOut } from './auth/useSignOut';
import { useApiKy } from './useApiKyi';

export interface UserProfile {
  email: string;
  registrationDate: Date;
}

export function useGetProfile() {
  const { isAuthenticated } = useContext(AuthContext);
  const signOut = useSignOut();

  const myky = useApiKy();
  return useQuery(
    'getProfile',
    async () => {
      const response = await myky.get('account/profile');

      if ((await response.status) === 410) {
        signOut();
      }

      const json: UserProfile = await response.json();

      return json;
    },
    { enabled: isAuthenticated }
  );
}
