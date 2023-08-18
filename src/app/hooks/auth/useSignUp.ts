import { useCustomKy } from '../useCustomKy';

export function useSignUp() {
  const myky = useCustomKy();

  return async (email: string, password: string) => {
    const response = await myky.post('auth/signup', {
      json: { email, password },
    });

    return response;
  };
}
