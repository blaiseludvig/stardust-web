import { render } from '@testing-library/react';

import DrawerFrame from './drawer-frame';

describe('DrawerFrame', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DrawerFrame />);
    expect(baseElement).toBeTruthy();
  });
});
