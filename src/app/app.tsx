import {
  Outlet,
  ReactLocation,
  Router,
  createBrowserHistory,
} from '@tanstack/react-location';
import 'flowbite';
import { QueryClient, QueryClientProvider } from 'react-query';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { LocationGenerics, routes } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const history = createBrowserHistory();
const location = new ReactLocation<LocationGenerics>({ history });

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router location={location} routes={routes}>
        <div id="app">
          <Outlet />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
