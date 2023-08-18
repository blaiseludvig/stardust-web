import { useContext } from 'react';
import AuthContext from 'src/app/contexts/auth.context';
import { clearJwt } from 'src/app/util/lib/apiJwt';

export function useSignOut() {
  const { setAuthenticated } = useContext(AuthContext);

  return () => {
    clearJwt();
    setAuthenticated(false);
  };
}
