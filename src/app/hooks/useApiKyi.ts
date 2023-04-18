import { useLocalStorageValue } from '@react-hookz/web';
import { useNavigate } from '@tanstack/react-location';
import ky, { AfterResponseHook, BeforeRequestHook } from 'ky';

export function useApiKy() {
  const navigate = useNavigate();
  const { value: jwt } = useLocalStorageValue('api-auth-jwt');

  const afterResponse: AfterResponseHook = async (
    request,
    options,
    response
  ) => {
    if (response.status === 401) {
      // navigate({ to: '/' });
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
