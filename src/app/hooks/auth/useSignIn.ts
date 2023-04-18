import { useLocalStorageValue } from '@react-hookz/web';
import { useContext } from 'react';
import AuthContext from 'src/app/contexts/auth.context';

import { useApiKy } from '../useApiKyi';

export function useSignIn() {
  const myky = useApiKy();
  const { set: setJwt } = useLocalStorageValue('api-auth-jwt');
  const { setAuthenticated } = useContext(AuthContext);

  return async (email: string, password: string) => {
    const response = await myky.post('auth/login', {
      json: { email, password },
    });

    if (!response.ok) {
      alert('login fail');
      return;
    }

    const json: { access_token: string } = await response.json();

    setJwt(json.access_token);
    setAuthenticated(true);
  };
}
