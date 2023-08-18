import { useLocalStorageValue } from '@react-hookz/web';
import { useContext } from 'react';
import AuthContext from 'src/app/contexts/auth.context';

import { useCustomKy } from '../useCustomKy';

export function useSignIn() {
  const myky = useCustomKy();
  const { set: setJwt } = useLocalStorageValue('api-auth-jwt');
  const { setAuthenticated } = useContext(AuthContext);

  return async (email: string, password: string) => {
    const response = await myky.post('auth/login', {
      json: { email, password },
    });

    if (!response.ok) {
      alert('login fail');
      return response;
    }

    const json: { access_token: string } = await response.json();

    setJwt(json.access_token);
    setAuthenticated(true);

    return response;
  };
}
