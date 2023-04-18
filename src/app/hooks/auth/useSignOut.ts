import { useLocalStorageValue } from '@react-hookz/web';
import { useContext } from 'react';
import AuthContext from 'src/app/contexts/auth.context';

export function useSignOut() {
  const { set: setJwt } = useLocalStorageValue('api-auth-jwt');
  const { setAuthenticated } = useContext(AuthContext);

  return () => {
    setJwt('');
    setAuthenticated(false);
  };
}
