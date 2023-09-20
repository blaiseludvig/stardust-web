import { useQuery } from 'react-query';

import { getCustomKy } from '../util/lib/getCustomKy';
import { useAuth } from './stores/useAuth';

export interface UserProfile {
  email: string;
  registrationDate: Date;
}

export function useGetProfile() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const signOut = useAuth((state) => state.signOut);

  const myky = getCustomKy();
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
