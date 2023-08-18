import { useContext } from 'react';
import AuthContext from 'src/app/contexts/auth.context';

import { useCustomKy } from '../useCustomKy';
import { setJwt } from 'src/app/util/lib/apiJwt';

export function useSignIn() {
  const myky = useCustomKy();
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
