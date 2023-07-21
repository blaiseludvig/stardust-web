import { useApiKy } from '../useApiKyi';

export function useSignUp() {
  const myky = useApiKy();

  return async (email: string, password: string) => {
    const response = await myky.post('auth/signup', {
      json: { email, password },
    });

    return response;
  };
}
