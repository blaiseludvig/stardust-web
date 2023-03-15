import styles from './front-page.module.scss';

/* eslint-disable-next-line */
export interface FrontPageProps {}

export function FrontPage(props: FrontPageProps) {
  return (
    <div className={'container mx-2 '}>
      <h1>Welcome to FrontPage!</h1>
    </div>
  );
}

export default FrontPage;
