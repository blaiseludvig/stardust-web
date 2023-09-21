import { Link } from '@tanstack/react-router';

/* eslint-disable-next-line */
export interface NotFoundPageProps {}

export function NotFoundPage(props: NotFoundPageProps) {
  return (
    <div>
      <h1>Welcome to NotFoundPage!</h1>
      <Link to={'/'}>Back to front page</Link>
    </div>
  );
}

export default NotFoundPage;
