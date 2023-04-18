import { Link } from '@tanstack/react-location';

import styles from './not-found-page.module.scss';

/* eslint-disable-next-line */
export interface NotFoundPageProps {}

export function NotFoundPage(props: NotFoundPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NotFoundPage!</h1>
      <Link to={'/'}>Back to front page</Link>
    </div>
  );
}

export default NotFoundPage;
