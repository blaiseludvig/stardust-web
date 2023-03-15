import { render } from '@testing-library/react';

import FrontPage from './front-page';

describe('FrontPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontPage />);
    expect(baseElement).toBeTruthy();
  });
});
