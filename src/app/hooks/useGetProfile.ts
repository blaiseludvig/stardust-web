import { useContext } from 'react';
import { useQuery } from 'react-query';

import AuthContext from '../contexts/auth.context';
import { useApiKy } from './useApiKyi';

export interface UserProfile {
  email: string;
  registrationDate: Date;
}

export function useGetProfile() {
  const { isAuthenticated } = useContext(AuthContext);

  const myky = useApiKy();
  return useQuery(
    'getProfile',
    async () => {
      const response = await myky.get('profile');
      const json: UserProfile = await response.json();

      return json;
    },
    { enabled: isAuthenticated }
  );
}
