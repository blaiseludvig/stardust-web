import { useLocalStorageValue } from '@react-hookz/web';
import { useNavigate } from '@tanstack/react-location';
import ky, { AfterResponseHook, BeforeRequestHook } from 'ky';

import { useSignIn } from './auth/useSignIn';
import { useSignOut } from './auth/useSignOut';

export function useApiKy() {
  const navigate = useNavigate();
  const { value: jwt } = useLocalStorageValue('api-auth-jwt');
  const signOut = useSignOut();

  const afterResponse: AfterResponseHook = async (
    request,
    options,
    response
  ) => {
    if (response.status === 401) {
      // TODO: Implement unauthorized message
      signOut();
    }

    if (response.status === 410) {
      // TODO: Implement user account deleted message
      signOut();
    }
  };

  const beforeRequest: BeforeRequestHook = (request) => {
    const header = request.headers.get('Authorization');
    request.headers.append('Authorization', `Bearer ${jwt}`);
  };

  const apiRoot = ky.create({
    prefixUrl: 'http://localhost:3000/',
    hooks: { afterResponse: [afterResponse], beforeRequest: [beforeRequest] },
    throwHttpErrors: false,
  });

  return apiRoot;
}
