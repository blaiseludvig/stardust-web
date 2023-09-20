import { useNavigate } from '@tanstack/react-router';

export function useCloseModal() {
  const navigate = useNavigate();

  return () => navigate({ search: (old) => ({ ...old, modal: undefined }) });
}
