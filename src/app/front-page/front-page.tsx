import { Link } from '@tanstack/react-location';

import styles from './front-page.module.scss';

/* eslint-disable-next-line */
export interface FrontPageProps {}

export function FrontPage(props: FrontPageProps) {
  return (
    <div className={'container mx-2 px-2'}>
      <h1>Welcome to FrontPage!</h1>
      <div>
        <Link to={'app'}>App view</Link>
      </div>
    </div>
  );
}

export default FrontPage;
