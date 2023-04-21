import { useNavigate } from '@tanstack/react-location';

import { LocationGenerics } from '../routes';

export function useCloseModal() {
  const navigate = useNavigate<LocationGenerics>();

  return () => navigate({ search: (old) => ({ ...old, modal: undefined }) });
}
