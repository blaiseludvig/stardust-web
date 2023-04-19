import { useLocalStorageValue } from '@react-hookz/web';

import { useApiKy } from '../useApiKyi';

export function useSignUp() {
  const myky = useApiKy();
  const { set: setJwt } = useLocalStorageValue('api-auth-jwt');

  return async (email: string, password: string) => {
    const response = await myky.post('auth/signup', {
      json: { email, password },
    });

    if (!response.ok) {
      alert('signup fail');
      return response;
    }

    const json: { access_token: string } = await response.json();

    setJwt(json.access_token);

    return response;
  };
}
