import { RouterProvider } from '@tanstack/react-router';
import 'flowbite';
import { QueryClient, QueryClientProvider } from 'react-query';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { router } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div id="app">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
