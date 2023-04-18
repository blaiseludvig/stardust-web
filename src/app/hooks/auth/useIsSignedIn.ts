import { useLocalStorageValue } from '@react-hookz/web';

export function useIsSignedIn() {
  const { value: jwt } = useLocalStorageValue('api-auth-jwt', {
    defaultValue: '',
  });
  return () => {
    if (jwt === '') {
      return false;
    } else return true;
  };
}
