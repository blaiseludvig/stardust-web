import {
  Outlet,
  ReactLocation,
  Router,
  createBrowserHistory,
} from '@tanstack/react-location';
import 'flowbite';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import AuthContext from './contexts/auth.context';
import { useIsSignedIn } from './hooks/auth/useIsSignedIn';
import { routes } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const history = createBrowserHistory();
const location = new ReactLocation({ history });

export function App() {
  const isSignedIn = useIsSignedIn();
  const [isAuthenticated, setAuthenticated] = useState(isSignedIn());

  return (
    <QueryClientProvider client={queryClient}>
      <Router location={location} routes={routes}>
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
          <div id="app" className="dark">
            <Outlet />
          </div>
        </AuthContext.Provider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
