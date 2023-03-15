import {
  Outlet,
  ReactLocation,
  Router,
  createBrowserHistory,
} from '@tanstack/react-location';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { routes } from './routes';

const history = createBrowserHistory();
const location = new ReactLocation({ history });

export function App() {
  return (
    <Router location={location} routes={routes}>
      <Outlet />
    </Router>
  );
}

export default App;
