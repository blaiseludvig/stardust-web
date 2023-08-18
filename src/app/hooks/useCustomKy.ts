import ky, { AfterResponseHook, BeforeRequestHook } from 'ky';

import { getJwt } from '../util/lib/apiJwt';
import { useSignOut } from './auth/useSignOut';

export function useCustomKy() {
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
    request.headers.append('Authorization', `Bearer ${getJwt()}`);
  };

  const apiRoot = ky.create({
    prefixUrl: 'http://localhost:3000/',
    hooks: { afterResponse: [afterResponse], beforeRequest: [beforeRequest] },
    throwHttpErrors: false,
  });

  return apiRoot;
}
