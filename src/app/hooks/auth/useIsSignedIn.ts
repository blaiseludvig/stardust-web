import { getJwt } from 'src/app/util/lib/apiJwt';

export function useIsSignedIn() {
  const jwt = getJwt();

  return () => (jwt ? true : false);
}
